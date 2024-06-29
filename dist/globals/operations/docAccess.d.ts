import type { GlobalPermission } from '../../auth/index.js';
import type { PayloadRequestWithData } from '../../types/index.js';
import type { SanitizedGlobalConfig } from '../config/types.js';
type Arguments = {
    globalConfig: SanitizedGlobalConfig;
    req: PayloadRequestWithData;
};
export declare const docAccessOperation: (args: Arguments) => Promise<GlobalPermission>;
export {};
//# sourceMappingURL=docAccess.d.ts.map