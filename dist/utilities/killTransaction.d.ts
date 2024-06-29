import type { PayloadRequestWithData } from '../types/index.js';
/**
 * Rollback the transaction from the req using the db adapter and removes it from the req
 */
export declare function killTransaction(req: PayloadRequestWithData): Promise<void>;
//# sourceMappingURL=killTransaction.d.ts.map