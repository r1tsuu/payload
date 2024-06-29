import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
/**
 * Get predefined migration 'up', 'down' and 'imports'
 */ export const getPredefinedMigration = async ({ dirname, file, migrationName: migrationNameArg, payload })=>{
    // Check for predefined migration.
    // Either passed in via --file or prefixed with '@payloadcms/db-mongodb/' for example
    if (file || migrationNameArg?.startsWith('@payloadcms/')) {
        // removes the package name from the migrationName.
        const migrationName = (file || migrationNameArg).split('/').slice(2).join('/');
        let cleanPath = path.join(dirname, `./predefinedMigrations/${migrationName}.mjs`);
        // Check if predefined migration exists
        if (fs.existsSync(cleanPath)) {
            cleanPath = cleanPath.replaceAll('\\', '/');
            const moduleURL = pathToFileURL(cleanPath);
            try {
                const { downSQL, imports, upSQL } = await eval(`import('${moduleURL.href}')`);
                return {
                    downSQL,
                    imports,
                    upSQL
                };
            } catch (error) {
                payload.logger.error(`Error loading predefined migration ${migrationName}`);
                throw error;
            }
        } else {
            payload.logger.error({
                msg: `Canned migration ${migrationName} not found.`
            });
            process.exit(1);
        }
    }
    return {};
};

//# sourceMappingURL=getPredefinedMigration.js.map