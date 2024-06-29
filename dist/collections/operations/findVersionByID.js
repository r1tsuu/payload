/* eslint-disable no-underscore-dangle */ import httpStatus from 'http-status';
import executeAccess from '../../auth/executeAccess.js';
import { combineQueries } from '../../database/combineQueries.js';
import { APIError, Forbidden, NotFound } from '../../errors/index.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
export const findVersionByIDOperation = async (args)=>{
    const { id, collection: { config: collectionConfig }, currentDepth, depth, disableErrors, overrideAccess, req: { fallbackLocale, locale, payload }, req, showHiddenFields } = args;
    if (!id) {
        throw new APIError('Missing ID of version.', httpStatus.BAD_REQUEST);
    }
    try {
        const shouldCommit = await initTransaction(req);
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        const accessResults = !overrideAccess ? await executeAccess({
            id,
            disableErrors,
            req
        }, collectionConfig.access.readVersions) : true;
        // If errors are disabled, and access returns false, return null
        if (accessResults === false) return null;
        const hasWhereAccess = typeof accessResults === 'object';
        const fullWhere = combineQueries({
            id: {
                equals: id
            }
        }, accessResults);
        // /////////////////////////////////////
        // Find by ID
        // /////////////////////////////////////
        const versionsQuery = await payload.db.findVersions({
            collection: collectionConfig.slug,
            limit: 1,
            locale,
            pagination: false,
            req,
            where: fullWhere
        });
        const result = versionsQuery.docs[0];
        if (!result) {
            if (!disableErrors) {
                if (!hasWhereAccess) throw new NotFound(req.t);
                if (hasWhereAccess) throw new Forbidden(req.t);
            }
            return null;
        }
        // /////////////////////////////////////
        // beforeRead - Collection
        // /////////////////////////////////////
        await collectionConfig.hooks.beforeRead.reduce(async (priorHook, hook)=>{
            await priorHook;
            result.version = await hook({
                collection: collectionConfig,
                context: req.context,
                doc: result.version,
                query: fullWhere,
                req
            }) || result.version;
        }, Promise.resolve());
        // /////////////////////////////////////
        // afterRead - Fields
        // /////////////////////////////////////
        result.version = await afterRead({
            collection: collectionConfig,
            context: req.context,
            currentDepth,
            depth,
            doc: result.version,
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
            result.version = await hook({
                collection: collectionConfig,
                context: req.context,
                doc: result.version,
                query: fullWhere,
                req
            }) || result.version;
        }, Promise.resolve());
        // /////////////////////////////////////
        // Return results
        // /////////////////////////////////////
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (error) {
        await killTransaction(req);
        throw error;
    }
};

//# sourceMappingURL=findVersionByID.js.map