import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js';
import type { Operation, PayloadRequestWithData, RequestContext } from '../../../types/index.js';
import type { Field, TabAsField } from '../../config/types.js';
type Args = {
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    data: Record<string, unknown>;
    doc: Record<string, unknown>;
    docWithLocales: Record<string, unknown>;
    duplicate: boolean;
    errors: {
        field: string;
        message: string;
    }[];
    field: Field | TabAsField;
    global: SanitizedGlobalConfig | null;
    id?: number | string;
    mergeLocaleActions: (() => Promise<void>)[];
    operation: Operation;
    /**
     * The parent's path.
     */
    parentPath: (number | string)[];
    /**
     * The parent's schemaPath (path without indexes).
     */
    parentSchemaPath: string[];
    req: PayloadRequestWithData;
    siblingData: Record<string, unknown>;
    siblingDoc: Record<string, unknown>;
    siblingDocWithLocales?: Record<string, unknown>;
    skipValidation: boolean;
};
export declare const promise: ({ id, collection, context, data, doc, docWithLocales, duplicate, errors, field, global, mergeLocaleActions, operation, parentPath, parentSchemaPath, req, siblingData, siblingDoc, siblingDocWithLocales, skipValidation, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=promise.d.ts.map