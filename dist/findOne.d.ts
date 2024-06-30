import type { FindOneArgs, TypeWithID } from 'payload';
import type { PostgresAdapter } from './types.js';
export declare function findOne<T extends TypeWithID>(this: PostgresAdapter, { collection, locale, req, where }: FindOneArgs): Promise<T>;
//# sourceMappingURL=findOne.d.ts.map