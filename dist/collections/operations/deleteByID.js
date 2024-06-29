import executeAccess from '../../auth/executeAccess.js';
import { hasWhereAccessResult } from '../../auth/types.js';
import { combineQueries } from '../../database/combineQueries.js';
import { Forbidden, NotFound } from '../../errors/index.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { deleteUserPreferences } from '../../preferences/deleteUserPreferences.js';
import { deleteAssociatedFiles } from '../../uploads/deleteAssociatedFiles.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { deleteCollectionVersions } from '../../versions/deleteCollectionVersions.js';
import { buildAfterOperation } from './utils.js';
export const deleteByIDOperation = async (incomingArgs)=>{
    let args = incomingArgs;
    try {
        const shouldCommit = await initTransaction(args.req);
        // /////////////////////////////////////
        // beforeOperation - Collection
        // /////////////////////////////////////
        await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook)=>{
            await priorHook;
            args = await hook({
                args,
                collection: args.collection.config,
                context: args.req.context,
                operation: 'delete',
                req: args.req
            }) || args;
        }, Promise.resolve());
        const { id, collection: { config: collectionConfig }, depth, overrideAccess, req: { fallbackLocale, locale, payload: { config }, payload }, req, showHiddenFields } = args;
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        const accessResults = !overrideAccess ? await executeAccess({
            id,
            req
        }, collectionConfig.access.delete) : true;
        const hasWhereAccess = hasWhereAccessResult(accessResults);
        // /////////////////////////////////////
        // beforeDelete - Collection
        // /////////////////////////////////////
        await collectionConfig.hooks.beforeDelete.reduce(async (priorHook, hook)=>{
            await priorHook;
            return hook({
                id,
                collection: collectionConfig,
                context: req.context,
                req
            });
        }, Promise.resolve());
        // /////////////////////////////////////
        // Retrieve document
        // /////////////////////////////////////
        const docToDelete = await req.payload.db.findOne({
            collection: collectionConfig.slug,
            locale: req.locale,
            req,
            where: combineQueries({
                id: {
                    equals: id
                }
            }, accessResults)
        });
        if (!docToDelete && !hasWhereAccess) throw new NotFound(req.t);
        if (!docToDelete && hasWhereAccess) throw new Forbidden(req.t);
        await deleteAssociatedFiles({
            collectionConfig,
            config,
            doc: docToDelete,
            overrideDelete: true,
            req
        });
        // /////////////////////////////////////
        // Delete versions
        // /////////////////////////////////////
        if (collectionConfig.versions) {
            await deleteCollectionVersions({
                id,
                slug: collectionConfig.slug,
                payload,
                req
            });
        }
        // /////////////////////////////////////
        // Delete document
        // /////////////////////////////////////
        let result = await req.payload.db.deleteOne({
            collection: collectionConfig.slug,
            req,
            where: {
                id: {
                    equals: id
                }
            }
        });
        // /////////////////////////////////////
        // Delete Preferences
        // /////////////////////////////////////
        await deleteUserPreferences({
            collectionConfig,
            ids: [
                id
            ],
            payload,
            req
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
        // afterDelete - Collection
        // /////////////////////////////////////
        await collectionConfig.hooks.afterDelete.reduce(async (priorHook, hook)=>{
            await priorHook;
            result = await hook({
                id,
                collection: collectionConfig,
                context: req.context,
                doc: result,
                req
            }) || result;
        }, Promise.resolve());
        // /////////////////////////////////////
        // afterOperation - Collection
        // /////////////////////////////////////
        result = await buildAfterOperation({
            args,
            collection: collectionConfig,
            operation: 'deleteByID',
            result
        });
        // /////////////////////////////////////
        // 8. Return results
        // /////////////////////////////////////
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (error) {
        await killTransaction(args.req);
        throw error;
    }
};

//# sourceMappingURL=deleteByID.js.map