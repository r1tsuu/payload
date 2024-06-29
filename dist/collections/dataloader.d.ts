import DataLoader from 'dataloader';
import type { PayloadRequest } from '../types/index.js';
import type { TypeWithID } from './config/types.js';
export declare const getDataLoader: (req: PayloadRequest) => DataLoader<string, TypeWithID, string>;
type CreateCacheKeyArgs = {
    collectionSlug: string;
    currentDepth: number;
    depth: number;
    docID: number | string;
    draft: boolean;
    fallbackLocale: string;
    locale: string;
    overrideAccess: boolean;
    showHiddenFields: boolean;
    transactionID: number | string;
};
export declare const createDataloaderCacheKey: ({ collectionSlug, currentDepth, depth, docID, draft, fallbackLocale, locale, overrideAccess, showHiddenFields, transactionID, }: CreateCacheKeyArgs) => string;
export {};
//# sourceMappingURL=dataloader.d.ts.map