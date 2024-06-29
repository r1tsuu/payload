import type { SanitizedCollectionConfig } from '../collections/config/types.js';
import type { SanitizedGlobalConfig } from '../globals/config/types.js';
import type { PayloadRequestWithData } from '../types/index.js';
export declare const isEntityHidden: ({ hidden, user, }: {
    hidden: SanitizedCollectionConfig["admin"]["hidden"] | SanitizedGlobalConfig["admin"]["hidden"];
    user: PayloadRequestWithData["user"];
}) => boolean;
//# sourceMappingURL=isEntityHidden.d.ts.map