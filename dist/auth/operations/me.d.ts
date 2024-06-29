import type { Collection } from '../../collections/config/types.js';
import type { PayloadRequestWithData } from '../../types/index.js';
import type { ClientUser } from '../types.js';
export type MeOperationResult = {
    collection?: string;
    exp?: number;
    strategy?: string;
    token?: string;
    user?: ClientUser;
};
export type Arguments = {
    collection: Collection;
    currentToken?: string;
    req: PayloadRequestWithData;
};
export declare const meOperation: (args: Arguments) => Promise<MeOperationResult>;
//# sourceMappingURL=me.d.ts.map