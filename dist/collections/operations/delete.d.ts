import type { CollectionSlug } from '../../index.js';
import type { PayloadRequestWithData, Where } from '../../types/index.js';
import type { Collection, DataFromCollectionSlug } from '../config/types.js';
export type Arguments = {
    collection: Collection;
    depth?: number;
    overrideAccess?: boolean;
    req: PayloadRequestWithData;
    showHiddenFields?: boolean;
    where: Where;
};
export declare const deleteOperation: <TSlug extends CollectionSlug>(incomingArgs: Arguments) => Promise<{
    docs: DataFromCollectionSlug<TSlug>[];
    errors: {
        id: DataFromCollectionSlug<TSlug>["id"];
        message: string;
    }[];
}>;
//# sourceMappingURL=delete.d.ts.map