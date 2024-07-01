import type { SQL } from 'drizzle-orm';
import type { Field, Where } from 'payload';
import type { GenericColumn, PostgresAdapter } from '../types.js';
import type { BuildQueryJoinAliases } from './buildQuery.js';
type Args = {
    adapter: PostgresAdapter;
    fields: Field[];
    joins: BuildQueryJoinAliases;
    locale: string;
    selectFields: Record<string, GenericColumn>;
    tableName: string;
    where: Where;
};
export declare function parseParams({ adapter, fields, joins, locale, selectFields, tableName, where, }: Args): Promise<SQL>;
export {};
//# sourceMappingURL=parseParams.d.ts.map