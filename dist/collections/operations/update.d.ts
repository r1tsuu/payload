import type { DeepPartial } from 'ts-essentials';
import type { CollectionSlug } from '../../index.js';
import type { PayloadRequestWithData, Where } from '../../types/index.js';
import type { BulkOperationResult, Collection, RequiredDataFromCollectionSlug } from '../config/types.js';
export type Arguments<TSlug extends CollectionSlug> = {
    collection: Collection;
    data: DeepPartial<RequiredDataFromCollectionSlug<TSlug>>;
    depth?: number;
    disableVerificationEmail?: boolean;
    draft?: boolean;
    overrideAccess?: boolean;
    overwriteExistingFiles?: boolean;
    req: PayloadRequestWithData;
    showHiddenFields?: boolean;
    where: Where;
};
export declare const updateOperation: <TSlug extends CollectionSlug>(incomingArgs: Arguments<TSlug>) => Promise<BulkOperationResult<TSlug>>;
//# sourceMappingURL=update.d.ts.map