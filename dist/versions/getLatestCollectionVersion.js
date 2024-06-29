import { docHasTimestamps } from '../types/index.js';
export const getLatestCollectionVersion = async ({ id, config, payload, query, req })=>{
    let latestVersion;
    if (config.versions?.drafts) {
        const { docs } = await payload.db.findVersions({
            collection: config.slug,
            limit: 1,
            pagination: false,
            req,
            sort: '-updatedAt',
            where: {
                parent: {
                    equals: id
                }
            }
        });
        [latestVersion] = docs;
    }
    const doc = await payload.db.findOne({
        ...query,
        req
    });
    if (!latestVersion || docHasTimestamps(doc) && latestVersion.updatedAt < doc.updatedAt) {
        return doc;
    }
    return {
        ...latestVersion.version,
        id,
        createdAt: latestVersion.createdAt,
        updatedAt: latestVersion.updatedAt
    };
};

//# sourceMappingURL=getLatestCollectionVersion.js.map