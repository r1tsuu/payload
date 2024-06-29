import { APIError } from '../../../errors/index.js';
import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { duplicateOperation } from '../duplicate.js';
export async function duplicate(payload, options) {
    const { id, collection: collectionSlug, depth, draft, overrideAccess = true, showHiddenFields } = options;
    const collection = payload.collections[collectionSlug];
    if (!collection) {
        throw new APIError(`The collection with slug ${String(collectionSlug)} can't be found. Duplicate Operation.`);
    }
    if (collection.config.disableDuplicate === false) {
        throw new APIError(`The collection with slug ${String(collectionSlug)} cannot be duplicated.`, 400);
    }
    const req = await createLocalReq(options, payload);
    return duplicateOperation({
        id,
        collection,
        depth,
        draft,
        overrideAccess,
        req,
        showHiddenFields
    });
}

//# sourceMappingURL=duplicate.js.map