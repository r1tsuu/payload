import type { Collection } from '../collections/config/types.js';
import type { SanitizedConfig } from '../config/types.js';
import type { PayloadRequestWithData } from '../types/index.js';
import type { FileToSave } from './types.js';
type Args<T> = {
    collection: Collection;
    config: SanitizedConfig;
    data: T;
    operation: 'create' | 'update';
    originalDoc?: T;
    overwriteExistingFiles?: boolean;
    req: PayloadRequestWithData;
    throwOnMissingFile?: boolean;
};
type Result<T> = Promise<{
    data: T;
    files: FileToSave[];
}>;
export declare const generateFileData: <T>({ collection: { config: collectionConfig }, data, operation, originalDoc, overwriteExistingFiles, req, throwOnMissingFile, }: Args<T>) => Result<T>;
export {};
//# sourceMappingURL=generateFileData.d.ts.map