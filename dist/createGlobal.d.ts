import type { CreateGlobalArgs } from 'payload';
import type { PostgresAdapter } from './types.js';
export declare function createGlobal<T extends Record<string, unknown>>(this: PostgresAdapter, { slug, data, req }: CreateGlobalArgs): Promise<T>;
//# sourceMappingURL=createGlobal.d.ts.map