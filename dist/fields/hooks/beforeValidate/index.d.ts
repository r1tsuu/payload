import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js';
import type { PayloadRequestWithData, RequestContext } from '../../../types/index.js';
type Args<T> = {
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    data: Record<string, unknown> | T;
    doc?: Record<string, unknown> | T;
    duplicate?: boolean;
    global: SanitizedGlobalConfig | null;
    id?: number | string;
    operation: 'create' | 'update';
    overrideAccess: boolean;
    req: PayloadRequestWithData;
};
/**
 * This function is responsible for the following actions, in order:
 * - Sanitize incoming data
 * - Execute field hooks
 * - Execute field access control
 * - Merge original document data into incoming data
 * - Compute default values for undefined fields
 */
export declare const beforeValidate: <T extends Record<string, unknown>>({ id, collection, context, data: incomingData, doc, global, operation, overrideAccess, req, }: Args<T>) => Promise<T>;
export {};
//# sourceMappingURL=index.d.ts.map