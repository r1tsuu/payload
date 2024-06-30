import { inArray } from 'drizzle-orm';
import toSnakeCase from 'to-snake-case';
import { findMany } from './find/findMany.js';
export const deleteMany = async function deleteMany({ collection, req = {}, where }) {
    const db = this.sessions[req.transactionID]?.db || this.drizzle;
    const collectionConfig = this.payload.collections[collection].config;
    const tableName = this.tableNameMap.get(toSnakeCase(collectionConfig.slug));
    const result = await findMany({
        adapter: this,
        fields: collectionConfig.fields,
        limit: 0,
        locale: req.locale,
        page: 1,
        pagination: false,
        req,
        tableName,
        where
    });
    const ids = [];
    result.docs.forEach((data)=>{
        ids.push(data.id);
    });
    if (ids.length > 0) {
        await db.delete(this.tables[tableName]).where(inArray(this.tables[tableName].id, ids));
    }
};

//# sourceMappingURL=deleteMany.js.map