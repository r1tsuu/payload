import { APIError } from '../../../errors/index.js';
import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { restoreVersionOperation } from '../restoreVersion.js';
export default async function restoreVersionLocal(payload, options) {
    const { id, collection: collectionSlug, depth, overrideAccess = true, showHiddenFields } = options;
    const collection = payload.collections[collectionSlug];
    if (!collection) {
        throw new APIError(`The collection with slug ${String(collectionSlug)} can't be found. Restore Version Operation.`);
    }
    const args = {
        id,
        collection,
        depth,
        overrideAccess,
        payload,
        req: await createLocalReq(options, payload),
        showHiddenFields
    };
    return restoreVersionOperation(args);
}

//# sourceMappingURL=restoreVersion.js.map