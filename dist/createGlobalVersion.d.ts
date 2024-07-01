import type { TypeWithID, TypeWithVersion } from 'payload';
import { type CreateGlobalVersionArgs } from 'payload';
import type { PostgresAdapter } from './types.js';
export declare function createGlobalVersion<T extends TypeWithID>(this: PostgresAdapter, { autosave, globalSlug, req, versionData, }: CreateGlobalVersionArgs): Promise<TypeWithVersion<T>>;
//# sourceMappingURL=createGlobalVersion.d.ts.map