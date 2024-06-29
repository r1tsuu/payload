import type { PayloadRequestWithData } from '../../../types/index.js';
import type { RelationshipField, UploadField } from '../../config/types.js';
type PromiseArgs = {
    currentDepth: number;
    depth: number;
    draft: boolean;
    fallbackLocale: null | string;
    field: RelationshipField | UploadField;
    locale: null | string;
    overrideAccess: boolean;
    req: PayloadRequestWithData;
    showHiddenFields: boolean;
    siblingDoc: Record<string, any>;
};
export declare const relationshipPopulationPromise: ({ currentDepth, depth, draft, fallbackLocale, field, locale, overrideAccess, req, showHiddenFields, siblingDoc, }: PromiseArgs) => Promise<void>;
export {};
//# sourceMappingURL=relationshipPopulationPromise.d.ts.map