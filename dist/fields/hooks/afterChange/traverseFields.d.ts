import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js';
import type { PayloadRequestWithData, RequestContext } from '../../../types/index.js';
import type { Field, TabAsField } from '../../config/types.js';
type Args = {
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    data: Record<string, unknown>;
    doc: Record<string, unknown>;
    fields: (Field | TabAsField)[];
    global: SanitizedGlobalConfig | null;
    operation: 'create' | 'update';
    path: (number | string)[];
    previousDoc: Record<string, unknown>;
    previousSiblingDoc: Record<string, unknown>;
    req: PayloadRequestWithData;
    schemaPath: string[];
    siblingData: Record<string, unknown>;
    siblingDoc: Record<string, unknown>;
};
export declare const traverseFields: ({ collection, context, data, doc, fields, global, operation, path, previousDoc, previousSiblingDoc, req, schemaPath, siblingData, siblingDoc, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=traverseFields.d.ts.map