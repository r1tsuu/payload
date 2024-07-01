import type { ArrayRowToInsert } from '../transform/write/types.js';
import type { DrizzleDB, PostgresAdapter } from '../types.js';
type Args = {
    adapter: PostgresAdapter;
    arrays: {
        [tableName: string]: ArrayRowToInsert[];
    }[];
    db: DrizzleDB;
    parentRows: Record<string, unknown>[];
};
export declare const insertArrays: ({ adapter, arrays, db, parentRows }: Args) => Promise<void>;
export {};
//# sourceMappingURL=insertArrays.d.ts.map