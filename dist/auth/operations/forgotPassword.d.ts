import type { Collection } from '../../collections/config/types.js';
import type { PayloadRequestWithData } from '../../types/index.js';
export type Arguments = {
    collection: Collection;
    data: {
        [key: string]: unknown;
        email: string;
    };
    disableEmail?: boolean;
    expiration?: number;
    req: PayloadRequestWithData;
};
export type Result = string;
export declare const forgotPasswordOperation: (incomingArgs: Arguments) => Promise<null | string>;
//# sourceMappingURL=forgotPassword.d.ts.map