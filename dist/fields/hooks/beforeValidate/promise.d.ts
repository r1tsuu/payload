import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js';
import type { PayloadRequestWithData, RequestContext } from '../../../types/index.js';
import type { Field, TabAsField } from '../../config/types.js';
type Args<T> = {
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    data: T;
    /**
     * The original data (not modified by any hooks)
     */
    doc: T;
    field: Field | TabAsField;
    global: SanitizedGlobalConfig | null;
    id?: number | string;
    operation: 'create' | 'update';
    overrideAccess: boolean;
    parentPath: (number | string)[];
    parentSchemaPath: string[];
    req: PayloadRequestWithData;
    siblingData: Record<string, unknown>;
    /**
     * The original siblingData (not modified by any hooks)
     */
    siblingDoc: Record<string, unknown>;
};
export declare const promise: <T>({ id, collection, context, data, doc, field, global, operation, overrideAccess, parentPath, parentSchemaPath, req, siblingData, siblingDoc, }: Args<T>) => Promise<void>;
export {};
//# sourceMappingURL=promise.d.ts.map