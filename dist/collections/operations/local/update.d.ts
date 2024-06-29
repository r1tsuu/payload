import type { DeepPartial } from 'ts-essentials';
import type { CollectionSlug, Payload, TypedLocale } from '../../../index.js';
import type { Document, PayloadRequestWithData, RequestContext, Where } from '../../../types/index.js';
import type { File } from '../../../uploads/types.js';
import type { BulkOperationResult, DataFromCollectionSlug, RequiredDataFromCollectionSlug } from '../../config/types.js';
export type BaseOptions<TSlug extends CollectionSlug> = {
    autosave?: boolean;
    collection: TSlug;
    /**
     * context, which will then be passed to req.context, which can be read by hooks
     */
    context?: RequestContext;
    data: DeepPartial<RequiredDataFromCollectionSlug<TSlug>>;
    depth?: number;
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
export type ByIDOptions<TSlug extends CollectionSlug> = BaseOptions<TSlug> & {
    id: number | string;
    where?: never;
};
export type ManyOptions<TSlug extends CollectionSlug> = BaseOptions<TSlug> & {
    id?: never;
    where: Where;
};
export type Options<TSlug extends CollectionSlug> = ByIDOptions<TSlug> | ManyOptions<TSlug>;
declare function updateLocal<TSlug extends CollectionSlug>(payload: Payload, options: ByIDOptions<TSlug>): Promise<DataFromCollectionSlug<TSlug>>;
declare function updateLocal<TSlug extends CollectionSlug>(payload: Payload, options: ManyOptions<TSlug>): Promise<BulkOperationResult<TSlug>>;
declare function updateLocal<TSlug extends CollectionSlug>(payload: Payload, options: Options<TSlug>): Promise<BulkOperationResult<TSlug> | DataFromCollectionSlug<TSlug>>;
export default updateLocal;
//# sourceMappingURL=update.d.ts.map