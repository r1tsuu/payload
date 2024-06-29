import type { PaginatedDocs } from '../../../database/types.js';
import type { CollectionSlug, Payload, TypedLocale } from '../../../index.js';
import type { Document, PayloadRequestWithData, RequestContext, Where } from '../../../types/index.js';
import type { DataFromCollectionSlug } from '../../config/types.js';
export type Options<TSlug extends CollectionSlug> = {
    collection: TSlug;
    /**
     * context, which will then be passed to req.context, which can be read by hooks
     */
    context?: RequestContext;
    currentDepth?: number;
    depth?: number;
    disableErrors?: boolean;
    draft?: boolean;
    fallbackLocale?: TypedLocale;
    limit?: number;
    locale?: 'all' | TypedLocale;
    overrideAccess?: boolean;
    page?: number;
    pagination?: boolean;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
    sort?: string;
    user?: Document;
    where?: Where;
};
export declare function findLocal<TSlug extends CollectionSlug>(payload: Payload, options: Options<TSlug>): Promise<PaginatedDocs<DataFromCollectionSlug<TSlug>>>;
//# sourceMappingURL=find.d.ts.map