import type { SanitizedCollectionConfig } from '../collections/config/types.js';
import type { Payload } from '../index.js';
import type { PayloadRequestWithData } from '../types/index.js';
type Args = {
    collectionConfig: SanitizedCollectionConfig;
    /**
     * User IDs to delete
     */
    ids: (number | string)[];
    payload: Payload;
    req: PayloadRequestWithData;
};
export declare const deleteUserPreferences: ({ collectionConfig, ids, payload, req }: Args) => Promise<void>;
export {};
//# sourceMappingURL=deleteUserPreferences.d.ts.map