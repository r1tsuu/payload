import type { CollectionSlug, Payload, TypedLocale } from '../../../index.js';
import type { Document, PayloadRequestWithData, RequestContext } from '../../../types/index.js';
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
    id: number | string;
    locale?: 'all' | TypedLocale;
    overrideAccess?: boolean;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
    user?: Document;
};
export default function findByIDLocal<TSlug extends CollectionSlug>(payload: Payload, options: Options<TSlug>): Promise<DataFromCollectionSlug<TSlug>>;
//# sourceMappingURL=findByID.d.ts.map