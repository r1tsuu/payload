import type { SanitizedCollectionConfig, TypeWithID } from '../../../collections/config/types.js';
import type { Payload } from '../../../index.js';
import type { PayloadRequestWithData } from '../../../types/index.js';
type Args = {
    collection: SanitizedCollectionConfig;
    doc: TypeWithID & Record<string, unknown>;
    payload: Payload;
    req: PayloadRequestWithData;
};
export declare const incrementLoginAttempts: ({ collection, doc, payload, req, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=incrementLoginAttempts.d.ts.map