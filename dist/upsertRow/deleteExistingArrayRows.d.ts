import type { DrizzleDB, PostgresAdapter } from '../types.js';
type Args = {
    adapter: PostgresAdapter;
    db: DrizzleDB;
    parentID: unknown;
    tableName: string;
};
export declare const deleteExistingArrayRows: ({ adapter, db, parentID, tableName, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=deleteExistingArrayRows.d.ts.map