import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js';
import type { PayloadRequestWithData, RequestContext } from '../../../types/index.js';
type Args = {
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    currentDepth?: number;
    depth: number;
    doc: Record<string, unknown>;
    draft: boolean;
    fallbackLocale: null | string;
    findMany?: boolean;
    flattenLocales?: boolean;
    global: SanitizedGlobalConfig | null;
    locale: string;
    overrideAccess: boolean;
    req: PayloadRequestWithData;
    showHiddenFields: boolean;
};
/**
 * This function is responsible for the following actions, in order:
 * - Remove hidden fields from response
 * - Flatten locales into requested locale. If the input doc contains all locales, the output doc after this function will only contain the requested locale.
 * - Sanitize outgoing data (point field, etc.)
 * - Execute field hooks
 * - Execute read access control
 * - Populate relationships
 */
export declare function afterRead<T = any>(args: Args): Promise<T>;
export {};
//# sourceMappingURL=index.d.ts.map