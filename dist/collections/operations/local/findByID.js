import { APIError } from '../../../errors/index.js';
import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { findByIDOperation } from '../findByID.js';
export default async function findByIDLocal(payload, options) {
    const { id, collection: collectionSlug, currentDepth, depth, disableErrors = false, draft = false, overrideAccess = true, showHiddenFields } = options;
    const collection = payload.collections[collectionSlug];
    if (!collection) {
        throw new APIError(`The collection with slug ${String(collectionSlug)} can't be found. Find By ID Operation.`);
    }
    return findByIDOperation({
        id,
        collection,
        currentDepth,
        depth,
        disableErrors,
        draft,
        overrideAccess,
        req: await createLocalReq(options, payload),
        showHiddenFields
    });
}

//# sourceMappingURL=findByID.js.map