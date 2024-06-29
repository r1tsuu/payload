import type { CollectionSlug, DataFromCollectionSlug, Payload, RequestContext } from '../../../index.js';
import type { PayloadRequestWithData } from '../../../types/index.js';
import type { Result } from '../login.js';
export type Options<TSlug extends CollectionSlug> = {
    collection: TSlug;
    context?: RequestContext;
    data: {
        email: string;
        password: string;
    };
    depth?: number;
    fallbackLocale?: string;
    locale?: string;
    overrideAccess?: boolean;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
};
declare function localLogin<TSlug extends CollectionSlug>(payload: Payload, options: Options<TSlug>): Promise<Result & {
    user: DataFromCollectionSlug<TSlug>;
}>;
export default localLogin;
//# sourceMappingURL=login.d.ts.map