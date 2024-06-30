import { sql } from 'drizzle-orm';
import toSnakeCase from 'to-snake-case';
import { chainMethods } from './find/chainMethods.js';
import buildQuery from './queries/buildQuery.js';
export const count = async function count({ collection, locale, req, where: whereArg }) {
    const collectionConfig = this.payload.collections[collection].config;
    const tableName = this.tableNameMap.get(toSnakeCase(collectionConfig.slug));
    const db = this.sessions[req.transactionID]?.db || this.drizzle;
    const table = this.tables[tableName];
    const { joins, where } = await buildQuery({
        adapter: this,
        fields: collectionConfig.fields,
        locale,
        tableName,
        where: whereArg
    });
    const selectCountMethods = [];
    Object.entries(joins).forEach(([joinTable, condition])=>{
        if (joinTable) {
            selectCountMethods.push({
                args: [
                    this.tables[joinTable],
                    condition
                ],
                method: 'leftJoin'
            });
        }
    });
    const countResult = await chainMethods({
        methods: selectCountMethods,
        query: db.select({
            count: sql`count
            (DISTINCT ${this.tables[tableName].id})`
        }).from(table).where(where)
    });
    return {
        totalDocs: Number(countResult[0].count)
    };
};

//# sourceMappingURL=count.js.map