import { buildVersionCollectionFields, combineQueries } from 'payload';
import toSnakeCase from 'to-snake-case';
import { findMany } from './find/findMany.js';
export const queryDrafts = async function queryDrafts({ collection, limit, locale, page = 1, pagination, req = {}, sort, where }) {
    const collectionConfig = this.payload.collections[collection].config;
    const tableName = this.tableNameMap.get(`_${toSnakeCase(collectionConfig.slug)}${this.versionsSuffix}`);
    const fields = buildVersionCollectionFields(collectionConfig);
    const combinedWhere = combineQueries({
        latest: {
            equals: true
        }
    }, where);
    const result = await findMany({
        adapter: this,
        fields,
        limit,
        locale,
        page,
        pagination,
        req,
        sort,
        tableName,
        where: combinedWhere
    });
    return {
        ...result,
        docs: result.docs.map((doc)=>{
            // eslint-disable-next-line no-param-reassign
            doc = {
                id: doc.parent,
                ...doc.version,
                createdAt: doc.createdAt,
                updatedAt: doc.updatedAt
            };
            return doc;
        })
    };
};

//# sourceMappingURL=queryDrafts.js.map