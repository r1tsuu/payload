import type { PaginatedDocs } from '../../database/types.js';
import type { PayloadRequestWithData, Where } from '../../types/index.js';
import type { TypeWithVersion } from '../../versions/types.js';
import type { Collection } from '../config/types.js';
export type Arguments = {
    collection: Collection;
    depth?: number;
    limit?: number;
    overrideAccess?: boolean;
    page?: number;
    pagination?: boolean;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
    sort?: string;
    where?: Where;
};
export declare const findVersionsOperation: <TData extends TypeWithVersion<TData>>(args: Arguments) => Promise<PaginatedDocs<TData>>;
//# sourceMappingURL=findVersions.d.ts.map