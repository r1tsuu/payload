import type { PayloadRequestWithData } from '../types/index.js';
import type { Permissions } from './types.js';
type GetAccessResultsArgs = {
    req: PayloadRequestWithData;
};
export declare function getAccessResults({ req }: GetAccessResultsArgs): Promise<Permissions>;
export {};
//# sourceMappingURL=getAccessResults.d.ts.map