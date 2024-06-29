import type { PayloadRequestWithData } from '../../types/index.js';
import type { TypeWithVersion } from '../../versions/types.js';
import type { SanitizedGlobalConfig } from '../config/types.js';
export type Arguments = {
    depth?: number;
    globalConfig: SanitizedGlobalConfig;
    id: number | string;
    overrideAccess?: boolean;
    req?: PayloadRequestWithData;
    showHiddenFields?: boolean;
};
export declare const restoreVersionOperation: <T extends TypeWithVersion<T> = any>(args: Arguments) => Promise<T>;
//# sourceMappingURL=restoreVersion.d.ts.map