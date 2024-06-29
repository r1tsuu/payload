import type { SanitizedCollectionConfig } from '../collections/config/types.js';
import type { SanitizedConfig } from '../config/types.js';
import type { PayloadRequestWithData } from '../types/index.js';
type Args = {
    collectionConfig: SanitizedCollectionConfig;
    config: SanitizedConfig;
    req: PayloadRequestWithData;
};
/**
 * Cleanup temp files after operation lifecycle
 */
export declare const unlinkTempFiles: (args: Args) => Promise<void>;
export {};
//# sourceMappingURL=unlinkTempFiles.d.ts.map