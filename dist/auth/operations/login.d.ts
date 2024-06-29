import type { Collection, DataFromCollectionSlug } from '../../collections/config/types.js';
import type { CollectionSlug } from '../../index.js';
import type { PayloadRequestWithData } from '../../types/index.js';
import type { User } from '../types.js';
export type Result = {
    exp?: number;
    token?: string;
    user?: User;
};
export type Arguments = {
    collection: Collection;
    data: {
        email: string;
        password: string;
    };
    depth?: number;
    overrideAccess?: boolean;
    req: PayloadRequestWithData;
    showHiddenFields?: boolean;
};
export declare const loginOperation: <TSlug extends CollectionSlug>(incomingArgs: Arguments) => Promise<Result & {
    user: DataFromCollectionSlug<TSlug>;
}>;
//# sourceMappingURL=login.d.ts.map