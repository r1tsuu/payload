import toSnakeCase from 'to-snake-case';
import { upsertRow } from './upsertRow/index.js';
export async function updateGlobal({ slug, data, req = {} }) {
    const db = this.sessions[req.transactionID]?.db || this.drizzle;
    const globalConfig = this.payload.globals.config.find((config)=>config.slug === slug);
    const tableName = this.tableNameMap.get(toSnakeCase(globalConfig.slug));
    const existingGlobal = await db.query[tableName].findFirst({});
    const result = await upsertRow({
        ...existingGlobal ? {
            id: existingGlobal.id,
            operation: 'update'
        } : {
            operation: 'create'
        },
        adapter: this,
        data,
        db,
        fields: globalConfig.fields,
        req,
        tableName
    });
    return result;
}

//# sourceMappingURL=updateGlobal.js.map