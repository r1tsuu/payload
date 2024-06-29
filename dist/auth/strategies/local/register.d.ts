import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { Payload } from '../../../index.js';
import type { PayloadRequestWithData } from '../../../types/index.js';
type Args = {
    collection: SanitizedCollectionConfig;
    doc: Record<string, unknown>;
    password: string;
    payload: Payload;
    req: PayloadRequestWithData;
};
export declare const registerLocalStrategy: ({ collection, doc, password, payload, req, }: Args) => Promise<Record<string, unknown>>;
export {};
//# sourceMappingURL=register.d.ts.map