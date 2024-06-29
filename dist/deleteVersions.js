import { inArray } from 'drizzle-orm';
import { buildVersionCollectionFields } from 'payload';
import toSnakeCase from 'to-snake-case';
import { findMany } from './find/findMany.js';
export const deleteVersions = async function deleteVersion({ collection, locale, req = {}, where: where }) {
    const db = this.sessions[req.transactionID]?.db || this.drizzle;
    const collectionConfig = this.payload.collections[collection].config;
    const tableName = this.tableNameMap.get(`_${toSnakeCase(collectionConfig.slug)}${this.versionsSuffix}`);
    const fields = buildVersionCollectionFields(collectionConfig);
    const { docs } = await findMany({
        adapter: this,
        fields,
        limit: 0,
        locale,
        page: 1,
        pagination: false,
        req,
        tableName,
        where
    });
    const ids = [];
    docs.forEach((doc)=>{
        ids.push(doc.id);
    });
    if (ids.length > 0) {
        await db.delete(this.tables[tableName]).where(inArray(this.tables[tableName].id, ids));
    }
    return docs;
};

//# sourceMappingURL=deleteVersions.js.map