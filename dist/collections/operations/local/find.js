import { APIError } from '../../../errors/index.js';
import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { findOperation } from '../find.js';
export async function findLocal(payload, options) {
    const { collection: collectionSlug, currentDepth, depth, disableErrors, draft = false, limit, overrideAccess = true, page, pagination = true, showHiddenFields, sort, where } = options;
    const collection = payload.collections[collectionSlug];
    if (!collection) {
        throw new APIError(`The collection with slug ${String(collectionSlug)} can't be found. Find Operation.`);
    }
    return findOperation({
        collection,
        currentDepth,
        depth,
        disableErrors,
        draft,
        limit,
        overrideAccess,
        page,
        pagination,
        req: await createLocalReq(options, payload),
        showHiddenFields,
        sort,
        where
    });
}

//# sourceMappingURL=find.js.map