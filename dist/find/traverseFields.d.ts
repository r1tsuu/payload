import type { Field } from 'payload';
import type { PostgresAdapter } from '../types.js';
import type { Result } from './buildFindManyArgs.js';
type TraverseFieldArgs = {
    _locales: Result;
    adapter: PostgresAdapter;
    currentArgs: Result;
    currentTableName: string;
    depth?: number;
    fields: Field[];
    path: string;
    topLevelArgs: Record<string, unknown>;
    topLevelTableName: string;
};
export declare const traverseFields: ({ _locales, adapter, currentArgs, currentTableName, depth, fields, path, topLevelArgs, topLevelTableName, }: TraverseFieldArgs) => Record<string, unknown>;
export {};
//# sourceMappingURL=traverseFields.d.ts.map