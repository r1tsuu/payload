import type { TypeWithID, TypeWithVersion, UpdateVersionArgs } from 'payload';
import type { PostgresAdapter } from './types.js';
export declare function updateVersion<T extends TypeWithID>(this: PostgresAdapter, { id, collection, locale, req, versionData, where: whereArg, }: UpdateVersionArgs<T>): Promise<TypeWithVersion<T>>;
//# sourceMappingURL=updateVersion.d.ts.map