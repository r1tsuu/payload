import type { PayloadRequestWithData } from '../../types/index.js';
import type { Collection, TypeWithID } from '../config/types.js';
export type Arguments = {
    collection: Collection;
    currentDepth?: number;
    depth?: number;
    disableErrors?: boolean;
    id: number | string;
    overrideAccess?: boolean;
    req: PayloadRequestWithData;
    showHiddenFields?: boolean;
};
export declare const restoreVersionOperation: <TData extends TypeWithID = any>(args: Arguments) => Promise<TData>;
//# sourceMappingURL=restoreVersion.d.ts.map