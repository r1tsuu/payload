import type { DrizzleDB, PostgresAdapter } from '../types.js';
type Args = {
    adapter: PostgresAdapter;
    db: DrizzleDB;
    localeColumnName?: string;
    parentColumnName?: string;
    parentID: unknown;
    pathColumnName?: string;
    rows: Record<string, unknown>[];
    tableName: string;
};
export declare const deleteExistingRowsByPath: ({ adapter, db, localeColumnName, parentColumnName, parentID, pathColumnName, rows, tableName, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=deleteExistingRowsByPath.d.ts.map