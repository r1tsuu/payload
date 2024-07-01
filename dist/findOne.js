import toSnakeCase from 'to-snake-case';
import { findMany } from './find/findMany.js';
export async function findOne({ collection, locale, req = {}, where }) {
    const collectionConfig = this.payload.collections[collection].config;
    const tableName = this.tableNameMap.get(toSnakeCase(collectionConfig.slug));
    const { docs } = await findMany({
        adapter: this,
        fields: collectionConfig.fields,
        limit: 1,
        locale,
        page: 1,
        pagination: false,
        req,
        sort: undefined,
        tableName,
        where
    });
    return docs?.[0] || null;
}

//# sourceMappingURL=findOne.js.map