import type { DeepPartial } from 'ts-essentials';
import type { GlobalSlug } from '../../index.js';
import type { PayloadRequestWithData } from '../../types/index.js';
import type { DataFromGlobalSlug, SanitizedGlobalConfig } from '../config/types.js';
type Args<TSlug extends GlobalSlug> = {
    autosave?: boolean;
    data: DeepPartial<Omit<DataFromGlobalSlug<TSlug>, 'id'>>;
    depth?: number;
    draft?: boolean;
    globalConfig: SanitizedGlobalConfig;
    overrideAccess?: boolean;
    req: PayloadRequestWithData;
    showHiddenFields?: boolean;
    slug: string;
};
export declare const updateOperation: <TSlug extends GlobalSlug>(args: Args<TSlug>) => Promise<DataFromGlobalSlug<TSlug>>;
export {};
//# sourceMappingURL=update.d.ts.map