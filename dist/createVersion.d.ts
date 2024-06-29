import type { CreateVersionArgs, TypeWithID, TypeWithVersion } from 'payload';
import type { PostgresAdapter } from './types.js';
export declare function createVersion<T extends TypeWithID>(this: PostgresAdapter, { autosave, collectionSlug, parent, req, versionData, }: CreateVersionArgs<T>): Promise<TypeWithVersion<T>>;
//# sourceMappingURL=createVersion.d.ts.map