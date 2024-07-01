import type { PgColumnBuilder } from 'drizzle-orm/pg-core';
import { type Field } from 'payload';
import type { IDType, PostgresAdapter } from '../types.js';
type Args = {
    adapter: PostgresAdapter;
    columns: Record<string, PgColumnBuilder>;
    fields: Field[];
};
export declare const setColumnID: ({ adapter, columns, fields }: Args) => IDType;
export {};
//# sourceMappingURL=setColumnID.d.ts.map