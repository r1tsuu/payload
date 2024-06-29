import { APIError } from '../../../errors/index.js';
import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { findVersionsOperation } from '../findVersions.js';
export default async function findVersionsLocal(payload, options) {
    const { collection: collectionSlug, depth, limit, overrideAccess = true, page, showHiddenFields, sort, where } = options;
    const collection = payload.collections[collectionSlug];
    if (!collection) {
        throw new APIError(`The collection with slug ${String(collectionSlug)} can't be found. Find Versions Operation.`);
    }
    return findVersionsOperation({
        collection,
        depth,
        limit,
        overrideAccess,
        page,
        req: await createLocalReq(options, payload),
        showHiddenFields,
        sort,
        where
    });
}

//# sourceMappingURL=findVersions.js.map