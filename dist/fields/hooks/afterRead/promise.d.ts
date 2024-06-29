import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js';
import type { PayloadRequestWithData, RequestContext } from '../../../types/index.js';
import type { Field, TabAsField } from '../../config/types.js';
type Args = {
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    currentDepth: number;
    depth: number;
    doc: Record<string, unknown>;
    draft: boolean;
    fallbackLocale: null | string;
    field: Field | TabAsField;
    /**
     * fieldPromises are used for things like field hooks. They should be awaited before awaiting populationPromises
     */
    fieldPromises: Promise<void>[];
    findMany: boolean;
    flattenLocales: boolean;
    global: SanitizedGlobalConfig | null;
    locale: null | string;
    overrideAccess: boolean;
    /**
     * The parent's path.
     */
    parentPath: (number | string)[];
    /**
     * The parent's schemaPath (path without indexes).
     */
    parentSchemaPath: string[];
    populationPromises: Promise<void>[];
    req: PayloadRequestWithData;
    showHiddenFields: boolean;
    siblingDoc: Record<string, unknown>;
    triggerAccessControl?: boolean;
    triggerHooks?: boolean;
};
export declare const promise: ({ collection, context, currentDepth, depth, doc, draft, fallbackLocale, field, fieldPromises, findMany, flattenLocales, global, locale, overrideAccess, parentPath, parentSchemaPath, populationPromises, req, showHiddenFields, siblingDoc, triggerAccessControl, triggerHooks, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=promise.d.ts.map