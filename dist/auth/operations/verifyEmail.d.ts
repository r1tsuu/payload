import type { Collection } from '../../collections/config/types.js';
import type { PayloadRequestWithData } from '../../types/index.js';
export type Args = {
    collection: Collection;
    req: PayloadRequestWithData;
    token: string;
};
export declare const verifyEmailOperation: (args: Args) => Promise<boolean>;
export default verifyEmailOperation;
//# sourceMappingURL=verifyEmail.d.ts.map