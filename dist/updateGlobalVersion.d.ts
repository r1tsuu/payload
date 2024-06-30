import type { TypeWithID, TypeWithVersion, UpdateGlobalVersionArgs } from 'payload';
import type { PostgresAdapter } from './types.js';
export declare function updateGlobalVersion<T extends TypeWithID>(this: PostgresAdapter, { id, global, locale, req, versionData, where: whereArg, }: UpdateGlobalVersionArgs<T>): Promise<TypeWithVersion<T>>;
//# sourceMappingURL=updateGlobalVersion.d.ts.map