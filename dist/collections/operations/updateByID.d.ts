import type { DeepPartial } from 'ts-essentials';
import type { CollectionSlug } from '../../index.js';
import type { PayloadRequestWithData } from '../../types/index.js';
import type { Collection, DataFromCollectionSlug, RequiredDataFromCollectionSlug } from '../config/types.js';
export type Arguments<TSlug extends CollectionSlug> = {
    autosave?: boolean;
    collection: Collection;
    data: DeepPartial<RequiredDataFromCollectionSlug<TSlug>>;
    depth?: number;
    disableVerificationEmail?: boolean;
    draft?: boolean;
    id: number | string;
    overrideAccess?: boolean;
    overwriteExistingFiles?: boolean;
    req: PayloadRequestWithData;
    showHiddenFields?: boolean;
};
export declare const updateByIDOperation: <TSlug extends CollectionSlug>(incomingArgs: Arguments<TSlug>) => Promise<DataFromCollectionSlug<TSlug>>;
//# sourceMappingURL=updateByID.d.ts.map