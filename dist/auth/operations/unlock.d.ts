import type { Collection } from '../../collections/config/types.js';
import type { PayloadRequestWithData } from '../../types/index.js';
export type Args = {
    collection: Collection;
    data: {
        email: string;
    };
    overrideAccess?: boolean;
    req: PayloadRequestWithData;
};
export declare const unlockOperation: (args: Args) => Promise<boolean>;
export default unlockOperation;
//# sourceMappingURL=unlock.d.ts.map