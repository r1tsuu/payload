import type { Payload } from '../../../index.js';
import type { PayloadRequestWithData } from '../../../types/index.js';
export type AdminInitEvent = {
    domainID?: string;
    type: 'admin-init';
    userID?: string;
};
type Args = {
    headers: Request['headers'];
    payload: Payload;
    user: PayloadRequestWithData['user'];
};
export declare const adminInit: ({ headers, payload, user }: Args) => void;
export {};
//# sourceMappingURL=adminInit.d.ts.map