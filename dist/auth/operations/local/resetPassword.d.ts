import type { CollectionSlug, Payload, RequestContext } from '../../../index.js';
import type { PayloadRequestWithData } from '../../../types/index.js';
import type { Result } from '../resetPassword.js';
export type Options<T extends CollectionSlug> = {
    collection: T;
    context?: RequestContext;
    data: {
        password: string;
        token: string;
    };
    overrideAccess: boolean;
    req?: PayloadRequestWithData;
};
declare function localResetPassword<T extends CollectionSlug>(payload: Payload, options: Options<T>): Promise<Result>;
export default localResetPassword;
//# sourceMappingURL=resetPassword.d.ts.map