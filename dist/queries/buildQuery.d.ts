import type { SQL } from 'drizzle-orm';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import type { Field, Where } from 'payload';
import { asc, desc } from 'drizzle-orm';
import type { GenericColumn, GenericTable, PostgresAdapter } from '../types.js';
export type BuildQueryJoins = Record<string, SQL>;
export type BuildQueryJoinAliases = {
    condition: SQL;
    table: GenericTable | PgTableWithColumns<any>;
}[];
type BuildQueryArgs = {
    adapter: PostgresAdapter;
    fields: Field[];
    locale?: string;
    sort?: string;
    tableName: string;
    where: Where;
};
type Result = {
    joins: BuildQueryJoinAliases;
    orderBy: {
        column: GenericColumn;
        order: typeof asc | typeof desc;
    };
    selectFields: Record<string, GenericColumn>;
    where: SQL;
};
declare const buildQuery: ({ adapter, fields, locale, sort, tableName, where: incomingWhere, }: BuildQueryArgs) => Promise<Result>;
export default buildQuery;
//# sourceMappingURL=buildQuery.d.ts.map