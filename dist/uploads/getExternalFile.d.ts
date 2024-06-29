import type { PayloadRequestWithData } from '../types/index.js';
import type { File, FileData, UploadConfig } from './types.js';
type Args = {
    data: FileData;
    req: PayloadRequestWithData;
    uploadConfig: UploadConfig;
};
export declare const getExternalFile: ({ data, req, uploadConfig }: Args) => Promise<File>;
export {};
//# sourceMappingURL=getExternalFile.d.ts.map