import type { SanitizedCollectionConfig, TypeWithID } from '../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../globals/config/types.js';
import type { Payload } from '../index.js';
import type { PayloadRequestWithData } from '../types/index.js';
type Args = {
    autosave?: boolean;
    collection?: SanitizedCollectionConfig;
    docWithLocales: any;
    draft?: boolean;
    global?: SanitizedGlobalConfig;
    id?: number | string;
    payload: Payload;
    req?: PayloadRequestWithData;
};
export declare const saveVersion: ({ id, autosave, collection, docWithLocales: doc, draft, global, payload, req, }: Args) => Promise<TypeWithID>;
export {};
//# sourceMappingURL=saveVersion.d.ts.map