import type { QueryPromise, SQL } from 'drizzle-orm';
import type { ChainedMethods } from '../find/chainMethods.js';
import type { DrizzleDB, PostgresAdapter } from '../types.js';
import type { BuildQueryJoinAliases } from './buildQuery.js';
import { type GenericColumn } from '../types.js';
type Args = {
    adapter: PostgresAdapter;
    chainedMethods?: ChainedMethods;
    db: DrizzleDB;
    joins: BuildQueryJoinAliases;
    selectFields: Record<string, GenericColumn>;
    tableName: string;
    where: SQL;
};
/**
 * Selects distinct records from a table only if there are joins that need to be used, otherwise return null
 */
export declare const selectDistinct: ({ adapter, chainedMethods, db, joins, selectFields, tableName, where, }: Args) => QueryPromise<Record<string, GenericColumn> & {
    id: number | string;
}[]>;
export {};
//# sourceMappingURL=selectDistinct.d.ts.map