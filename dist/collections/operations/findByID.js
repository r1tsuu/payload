/* eslint-disable no-underscore-dangle */ import executeAccess from '../../auth/executeAccess.js';
import { combineQueries } from '../../database/combineQueries.js';
import { NotFound } from '../../errors/index.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import replaceWithDraftIfAvailable from '../../versions/drafts/replaceWithDraftIfAvailable.js';
import { buildAfterOperation } from './utils.js';
export const findByIDOperation = async (incomingArgs)=>{
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
                operation: 'read',
                req: args.req
            }) || args;
        }, Promise.resolve());
        const { id, collection: { config: collectionConfig }, currentDepth, depth, disableErrors, draft: draftEnabled = false, overrideAccess = false, req: { fallbackLocale, locale, t }, req, showHiddenFields } = args;
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        const accessResult = !overrideAccess ? await executeAccess({
            id,
            disableErrors,
            req
        }, collectionConfig.access.read) : true;
        // If errors are disabled, and access returns false, return null
        if (accessResult === false) return null;
        const findOneArgs = {
            collection: collectionConfig.slug,
            locale,
            req: {
                transactionID: req.transactionID
            },
            where: combineQueries({
                id: {
                    equals: id
                }
            }, accessResult)
        };
        // /////////////////////////////////////
        // Find by ID
        // /////////////////////////////////////
        if (!findOneArgs.where.and[0].id) throw new NotFound(t);
        let result = await req.payload.db.findOne(findOneArgs);
        if (!result) {
            if (!disableErrors) {
                throw new NotFound(req.t);
            }
            return null;
        }
        // /////////////////////////////////////
        // Replace document with draft if available
        // /////////////////////////////////////
        if (collectionConfig.versions?.drafts && draftEnabled) {
            result = await replaceWithDraftIfAvailable({
                accessResult,
                doc: result,
                entity: collectionConfig,
                entityType: 'collection',
                overrideAccess,
                req
            });
        }
        // /////////////////////////////////////
        // beforeRead - Collection
        // /////////////////////////////////////
        await collectionConfig.hooks.beforeRead.reduce(async (priorHook, hook)=>{
            await priorHook;
            result = await hook({
                collection: collectionConfig,
                context: req.context,
                doc: result,
                query: findOneArgs.where,
                req
            }) || result;
        }, Promise.resolve());
        // /////////////////////////////////////
        // afterRead - Fields
        // /////////////////////////////////////
        result = await afterRead({
            collection: collectionConfig,
            context: req.context,
            currentDepth,
            depth,
            doc: result,
            draft: draftEnabled,
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
                query: findOneArgs.where,
                req
            }) || result;
        }, Promise.resolve());
        // /////////////////////////////////////
        // afterOperation - Collection
        // /////////////////////////////////////
        result = await buildAfterOperation({
            args,
            collection: collectionConfig,
            operation: 'findByID',
            result
        });
        // /////////////////////////////////////
        // Return results
        // /////////////////////////////////////
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (error) {
        await killTransaction(args.req);
        throw error;
    }
};

//# sourceMappingURL=findByID.js.map