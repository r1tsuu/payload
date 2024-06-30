import type { Field, Payload, PayloadRequestWithData } from 'payload';
import type { DrizzleTransaction, PostgresAdapter } from '../../../types.js';
import type { DocsToResave } from '../types.js';
type Args = {
    adapter: PostgresAdapter;
    collectionSlug?: string;
    db: DrizzleTransaction;
    debug: boolean;
    docsToResave: DocsToResave;
    fields: Field[];
    globalSlug?: string;
    isVersions: boolean;
    payload: Payload;
    req: PayloadRequestWithData;
    tableName: string;
};
export declare const fetchAndResave: ({ adapter, collectionSlug, db, debug, docsToResave, fields, globalSlug, isVersions, payload, req, tableName, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map