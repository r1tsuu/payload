import type { PayloadRequestWithData } from '../types/index.js';
type Args = {
    collectionSlug: string;
    filename: string;
    path: string;
    req: PayloadRequestWithData;
};
declare const docWithFilenameExists: ({ collectionSlug, filename, req }: Args) => Promise<boolean>;
export default docWithFilenameExists;
//# sourceMappingURL=docWithFilenameExists.d.ts.map