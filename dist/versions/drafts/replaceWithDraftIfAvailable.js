import { hasWhereAccessResult } from '../../auth/index.js';
import { combineQueries } from '../../database/combineQueries.js';
import { docHasTimestamps } from '../../types/index.js';
import sanitizeInternalFields from '../../utilities/sanitizeInternalFields.js';
import { appendVersionToQueryKey } from './appendVersionToQueryKey.js';
const replaceWithDraftIfAvailable = async ({ accessResult, doc, entity, entityType, req })=>{
    const { locale } = req;
    const queryToBuild = {
        and: [
            {
                'version._status': {
                    equals: 'draft'
                }
            }
        ]
    };
    if (entityType === 'collection') {
        queryToBuild.and.push({
            parent: {
                equals: doc.id
            }
        });
    }
    if (docHasTimestamps(doc)) {
        queryToBuild.and.push({
            updatedAt: {
                greater_than: doc.updatedAt
            }
        });
    }
    let versionAccessResult;
    if (hasWhereAccessResult(accessResult)) {
        versionAccessResult = appendVersionToQueryKey(accessResult);
    }
    const findVersionsArgs = {
        collection: entity.slug,
        global: entity.slug,
        limit: 1,
        locale,
        pagination: false,
        req,
        sort: '-updatedAt',
        where: combineQueries(queryToBuild, versionAccessResult)
    };
    let versionDocs;
    if (entityType === 'global') {
        versionDocs = (await req.payload.db.findGlobalVersions(findVersionsArgs)).docs;
    } else {
        versionDocs = (await req.payload.db.findVersions(findVersionsArgs)).docs;
    }
    let draft = versionDocs[0];
    if (!draft) {
        return doc;
    }
    draft = JSON.parse(JSON.stringify(draft));
    draft = sanitizeInternalFields(draft);
    // Patch globalType onto version doc
    if (entityType === 'global' && 'globalType' in doc) {
        draft.version.globalType = doc.globalType;
    }
    // Disregard all other draft content at this point,
    // Only interested in the version itself.
    // Operations will handle firing hooks, etc.
    return {
        id: doc.id,
        ...draft.version,
        createdAt: draft.createdAt,
        updatedAt: draft.updatedAt
    };
};
export default replaceWithDraftIfAvailable;

//# sourceMappingURL=replaceWithDraftIfAvailable.js.map