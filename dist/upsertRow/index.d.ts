import type { TypeWithID } from 'payload';
import type { Args } from './types.js';
export declare const upsertRow: <T extends Record<string, unknown> | TypeWithID>({ id, adapter, data, db, fields, ignoreResult, operation, path, req, tableName, upsertTarget, where, }: Args) => Promise<T>;
//# sourceMappingURL=index.d.ts.map