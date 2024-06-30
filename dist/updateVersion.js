import { buildVersionCollectionFields } from 'payload';
import toSnakeCase from 'to-snake-case';
import buildQuery from './queries/buildQuery.js';
import { upsertRow } from './upsertRow/index.js';
export async function updateVersion({ id, collection, locale, req = {}, versionData, where: whereArg }) {
    const db = this.sessions[req.transactionID]?.db || this.drizzle;
    const collectionConfig = this.payload.collections[collection].config;
    const whereToUse = whereArg || {
        id: {
            equals: id
        }
    };
    const tableName = this.tableNameMap.get(`_${toSnakeCase(collectionConfig.slug)}${this.versionsSuffix}`);
    const fields = buildVersionCollectionFields(collectionConfig);
    const { where } = await buildQuery({
        adapter: this,
        fields,
        locale,
        tableName,
        where: whereToUse
    });
    const result = await upsertRow({
        id,
        adapter: this,
        data: versionData,
        db,
        fields,
        operation: 'update',
        req,
        tableName,
        where
    });
    return result;
}

//# sourceMappingURL=updateVersion.js.map