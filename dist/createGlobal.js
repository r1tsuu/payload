import toSnakeCase from 'to-snake-case';
import { upsertRow } from './upsertRow/index.js';
export async function createGlobal({ slug, data, req = {} }) {
    const db = this.sessions[req.transactionID]?.db || this.drizzle;
    const globalConfig = this.payload.globals.config.find((config)=>config.slug === slug);
    const tableName = this.tableNameMap.get(toSnakeCase(globalConfig.slug));
    const result = await upsertRow({
        adapter: this,
        data,
        db,
        fields: globalConfig.fields,
        operation: 'create',
        req,
        tableName
    });
    return result;
}

//# sourceMappingURL=createGlobal.js.map