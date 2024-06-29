import type { Field, Payload } from 'payload';
import type { DrizzleTransaction, PostgresAdapter } from '../../types.js';
import type { PathsToQuery } from './types.js';
type Args = {
    adapter: PostgresAdapter;
    collectionSlug?: string;
    columnPrefix: string;
    db: DrizzleTransaction;
    disableNotNull: boolean;
    fields: Field[];
    globalSlug?: string;
    isVersions: boolean;
    newTableName: string;
    parentTableName: string;
    path: string;
    pathsToQuery: PathsToQuery;
    payload: Payload;
    rootTableName: string;
};
export declare const traverseFields: (args: Args) => void;
export {};
//# sourceMappingURL=traverseFields.d.ts.map