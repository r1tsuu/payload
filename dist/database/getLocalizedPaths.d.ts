import type { Field } from '../fields/config/types.js';
import type { Payload } from '../index.js';
import type { PathToQuery } from './queryValidation/types.js';
export declare function getLocalizedPaths({ collectionSlug, fields, globalSlug, incomingPath, locale, overrideAccess, payload, }: {
    collectionSlug?: string;
    fields: Field[];
    globalSlug?: string;
    incomingPath: string;
    locale?: string;
    overrideAccess?: boolean;
    payload: Payload;
}): Promise<PathToQuery[]>;
//# sourceMappingURL=getLocalizedPaths.d.ts.map