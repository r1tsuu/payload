import type { TypedUser } from '../../index.js';
import type { PayloadRequestWithData } from '../../types/index.js';
import type { Permissions } from '../types.js';
export type AuthArgs = {
    headers: Request['headers'];
    req?: Omit<PayloadRequestWithData, 'user'>;
};
export type AuthResult = {
    permissions: Permissions;
    responseHeaders?: Headers;
    user: TypedUser | null;
};
export declare const auth: (args: Required<AuthArgs>) => Promise<AuthResult>;
//# sourceMappingURL=auth.d.ts.map