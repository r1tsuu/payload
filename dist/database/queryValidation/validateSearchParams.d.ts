import type { SanitizedCollectionConfig } from '../../collections/config/types.js';
import type { Field } from '../../fields/config/types.js';
import type { SanitizedGlobalConfig } from '../../globals/config/types.js';
import type { PayloadRequestWithData } from '../../types/index.js';
import type { EntityPolicies } from './types.js';
type Args = {
    collectionConfig?: SanitizedCollectionConfig;
    errors: {
        path: string;
    }[];
    fields: Field[];
    globalConfig?: SanitizedGlobalConfig;
    operator: string;
    overrideAccess: boolean;
    path: string;
    policies: EntityPolicies;
    req: PayloadRequestWithData;
    val: unknown;
    versionFields?: Field[];
};
/**
 * Validate the Payload key / value / operator
 */
export declare function validateSearchParam({ collectionConfig, errors, fields, globalConfig, operator, overrideAccess, path: incomingPath, policies, req, val, versionFields, }: Args): Promise<void>;
export {};
//# sourceMappingURL=validateSearchParams.d.ts.map