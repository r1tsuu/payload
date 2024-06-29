import type { CollectionPermission, GlobalPermission } from '../auth/types.js';
import type { SanitizedCollectionConfig } from '../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../globals/config/types.js';
import type { AllOperations, PayloadRequestWithData } from '../types/index.js';
type Args = {
    entity: SanitizedCollectionConfig | SanitizedGlobalConfig;
    id?: number | string;
    operations: AllOperations[];
    req: PayloadRequestWithData;
    type: 'collection' | 'global';
};
type ReturnType<T extends Args> = T['type'] extends 'global' ? GlobalPermission : CollectionPermission;
export declare function getEntityPolicies<T extends Args>(args: T): Promise<ReturnType<T>>;
export {};
//# sourceMappingURL=getEntityPolicies.d.ts.map