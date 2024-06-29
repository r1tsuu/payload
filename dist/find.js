import toSnakeCase from 'to-snake-case';
import { findMany } from './find/findMany.js';
export const find = async function find({ collection, limit, locale, page = 1, pagination, req = {}, sort: sortArg, where }) {
    const collectionConfig = this.payload.collections[collection].config;
    const sort = typeof sortArg === 'string' ? sortArg : collectionConfig.defaultSort;
    const tableName = this.tableNameMap.get(toSnakeCase(collectionConfig.slug));
    return findMany({
        adapter: this,
        fields: collectionConfig.fields,
        limit,
        locale,
        page,
        pagination,
        req,
        sort,
        tableName,
        where
    });
};

//# sourceMappingURL=find.js.map