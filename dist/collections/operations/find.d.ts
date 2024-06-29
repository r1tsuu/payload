import type { PaginatedDocs } from '../../database/types.js';
import type { CollectionSlug } from '../../index.js';
import type { PayloadRequestWithData, Where } from '../../types/index.js';
import type { Collection, DataFromCollectionSlug } from '../config/types.js';
export type Arguments = {
    collection: Collection;
    currentDepth?: number;
    depth?: number;
    disableErrors?: boolean;
    draft?: boolean;
    limit?: number;
    overrideAccess?: boolean;
    page?: number;
    pagination?: boolean;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
    sort?: string;
    where?: Where;
};
export declare const findOperation: <TSlug extends CollectionSlug>(incomingArgs: Arguments) => Promise<PaginatedDocs<DataFromCollectionSlug<TSlug>>>;
//# sourceMappingURL=find.d.ts.map