import type { CollectionSlug, Payload, TypedLocale } from '../../../index.js';
import type { Document, PayloadRequestWithData, RequestContext } from '../../../types/index.js';
import type { File } from '../../../uploads/types.js';
import type { DataFromCollectionSlug, RequiredDataFromCollectionSlug } from '../../config/types.js';
export type Options<TSlug extends CollectionSlug> = {
    collection: TSlug;
    /**
     * context, which will then be passed to req.context, which can be read by hooks
     */
    context?: RequestContext;
    data: RequiredDataFromCollectionSlug<TSlug>;
    depth?: number;
    disableVerificationEmail?: boolean;
    draft?: boolean;
    fallbackLocale?: TypedLocale;
    file?: File;
    filePath?: string;
    locale?: TypedLocale;
    overrideAccess?: boolean;
    overwriteExistingFiles?: boolean;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
    user?: Document;
};
export default function createLocal<TSlug extends CollectionSlug>(payload: Payload, options: Options<TSlug>): Promise<DataFromCollectionSlug<TSlug>>;
//# sourceMappingURL=create.d.ts.map