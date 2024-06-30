import type { GenericColumn } from '../types.js';
type CreateIndexArgs = {
    columnName: string;
    name: string | string[];
    tableName: string;
    unique?: boolean;
};
export declare const createIndex: ({ name, columnName, tableName, unique }: CreateIndexArgs) => (table: {
    [x: string]: GenericColumn;
}) => import("drizzle-orm/pg-core").IndexBuilder;
export {};
//# sourceMappingURL=createIndex.d.ts.map