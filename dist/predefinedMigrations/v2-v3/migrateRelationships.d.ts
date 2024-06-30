import type { Field, Payload, PayloadRequestWithData } from 'payload';
import type { DrizzleTransaction, PostgresAdapter } from '../../types.js';
import type { PathsToQuery } from './types.js';
type Args = {
    adapter: PostgresAdapter;
    collectionSlug?: string;
    db: DrizzleTransaction;
    debug: boolean;
    fields: Field[];
    globalSlug?: string;
    isVersions: boolean;
    pathsToQuery: PathsToQuery;
    payload: Payload;
    req?: Partial<PayloadRequestWithData>;
    tableName: string;
};
export declare const migrateRelationships: ({ adapter, collectionSlug, db, debug, fields, globalSlug, isVersions, pathsToQuery, payload, req, tableName, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=migrateRelationships.d.ts.map