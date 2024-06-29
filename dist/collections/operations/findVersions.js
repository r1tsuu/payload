import executeAccess from '../../auth/executeAccess.js';
import { combineQueries } from '../../database/combineQueries.js';
import { validateQueryPaths } from '../../database/queryValidation/validateQueryPaths.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import sanitizeInternalFields from '../../utilities/sanitizeInternalFields.js';
import { buildVersionCollectionFields } from '../../versions/buildCollectionFields.js';
export const findVersionsOperation = async (args)=>{
    const { collection: { config: collectionConfig }, depth, limit, overrideAccess, page, pagination = true, req: { fallbackLocale, locale, payload }, req, showHiddenFields, sort, where } = args;
    try {
        const shouldCommit = await initTransaction(req);
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        let accessResults;
        if (!overrideAccess) {
            accessResults = await executeAccess({
                req
            }, collectionConfig.access.readVersions);
        }
        const versionFields = buildVersionCollectionFields(collectionConfig);
        await validateQueryPaths({
            collectionConfig,
            overrideAccess,
            req,
            versionFields,
            where
        });
        const fullWhere = combineQueries(where, accessResults);
        // /////////////////////////////////////
        // Find
        // /////////////////////////////////////
        const paginatedDocs = await payload.db.findVersions({
            collection: collectionConfig.slug,
            limit: limit ?? 10,
            locale,
            page: page || 1,
            pagination,
            req,
            sort,
            where: fullWhere
        });
        // /////////////////////////////////////
        // beforeRead - Collection
        // /////////////////////////////////////
        let result = {
            ...paginatedDocs,
            docs: await Promise.all(paginatedDocs.docs.map(async (doc)=>{
                const docRef = doc;
                await collectionConfig.hooks.beforeRead.reduce(async (priorHook, hook)=>{
                    await priorHook;
                    docRef.version = await hook({
                        collection: collectionConfig,
                        context: req.context,
                        doc: docRef.version,
                        query: fullWhere,
                        req
                    }) || docRef.version;
                }, Promise.resolve());
                return docRef;
            }))
        };
        // /////////////////////////////////////
        // afterRead - Fields
        // /////////////////////////////////////
        result = {
            ...result,
            docs: await Promise.all(result.docs.map(async (data)=>({
                    ...data,
                    version: await afterRead({
                        collection: collectionConfig,
                        context: req.context,
                        depth,
                        doc: data.version,
                        draft: undefined,
                        fallbackLocale,
                        findMany: true,
                        global: null,
                        locale,
                        overrideAccess,
                        req,
                        showHiddenFields
                    })
                })))
        };
        // /////////////////////////////////////
        // afterRead - Collection
        // /////////////////////////////////////
        result = {
            ...result,
            docs: await Promise.all(result.docs.map(async (doc)=>{
                const docRef = doc;
                await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook)=>{
                    await priorHook;
                    docRef.version = await hook({
                        collection: collectionConfig,
                        context: req.context,
                        doc: doc.version,
                        findMany: true,
                        query: fullWhere,
                        req
                    }) || doc.version;
                }, Promise.resolve());
                return docRef;
            }))
        };
        // /////////////////////////////////////
        // Return results
        // /////////////////////////////////////
        result = {
            ...result,
            docs: result.docs.map((doc)=>sanitizeInternalFields(doc))
        };
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (error) {
        await killTransaction(req);
        throw error;
    }
};

//# sourceMappingURL=findVersions.js.map