import type { CollectionPermission } from '../../auth/index.js';
import type { PayloadRequestWithData } from '../../types/index.js';
import type { Collection } from '../config/types.js';
type Arguments = {
    collection: Collection;
    id: string;
    req: PayloadRequestWithData;
};
export declare function docAccessOperation(args: Arguments): Promise<CollectionPermission>;
export {};
//# sourceMappingURL=docAccess.d.ts.map