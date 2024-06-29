import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js';
import type { Operation, PayloadRequestWithData, RequestContext } from '../../../types/index.js';
type Args<T> = {
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    data: Record<string, unknown> | T;
    doc: Record<string, unknown> | T;
    docWithLocales: Record<string, unknown>;
    duplicate?: boolean;
    global: SanitizedGlobalConfig | null;
    id?: number | string;
    operation: Operation;
    req: PayloadRequestWithData;
    skipValidation?: boolean;
};
/**
 * This function is responsible for the following actions, in order:
 * - Run condition
 * - Execute field hooks
 * - Validate data
 * - Transform data for storage
 * - beforeDuplicate hooks (if duplicate)
 * - Unflatten locales. The input `data` is the normal document for one locale. The output result will become the document with locales.
 */
export declare const beforeChange: <T extends Record<string, unknown>>({ id, collection, context, data: incomingData, doc, docWithLocales, duplicate, global, operation, req, skipValidation, }: Args<T>) => Promise<T>;
export {};
//# sourceMappingURL=index.d.ts.map