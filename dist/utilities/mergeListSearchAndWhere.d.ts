import type { SanitizedCollectionConfig } from '../collections/config/types.js';
import type { Where } from '../types/index.js';
type Args = {
    collectionConfig: SanitizedCollectionConfig;
    query: {
        search?: string;
        where?: Where;
    };
};
export declare const mergeListSearchAndWhere: ({ collectionConfig, query }: Args) => Where;
export {};
//# sourceMappingURL=mergeListSearchAndWhere.d.ts.map