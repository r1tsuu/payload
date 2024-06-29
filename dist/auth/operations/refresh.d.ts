import type { Collection } from '../../collections/config/types.js';
import type { Document, PayloadRequestWithData } from '../../types/index.js';
export type Result = {
    exp: number;
    refreshedToken: string;
    setCookie?: boolean;
    strategy?: string;
    user: Document;
};
export type Arguments = {
    collection: Collection;
    req: PayloadRequestWithData;
};
export declare const refreshOperation: (incomingArgs: Arguments) => Promise<Result>;
//# sourceMappingURL=refresh.d.ts.map