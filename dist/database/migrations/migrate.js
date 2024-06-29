/* eslint-disable no-restricted-syntax, no-await-in-loop */ import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { getMigrations } from './getMigrations.js';
import { readMigrationFiles } from './readMigrationFiles.js';
export async function migrate() {
    const { payload } = this;
    const migrationFiles = await readMigrationFiles({
        payload
    });
    const { existingMigrations, latestBatch } = await getMigrations({
        payload
    });
    const newBatch = latestBatch + 1;
    // Execute 'up' function for each migration sequentially
    for (const migration of migrationFiles){
        const existingMigration = existingMigrations.find((existing)=>existing.name === migration.name);
        // Run migration if not found in database
        if (existingMigration) {
            continue; // eslint-disable-line no-continue
        }
        const start = Date.now();
        const req = {
            payload
        };
        payload.logger.info({
            msg: `Migrating: ${migration.name}`
        });
        try {
            await initTransaction(req);
            await migration.up({
                payload,
                req
            });
            payload.logger.info({
                msg: `Migrated:  ${migration.name} (${Date.now() - start}ms)`
            });
            await payload.create({
                collection: 'payload-migrations',
                data: {
                    name: migration.name,
                    batch: newBatch
                },
                req
            });
            await commitTransaction(req);
        } catch (err) {
            await killTransaction(req);
            payload.logger.error({
                err,
                msg: `Error running migration ${migration.name}`
            });
            throw err;
        }
    }
}

//# sourceMappingURL=migrate.js.map