import type { User } from '../auth/types.js';
import type { Payload, RequestContext } from '../index.js';
import type { PayloadRequestWithData } from '../types/index.js';
type CreateLocalReq = (options: {
    context?: RequestContext;
    fallbackLocale?: string;
    locale?: string;
    req?: PayloadRequestWithData;
    user?: User;
}, payload: Payload) => Promise<PayloadRequestWithData>;
export declare const createLocalReq: CreateLocalReq;
export {};
//# sourceMappingURL=createLocalReq.d.ts.map