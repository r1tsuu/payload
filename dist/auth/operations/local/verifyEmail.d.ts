import type { CollectionSlug, Payload, RequestContext } from '../../../index.js';
import type { PayloadRequestWithData } from '../../../types/index.js';
export type Options<T extends CollectionSlug> = {
    collection: T;
    context?: RequestContext;
    req?: PayloadRequestWithData;
    token: string;
};
declare function localVerifyEmail<T extends CollectionSlug>(payload: Payload, options: Options<T>): Promise<boolean>;
export default localVerifyEmail;
//# sourceMappingURL=verifyEmail.d.ts.map