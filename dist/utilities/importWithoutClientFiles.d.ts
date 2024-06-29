import type { SanitizedConfig } from '../config/types.js';
export declare const importWithoutClientFiles: <T = unknown>(filePath: string) => Promise<T>;
/**
 * Resolve and load Payload config from either a relative or absolute path
 */
export declare const importConfig: (configPath: string) => Promise<SanitizedConfig>;
//# sourceMappingURL=importWithoutClientFiles.d.ts.map