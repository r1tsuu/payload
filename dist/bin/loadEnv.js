import nextEnvImport from '@next/env';
const { loadEnvConfig } = nextEnvImport;
import { findUpStop, findUpSync } from 'find-up';
/**
 * Try to find user's env files and load it. Uses the same algorithm next.js uses to parse env files, meaning this also supports .env.local, .env.development, .env.production, etc.
 */ export function loadEnv(path) {
    if (path?.length) {
        loadEnvConfig(path, true);
        return;
    }
    const { loadedEnvFiles } = loadEnvConfig(process.cwd(), true) // assuming this won't run in production
    ;
    if (!loadedEnvFiles?.length) {
        // use findUp to find the env file. So, run loadEnvConfig for every directory upwards
        findUpSync((dir)=>{
            const { loadedEnvFiles } = loadEnvConfig(dir, true);
            if (loadedEnvFiles?.length) {
                return findUpStop;
            }
        });
    }
}

//# sourceMappingURL=loadEnv.js.map