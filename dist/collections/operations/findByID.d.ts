import type { CollectionSlug } from '../../index.js';
import type { PayloadRequestWithData } from '../../types/index.js';
import type { Collection, DataFromCollectionSlug } from '../config/types.js';
export type Arguments = {
    collection: Collection;
    currentDepth?: number;
    depth?: number;
    disableErrors?: boolean;
    draft?: boolean;
    id: number | string;
    overrideAccess?: boolean;
    req: PayloadRequestWithData;
    showHiddenFields?: boolean;
};
export declare const findByIDOperation: <TSlug extends CollectionSlug>(incomingArgs: Arguments) => Promise<DataFromCollectionSlug<TSlug>>;
//# sourceMappingURL=findByID.d.ts.map