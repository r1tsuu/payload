import type { PaginatedDocs } from '../../../database/types.js';
import type { GlobalSlug, Payload, RequestContext, TypedLocale } from '../../../index.js';
import type { Document, PayloadRequestWithData, Where } from '../../../types/index.js';
import type { TypeWithVersion } from '../../../versions/types.js';
import type { DataFromGlobalSlug } from '../../config/types.js';
export type Options<TSlug extends GlobalSlug> = {
    context?: RequestContext;
    depth?: number;
    fallbackLocale?: TypedLocale;
    limit?: number;
    locale?: 'all' | TypedLocale;
    overrideAccess?: boolean;
    page?: number;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
    slug: TSlug;
    sort?: string;
    user?: Document;
    where?: Where;
};
export default function findVersionsLocal<TSlug extends GlobalSlug>(payload: Payload, options: Options<TSlug>): Promise<PaginatedDocs<TypeWithVersion<DataFromGlobalSlug<TSlug>>>>;
//# sourceMappingURL=findVersions.d.ts.map