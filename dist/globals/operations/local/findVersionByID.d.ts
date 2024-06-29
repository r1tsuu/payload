import type { GlobalSlug, Payload, RequestContext, TypedLocale } from '../../../index.js';
import type { Document, PayloadRequestWithData } from '../../../types/index.js';
import type { TypeWithVersion } from '../../../versions/types.js';
import type { DataFromGlobalSlug } from '../../config/types.js';
export type Options<TSlug extends GlobalSlug> = {
    context?: RequestContext;
    depth?: number;
    disableErrors?: boolean;
    fallbackLocale?: TypedLocale;
    id: string;
    locale?: 'all' | TypedLocale;
    overrideAccess?: boolean;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
    slug: TSlug;
    user?: Document;
};
export default function findVersionByIDLocal<TSlug extends GlobalSlug>(payload: Payload, options: Options<TSlug>): Promise<TypeWithVersion<DataFromGlobalSlug<TSlug>>>;
//# sourceMappingURL=findVersionByID.d.ts.map