import type { CollectionSlug, Payload, RequestContext } from '../../../index.js';
import type { PayloadRequestWithData } from '../../../types/index.js';
export type Options<T extends CollectionSlug> = {
    collection: T;
    context?: RequestContext;
    data: {
        email: any;
    };
    overrideAccess: boolean;
    req?: PayloadRequestWithData;
};
declare function localUnlock<T extends CollectionSlug>(payload: Payload, options: Options<T>): Promise<boolean>;
export default localUnlock;
//# sourceMappingURL=unlock.d.ts.map