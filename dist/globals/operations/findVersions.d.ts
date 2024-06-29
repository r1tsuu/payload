import type { PaginatedDocs } from '../../database/types.js';
import type { PayloadRequestWithData, Where } from '../../types/index.js';
import type { TypeWithVersion } from '../../versions/types.js';
import type { SanitizedGlobalConfig } from '../config/types.js';
export type Arguments = {
    depth?: number;
    globalConfig: SanitizedGlobalConfig;
    limit?: number;
    overrideAccess?: boolean;
    page?: number;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
    sort?: string;
    where?: Where;
};
export declare const findVersionsOperation: <T extends TypeWithVersion<T>>(args: Arguments) => Promise<PaginatedDocs<T>>;
//# sourceMappingURL=findVersions.d.ts.map