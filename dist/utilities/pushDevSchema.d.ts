import type { PostgresAdapter } from '../types.js';
/**
 * Pushes the development schema to the database using Drizzle.
 *
 * @param {PostgresAdapter} db - The PostgresAdapter instance connected to the database.
 * @returns {Promise<void>} - A promise that resolves once the schema push is complete.
 */
export declare const pushDevSchema: (db: PostgresAdapter) => Promise<void>;
//# sourceMappingURL=pushDevSchema.d.ts.map