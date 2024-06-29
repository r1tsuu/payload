import type { SanitizedCollectionConfig } from '../../../collections/config/types.js';
type Args = {
    collection: SanitizedCollectionConfig;
    password: string;
};
export declare const generatePasswordSaltHash: ({ collection, password, }: Args) => Promise<{
    hash: string;
    salt: string;
}>;
export {};
//# sourceMappingURL=generatePasswordSaltHash.d.ts.map