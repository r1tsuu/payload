import type { DBQueryConfig } from 'drizzle-orm';
import type { Field } from 'payload';
import type { PostgresAdapter } from '../types.js';
type BuildFindQueryArgs = {
    adapter: PostgresAdapter;
    depth: number;
    fields: Field[];
    tableName: string;
};
export type Result = DBQueryConfig<'many', true, any, any> & {
    with?: DBQueryConfig<'many', true, any, any> & {
        _locales?: DBQueryConfig<'many', true, any, any>;
    };
};
export declare const buildFindManyArgs: ({ adapter, depth, fields, tableName, }: BuildFindQueryArgs) => Record<string, unknown>;
export {};
//# sourceMappingURL=buildFindManyArgs.d.ts.map