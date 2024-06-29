import type { Payload } from '../index.js';
import type { PayloadRequestWithData } from '../types/index.js';
type Args = {
    id?: number | string;
    payload: Payload;
    req?: PayloadRequestWithData;
    slug: string;
};
export declare const deleteCollectionVersions: ({ id, slug, payload, req }: Args) => Promise<void>;
export {};
//# sourceMappingURL=deleteCollectionVersions.d.ts.map