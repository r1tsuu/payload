import type { SanitizedCollectionConfig } from '../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../globals/config/types.js';
import type { Payload, PayloadRequestWithData } from '../types/index.js';
type Args = {
    collection?: SanitizedCollectionConfig;
    global?: SanitizedGlobalConfig;
    id?: number | string;
    max: number;
    payload: Payload;
    req?: PayloadRequestWithData;
};
export declare const enforceMaxVersions: ({ id, collection, global, max, payload, req, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=enforceMaxVersions.d.ts.map