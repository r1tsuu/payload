import type { PayloadRequestWithData } from '../types/index.js';
type Args = {
    collectionSlug: string;
    desiredFilename: string;
    req: PayloadRequestWithData;
    staticPath: string;
};
export declare function getSafeFileName({ collectionSlug, desiredFilename, req, staticPath, }: Args): Promise<string>;
export {};
//# sourceMappingURL=getSafeFilename.d.ts.map