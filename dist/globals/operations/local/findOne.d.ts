import type { GlobalSlug, Payload, RequestContext, TypedLocale } from '../../../index.js';
import type { Document, PayloadRequestWithData } from '../../../types/index.js';
import type { DataFromGlobalSlug } from '../../config/types.js';
export type Options<TSlug extends GlobalSlug> = {
    context?: RequestContext;
    depth?: number;
    draft?: boolean;
    fallbackLocale?: TypedLocale;
    locale?: 'all' | TypedLocale;
    overrideAccess?: boolean;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
    slug: TSlug;
    user?: Document;
};
export default function findOneLocal<TSlug extends GlobalSlug>(payload: Payload, options: Options<TSlug>): Promise<DataFromGlobalSlug<TSlug>>;
//# sourceMappingURL=findOne.d.ts.map