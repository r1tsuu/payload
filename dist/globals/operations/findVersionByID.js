/* eslint-disable no-underscore-dangle */ import executeAccess from '../../auth/executeAccess.js';
import { combineQueries } from '../../database/combineQueries.js';
import { Forbidden, NotFound } from '../../errors/index.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
export const findVersionByIDOperation = async (args)=>{
    const { id, currentDepth, depth, disableErrors, globalConfig, overrideAccess, req: { fallbackLocale, locale, payload }, req, showHiddenFields } = args;
    try {
        const shouldCommit = await initTransaction(req);
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        const accessResults = !overrideAccess ? await executeAccess({
            id,
            disableErrors,
            req
        }, globalConfig.access.readVersions) : true;
        // If errors are disabled, and access returns false, return null
        if (accessResults === false) return null;
        const hasWhereAccess = typeof accessResults === 'object';
        const findGlobalVersionsArgs = {
            global: globalConfig.slug,
            limit: 1,
            locale,
            req,
            where: combineQueries({
                id: {
                    equals: id
                }
            }, accessResults)
        };
        // /////////////////////////////////////
        // Find by ID
        // /////////////////////////////////////
        if (!findGlobalVersionsArgs.where.and[0].id) throw new NotFound(req.t);
        const { docs: results } = await payload.db.findGlobalVersions(findGlobalVersionsArgs);
        if (!results || results?.length === 0) {
            if (!disableErrors) {
                if (!hasWhereAccess) throw new NotFound(req.t);
                if (hasWhereAccess) throw new Forbidden(req.t);
            }
            return null;
        }
        // Clone the result - it may have come back memoized
        let result = JSON.parse(JSON.stringify(results[0]));
        // Patch globalType onto version doc
        result.version.globalType = globalConfig.slug;
        // /////////////////////////////////////
        // beforeRead - Collection
        // /////////////////////////////////////
        await globalConfig.hooks.beforeRead.reduce(async (priorHook, hook)=>{
            await priorHook;
            result = await hook({
                context: req.context,
                doc: result.version,
                global: globalConfig,
                req
            }) || result.version;
        }, Promise.resolve());
        // /////////////////////////////////////
        // afterRead - Fields
        // /////////////////////////////////////
        result.version = await afterRead({
            collection: null,
            context: req.context,
            currentDepth,
            depth,
            doc: result.version,
            draft: undefined,
            fallbackLocale,
            global: globalConfig,
            locale,
            overrideAccess,
            req,
            showHiddenFields
        });
        // /////////////////////////////////////
        // afterRead - Global
        // /////////////////////////////////////
        await globalConfig.hooks.afterRead.reduce(async (priorHook, hook)=>{
            await priorHook;
            result.version = await hook({
                context: req.context,
                doc: result.version,
                global: globalConfig,
                query: findGlobalVersionsArgs.where,
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