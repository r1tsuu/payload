import { deepCopyObject } from '../utilities/deepCopyObject.js';
import sanitizeInternalFields from '../utilities/sanitizeInternalFields.js';
import { enforceMaxVersions } from './enforceMaxVersions.js';
export const saveVersion = async ({ id, autosave, collection, docWithLocales: doc, draft, global, payload, req })=>{
    let result;
    let createNewVersion = true;
    const now = new Date().toISOString();
    const versionData = deepCopyObject(doc);
    if (draft) versionData._status = 'draft';
    if (versionData._id) delete versionData._id;
    try {
        if (autosave) {
            let docs;
            const findVersionArgs = {
                limit: 1,
                pagination: false,
                req,
                sort: '-updatedAt'
            };
            if (collection) {
                ({ docs } = await payload.db.findVersions({
                    ...findVersionArgs,
                    collection: collection.slug,
                    req,
                    where: {
                        parent: {
                            equals: id
                        }
                    }
                }));
            } else {
                ({ docs } = await payload.db.findGlobalVersions({
                    ...findVersionArgs,
                    global: global.slug,
                    req
                }));
            }
            const [latestVersion] = docs;
            // overwrite the latest version if it's set to autosave
            if (latestVersion?.autosave === true) {
                createNewVersion = false;
                const data = {
                    createdAt: new Date(latestVersion.createdAt).toISOString(),
                    updatedAt: draft ? now : new Date(doc.updatedAt).toISOString(),
                    version: versionData
                };
                const updateVersionArgs = {
                    id: latestVersion.id,
                    req,
                    versionData: data
                };
                if (collection) {
                    result = await payload.db.updateVersion({
                        ...updateVersionArgs,
                        collection: collection.slug,
                        req
                    });
                } else {
                    result = await payload.db.updateGlobalVersion({
                        ...updateVersionArgs,
                        global: global.slug,
                        req
                    });
                }
            }
        }
        if (createNewVersion) {
            if (collection) {
                result = await payload.db.createVersion({
                    autosave: Boolean(autosave),
                    collectionSlug: collection.slug,
                    createdAt: doc?.createdAt ? new Date(doc.createdAt).toISOString() : now,
                    parent: collection ? id : undefined,
                    req,
                    updatedAt: draft ? now : new Date(doc.updatedAt).toISOString(),
                    versionData
                });
            }
            if (global) {
                result = await payload.db.createGlobalVersion({
                    autosave: Boolean(autosave),
                    createdAt: doc?.createdAt ? new Date(doc.createdAt).toISOString() : now,
                    globalSlug: global.slug,
                    parent: collection ? id : undefined,
                    req,
                    updatedAt: draft ? now : new Date(doc.updatedAt).toISOString(),
                    versionData
                });
            }
        }
    } catch (err) {
        let errorMessage;
        if (collection) errorMessage = `There was an error while saving a version for the ${collection.labels.singular} with ID ${id}.`;
        if (global) errorMessage = `There was an error while saving a version for the global ${global.label}.`;
        payload.logger.error(errorMessage);
        payload.logger.error(err);
        return;
    }
    let max = 100;
    if (collection && typeof collection.versions.maxPerDoc === 'number') max = collection.versions.maxPerDoc;
    if (global && typeof global.versions.max === 'number') max = global.versions.max;
    if (createNewVersion && max > 0) {
        await enforceMaxVersions({
            id,
            collection,
            global,
            max,
            payload,
            req
        });
    }
    let createdVersion = result.version;
    createdVersion.createdAt = result.createdAt;
    createdVersion.updatedAt = result.updatedAt;
    createdVersion = sanitizeInternalFields(createdVersion);
    createdVersion.id = result.parent;
    return createdVersion;
};

//# sourceMappingURL=saveVersion.js.map