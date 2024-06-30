import { sql } from 'drizzle-orm';
import { buildVersionGlobalFields } from 'payload';
import toSnakeCase from 'to-snake-case';
import { upsertRow } from './upsertRow/index.js';
export async function createGlobalVersion({ autosave, globalSlug, req = {}, versionData }) {
    const db = this.sessions[req.transactionID]?.db || this.drizzle;
    const global = this.payload.globals.config.find(({ slug })=>slug === globalSlug);
    const tableName = this.tableNameMap.get(`_${toSnakeCase(global.slug)}${this.versionsSuffix}`);
    const result = await upsertRow({
        adapter: this,
        data: {
            autosave,
            latest: true,
            version: versionData
        },
        db,
        fields: buildVersionGlobalFields(global),
        operation: 'create',
        req,
        tableName
    });
    const table = this.tables[tableName];
    if (global.versions.drafts) {
        await db.execute(sql`
      UPDATE ${table}
      SET latest = false
      WHERE ${table.id} != ${result.id};
    `);
    }
    return result;
}

//# sourceMappingURL=createGlobalVersion.js.map