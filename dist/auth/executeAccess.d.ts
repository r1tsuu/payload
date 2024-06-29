import type { Access, AccessResult } from '../config/types.js';
import type { PayloadRequestWithData } from '../types/index.js';
type OperationArgs = {
    data?: any;
    disableErrors?: boolean;
    id?: number | string;
    isReadingStaticFile?: boolean;
    req: PayloadRequestWithData;
};
declare const executeAccess: ({ id, data, disableErrors, isReadingStaticFile, req }: OperationArgs, access: Access) => Promise<AccessResult>;
export default executeAccess;
//# sourceMappingURL=executeAccess.d.ts.map