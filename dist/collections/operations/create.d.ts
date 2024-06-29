import type { CollectionSlug } from '../../index.js';
import type { PayloadRequestWithData } from '../../types/index.js';
import type { Collection, DataFromCollectionSlug, RequiredDataFromCollectionSlug } from '../config/types.js';
export type Arguments<TSlug extends CollectionSlug> = {
    autosave?: boolean;
    collection: Collection;
    data: RequiredDataFromCollectionSlug<TSlug>;
    depth?: number;
    disableVerificationEmail?: boolean;
    draft?: boolean;
    overrideAccess?: boolean;
    overwriteExistingFiles?: boolean;
    req: PayloadRequestWithData;
    showHiddenFields?: boolean;
};
export declare const createOperation: <TSlug extends CollectionSlug>(incomingArgs: Arguments<TSlug>) => Promise<DataFromCollectionSlug<TSlug>>;
//# sourceMappingURL=create.d.ts.map