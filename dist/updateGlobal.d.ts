import type { UpdateGlobalArgs } from 'payload';
import type { PostgresAdapter } from './types.js';
export declare function updateGlobal<T extends Record<string, unknown>>(this: PostgresAdapter, { slug, data, req }: UpdateGlobalArgs): Promise<T>;
//# sourceMappingURL=updateGlobal.d.ts.map