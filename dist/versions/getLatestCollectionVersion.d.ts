import type { SanitizedCollectionConfig, TypeWithID } from '../collections/config/types.js';
import type { FindOneArgs } from '../database/types.js';
import type { Payload, PayloadRequestWithData } from '../types/index.js';
type Args = {
    config: SanitizedCollectionConfig;
    id: number | string;
    payload: Payload;
    query: FindOneArgs;
    req?: PayloadRequestWithData;
};
export declare const getLatestCollectionVersion: <T extends TypeWithID = any>({ id, config, payload, query, req, }: Args) => Promise<T>;
export {};
//# sourceMappingURL=getLatestCollectionVersion.d.ts.map