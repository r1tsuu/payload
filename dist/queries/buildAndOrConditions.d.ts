import type { SQL } from 'drizzle-orm';
import type { Field, Where } from 'payload';
import type { GenericColumn, PostgresAdapter } from '../types.js';
import type { BuildQueryJoinAliases } from './buildQuery.js';
export declare function buildAndOrConditions({ adapter, fields, joins, locale, selectFields, tableName, where, }: {
    adapter: PostgresAdapter;
    collectionSlug?: string;
    fields: Field[];
    globalSlug?: string;
    joins: BuildQueryJoinAliases;
    locale?: string;
    selectFields: Record<string, GenericColumn>;
    tableName: string;
    where: Where[];
}): Promise<SQL[]>;
//# sourceMappingURL=buildAndOrConditions.d.ts.map