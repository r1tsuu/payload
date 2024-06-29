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
    /**
     * fieldPromises are used for things like field hooks. They should be awaited before awaiting populationPromises
     */
    fieldPromises: Promise<void>[];
    fields: (Field | TabAsField)[];
    findMany: boolean;
    flattenLocales: boolean;
    global: SanitizedGlobalConfig | null;
    locale: null | string;
    overrideAccess: boolean;
    path: (number | string)[];
    populationPromises: Promise<void>[];
    req: PayloadRequestWithData;
    schemaPath: string[];
    showHiddenFields: boolean;
    siblingDoc: Record<string, unknown>;
    triggerAccessControl?: boolean;
    triggerHooks?: boolean;
};
export declare const traverseFields: ({ collection, context, currentDepth, depth, doc, draft, fallbackLocale, fieldPromises, fields, findMany, flattenLocales, global, locale, overrideAccess, path, populationPromises, req, schemaPath, showHiddenFields, siblingDoc, triggerAccessControl, triggerHooks, }: Args) => void;
export {};
//# sourceMappingURL=traverseFields.d.ts.map