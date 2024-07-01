import type { DatabaseAdapterObj } from 'payload';
import type { Args, PostgresAdapter } from './types.js';
export type { MigrateDownArgs, MigrateUpArgs } from './types.js';
export { sql } from 'drizzle-orm';
export declare function postgresAdapter(args: Args): DatabaseAdapterObj<PostgresAdapter>;
//# sourceMappingURL=index.d.ts.map