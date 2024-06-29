import type { CollectionSlug, TypedLocale } from '../../..//index.js';
import type { Payload } from '../../../index.js';
import type { Document, PayloadRequestWithData, RequestContext } from '../../../types/index.js';
import type { DataFromCollectionSlug } from '../../config/types.js';
export type Options<TSlug extends CollectionSlug> = {
    collection: TSlug;
    /**
     * context, which will then be passed to req.context, which can be read by hooks
     */
    context?: RequestContext;
    depth?: number;
    draft?: boolean;
    fallbackLocale?: TypedLocale;
    id: number | string;
    locale?: TypedLocale;
    overrideAccess?: boolean;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
    user?: Document;
};
export declare function duplicate<TSlug extends CollectionSlug>(payload: Payload, options: Options<TSlug>): Promise<DataFromCollectionSlug<TSlug>>;
//# sourceMappingURL=duplicate.d.ts.map