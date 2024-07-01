import { buildVersionCollectionFields } from 'payload';
import toSnakeCase from 'to-snake-case';
import { findMany } from './find/findMany.js';
export const findVersions = async function findVersions({ collection, limit, locale, page, pagination, req = {}, skip, sort: sortArg, where }) {
    const collectionConfig = this.payload.collections[collection].config;
    const sort = typeof sortArg === 'string' ? sortArg : collectionConfig.defaultSort;
    const tableName = this.tableNameMap.get(`_${toSnakeCase(collectionConfig.slug)}${this.versionsSuffix}`);
    const fields = buildVersionCollectionFields(collectionConfig);
    return findMany({
        adapter: this,
        fields,
        limit,
        locale,
        page,
        pagination,
        req,
        skip,
        sort,
        tableName,
        where
    });
};

//# sourceMappingURL=findVersions.js.map