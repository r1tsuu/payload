import type { CollectionSlug, Payload, TypedLocale } from '../../../index.js';
import type { Document, PayloadRequestWithData, RequestContext, Where } from '../../../types/index.js';
export type Options<TSlug extends CollectionSlug> = {
    collection: TSlug;
    /**
     * context, which will then be passed to req.context, which can be read by hooks
     */
    context?: RequestContext;
    depth?: number;
    disableErrors?: boolean;
    locale?: TypedLocale;
    overrideAccess?: boolean;
    req?: PayloadRequestWithData;
    user?: Document;
    where?: Where;
};
export default function countLocal<TSlug extends CollectionSlug>(payload: Payload, options: Options<TSlug>): Promise<{
    totalDocs: number;
}>;
//# sourceMappingURL=count.d.ts.map