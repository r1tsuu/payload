import type { Config, SanitizedConfig } from '../../config/types.js';
import type { SanitizedGlobalConfig } from './types.js';
export declare const sanitizeGlobals: (config: Config, richTextSanitizationPromises?: Array<(config: SanitizedConfig) => Promise<void>>) => Promise<SanitizedGlobalConfig[]>;
//# sourceMappingURL=sanitize.d.ts.map