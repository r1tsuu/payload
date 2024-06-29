import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js';
import type { PayloadRequestWithData, RequestContext } from '../../../types/index.js';
type Args<T> = {
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    /**
     * The data before hooks
     */
    data: Record<string, unknown> | T;
    /**
     * The data after hooks
     */
    doc: Record<string, unknown> | T;
    global: SanitizedGlobalConfig | null;
    operation: 'create' | 'update';
    previousDoc: Record<string, unknown> | T;
    req: PayloadRequestWithData;
};
/**
 * This function is responsible for the following actions, in order:
 * - Execute field hooks
 */
export declare const afterChange: <T extends Record<string, unknown>>({ collection, context, data, doc: incomingDoc, global, operation, previousDoc, req, }: Args<T>) => Promise<T>;
export {};
//# sourceMappingURL=index.d.ts.map