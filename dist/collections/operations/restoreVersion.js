/* eslint-disable no-underscore-dangle */ import httpStatus from 'http-status';
import executeAccess from '../../auth/executeAccess.js';
import { hasWhereAccessResult } from '../../auth/types.js';
import { combineQueries } from '../../database/combineQueries.js';
import { APIError, Forbidden, NotFound } from '../../errors/index.js';
import { afterChange } from '../../fields/hooks/afterChange/index.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { getLatestCollectionVersion } from '../../versions/getLatestCollectionVersion.js';
export const restoreVersionOperation = async (args)=>{
    const { id, collection: { config: collectionConfig }, depth, overrideAccess = false, req, req: { fallbackLocale, locale, payload }, showHiddenFields } = args;
    try {
        const shouldCommit = await initTransaction(req);
        if (!id) {
            throw new APIError('Missing ID of version to restore.', httpStatus.BAD_REQUEST);
        }
        // /////////////////////////////////////
        // Retrieve original raw version
        // /////////////////////////////////////
        const { docs: versionDocs } = await req.payload.db.findVersions({
            collection: collectionConfig.slug,
            limit: 1,
            locale,
            pagination: false,
            req,
            where: {
                id: {
                    equals: id
                }
            }
        });
        const [rawVersion] = versionDocs;
        if (!rawVersion) {
            throw new NotFound(req.t);
        }
        const parentDocID = rawVersion.parent;
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        const accessResults = !overrideAccess ? await executeAccess({
            id: parentDocID,
            req
        }, collectionConfig.access.update) : true;
        const hasWherePolicy = hasWhereAccessResult(accessResults);
        // /////////////////////////////////////
        // Retrieve document
        // /////////////////////////////////////
        const findOneArgs = {
            collection: collectionConfig.slug,
            locale,
            req,
            where: combineQueries({
                id: {
                    equals: parentDocID
                }
            }, accessResults)
        };
        const doc = await req.payload.db.findOne(findOneArgs);
        if (!doc && !hasWherePolicy) throw new NotFound(req.t);
        if (!doc && hasWherePolicy) throw new Forbidden(req.t);
        // /////////////////////////////////////
        // fetch previousDoc
        // /////////////////////////////////////
        const prevDocWithLocales = await getLatestCollectionVersion({
            id: parentDocID,
            config: collectionConfig,
            payload,
            query: findOneArgs,
            req
        });
        // /////////////////////////////////////
        // Update
        // /////////////////////////////////////
        let result = await req.payload.db.updateOne({
            id: parentDocID,
            collection: collectionConfig.slug,
            data: rawVersion.version,
            req
        });
        // /////////////////////////////////////
        // Save `previousDoc` as a version after restoring
        // /////////////////////////////////////
        const prevVersion = {
            ...prevDocWithLocales
        };
        delete prevVersion.id;
        await payload.db.createVersion({
            autosave: false,
            collectionSlug: collectionConfig.slug,
            createdAt: prevVersion.createdAt,
            parent: parentDocID,
            req,
            updatedAt: new Date().toISOString(),
            versionData: rawVersion.version
        });
        // /////////////////////////////////////
        // afterRead - Fields
        // /////////////////////////////////////
        result = await afterRead({
            collection: collectionConfig,
            context: req.context,
            depth,
            doc: result,
            draft: undefined,
            fallbackLocale,
            global: null,
            locale,
            overrideAccess,
            req,
            showHiddenFields
        });
        // /////////////////////////////////////
        // afterRead - Collection
        // /////////////////////////////////////
        await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook)=>{
            await priorHook;
            result = await hook({
                collection: collectionConfig,
                context: req.context,
                doc: result,
                req
            }) || result;
        }, Promise.resolve());
        // /////////////////////////////////////
        // afterChange - Fields
        // /////////////////////////////////////
        result = await afterChange({
            collection: collectionConfig,
            context: req.context,
            data: result,
            doc: result,
            global: null,
            operation: 'update',
            previousDoc: prevDocWithLocales,
            req
        });
        // /////////////////////////////////////
        // afterChange - Collection
        // /////////////////////////////////////
        await collectionConfig.hooks.afterChange.reduce(async (priorHook, hook)=>{
            await priorHook;
            result = await hook({
                collection: collectionConfig,
                context: req.context,
                doc: result,
                operation: 'update',
                previousDoc: prevDocWithLocales,
                req
            }) || result;
        }, Promise.resolve());
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (error) {
        await killTransaction(req);
        throw error;
    }
};

//# sourceMappingURL=restoreVersion.js.map