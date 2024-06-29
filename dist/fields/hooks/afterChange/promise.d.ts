import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js';
import type { PayloadRequestWithData, RequestContext } from '../../../types/index.js';
import type { Field, TabAsField } from '../../config/types.js';
type Args = {
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    data: Record<string, unknown>;
    doc: Record<string, unknown>;
    field: Field | TabAsField;
    global: SanitizedGlobalConfig | null;
    operation: 'create' | 'update';
    /**
     * The parent's path
     */
    parentPath: (number | string)[];
    /**
     * The parent's schemaPath (path without indexes).
     */
    parentSchemaPath: string[];
    previousDoc: Record<string, unknown>;
    previousSiblingDoc: Record<string, unknown>;
    req: PayloadRequestWithData;
    siblingData: Record<string, unknown>;
    siblingDoc: Record<string, unknown>;
};
export declare const promise: ({ collection, context, data, doc, field, global, operation, parentPath, parentSchemaPath, previousDoc, previousSiblingDoc, req, siblingData, siblingDoc, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=promise.d.ts.map