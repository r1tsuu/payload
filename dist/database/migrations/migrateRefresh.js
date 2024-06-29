/* eslint-disable no-restricted-syntax, no-await-in-loop */ import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { getMigrations } from './getMigrations.js';
import { readMigrationFiles } from './readMigrationFiles.js';
/**
 * Run all migration down functions before running up
 */ export async function migrateRefresh() {
    const { payload } = this;
    const migrationFiles = await readMigrationFiles({
        payload
    });
    const { existingMigrations, latestBatch } = await getMigrations({
        payload
    });
    if (!existingMigrations?.length) {
        payload.logger.info({
            msg: 'No migrations to rollback.'
        });
        return;
    }
    payload.logger.info({
        msg: `Rolling back batch ${latestBatch} consisting of ${existingMigrations.length} migration(s).`
    });
    const req = {
        payload
    };
    // Reverse order of migrations to rollback
    existingMigrations.reverse();
    for (const migration of existingMigrations){
        try {
            const migrationFile = migrationFiles.find((m)=>m.name === migration.name);
            if (!migrationFile) {
                throw new Error(`Migration ${migration.name} not found locally.`);
            }
            payload.logger.info({
                msg: `Migrating down: ${migration.name}`
            });
            const start = Date.now();
            await initTransaction(req);
            await migrationFile.down({
                payload,
                req
            });
            payload.logger.info({
                msg: `Migrated down:  ${migration.name} (${Date.now() - start}ms)`
            });
            await payload.delete({
                collection: 'payload-migrations',
                req,
                where: {
                    name: {
                        equals: migration.name
                    }
                }
            });
        } catch (err) {
            await killTransaction(req);
            let msg = `Error running migration ${migration.name}. Rolling back.`;
            if (err instanceof Error) {
                msg += ` ${err.message}`;
            }
            payload.logger.error({
                err,
                msg
            });
            process.exit(1);
        }
    }
    // Run all migrate up
    for (const migration of migrationFiles){
        payload.logger.info({
            msg: `Migrating: ${migration.name}`
        });
        try {
            const start = Date.now();
            await initTransaction(req);
            await migration.up({
                payload,
                req
            });
            await payload.create({
                collection: 'payload-migrations',
                data: {
                    name: migration.name,
                    executed: true
                },
                req
            });
            await commitTransaction(req);
            payload.logger.info({
                msg: `Migrated:  ${migration.name} (${Date.now() - start}ms)`
            });
        } catch (err) {
            await killTransaction(req);
            let msg = `Error running migration ${migration.name}. Rolling back.`;
            if (err instanceof Error) {
                msg += ` ${err.message}`;
            }
            payload.logger.error({
                err,
                msg
            });
            process.exit(1);
        }
    }
}

//# sourceMappingURL=migrateRefresh.js.map