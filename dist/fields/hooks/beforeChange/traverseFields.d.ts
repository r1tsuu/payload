import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js';
import type { Operation, PayloadRequestWithData, RequestContext } from '../../../types/index.js';
import type { Field, TabAsField } from '../../config/types.js';
type Args = {
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    data: Record<string, unknown>;
    /**
     * The original data (not modified by any hooks)
     */
    doc: Record<string, unknown>;
    /**
     * The original data with locales (not modified by any hooks)
     */
    docWithLocales: Record<string, unknown>;
    duplicate: boolean;
    errors: {
        field: string;
        message: string;
    }[];
    fields: (Field | TabAsField)[];
    global: SanitizedGlobalConfig | null;
    id?: number | string;
    mergeLocaleActions: (() => Promise<void>)[];
    operation: Operation;
    path: (number | string)[];
    req: PayloadRequestWithData;
    schemaPath: string[];
    siblingData: Record<string, unknown>;
    /**
     * The original siblingData (not modified by any hooks)
     */
    siblingDoc: Record<string, unknown>;
    /**
     * The original siblingData with locales (not modified by any hooks)
     */
    siblingDocWithLocales: Record<string, unknown>;
    skipValidation?: boolean;
};
/**
 * This function is responsible for the following actions, in order:
 * - Run condition
 * - Execute field hooks
 * - Validate data
 * - Transform data for storage
 * - Unflatten locales. The input `data` is the normal document for one locale. The output result will become the document with locales.
 */
export declare const traverseFields: ({ id, collection, context, data, doc, docWithLocales, duplicate, errors, fields, global, mergeLocaleActions, operation, path, req, schemaPath, siblingData, siblingDoc, siblingDocWithLocales, skipValidation, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=traverseFields.d.ts.map