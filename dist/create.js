import toSnakeCase from 'to-snake-case';
import { upsertRow } from './upsertRow/index.js';
export const create = async function create({ collection: collectionSlug, data, req }) {
    const db = this.sessions[req.transactionID]?.db || this.drizzle;
    const collection = this.payload.collections[collectionSlug].config;
    const tableName = this.tableNameMap.get(toSnakeCase(collection.slug));
    const result = await upsertRow({
        adapter: this,
        data,
        db,
        fields: collection.fields,
        operation: 'create',
        req,
        tableName
    });
    return result;
};

//# sourceMappingURL=create.js.map