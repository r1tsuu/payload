/* eslint-disable no-param-reassign */ import { createMigration } from './migrations/createMigration.js';
import { migrate } from './migrations/migrate.js';
import { migrateDown } from './migrations/migrateDown.js';
import { migrateRefresh } from './migrations/migrateRefresh.js';
import { migrateReset } from './migrations/migrateReset.js';
import { migrateStatus } from './migrations/migrateStatus.js';
const beginTransaction = async ()=>null;
const rollbackTransaction = async ()=>null;
const commitTransaction = async ()=>null;
export function createDatabaseAdapter(args) {
    return {
        // Default 'null' transaction functions
        beginTransaction,
        commitTransaction,
        createMigration,
        migrate,
        migrateDown,
        migrateFresh: async ({ forceAcceptWarning = null })=>null,
        migrateRefresh,
        migrateReset,
        migrateStatus,
        rollbackTransaction,
        ...args,
        // Ensure migrationDir is set
        migrationDir: args.migrationDir || 'migrations'
    };
}

//# sourceMappingURL=createDatabaseAdapter.js.map