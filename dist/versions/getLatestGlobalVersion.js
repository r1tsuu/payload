import { docHasTimestamps } from '../types/index.js';
export const getLatestGlobalVersion = async ({ slug, config, locale, payload, req, where })=>{
    let latestVersion;
    if (config.versions?.drafts) {
        // eslint-disable-next-line prefer-destructuring
        latestVersion = (await payload.db.findGlobalVersions({
            global: slug,
            limit: 1,
            locale,
            pagination: false,
            req,
            sort: '-updatedAt'
        })).docs[0];
    }
    const global = await payload.db.findGlobal({
        slug,
        locale,
        req,
        where
    });
    const globalExists = Boolean(global);
    if (!latestVersion || docHasTimestamps(global) && latestVersion.updatedAt < global.updatedAt) {
        return {
            global,
            globalExists
        };
    }
    return {
        global: {
            ...latestVersion.version,
            createdAt: latestVersion.createdAt,
            updatedAt: latestVersion.updatedAt
        },
        globalExists
    };
};

//# sourceMappingURL=getLatestGlobalVersion.js.map