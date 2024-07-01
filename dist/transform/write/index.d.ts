import type { Field } from 'payload';
import type { PostgresAdapter } from '../../types.js';
import type { RowToInsert } from './types.js';
type Args = {
    adapter: PostgresAdapter;
    data: Record<string, unknown>;
    fields: Field[];
    path?: string;
    tableName: string;
};
export declare const transformForWrite: ({ adapter, data, fields, path, tableName, }: Args) => RowToInsert;
export {};
//# sourceMappingURL=index.d.ts.map