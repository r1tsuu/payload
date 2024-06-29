import { APIError } from '../../../errors/index.js';
import { getFileByPath } from '../../../uploads/getFileByPath.js';
import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { createOperation } from '../create.js';
// eslint-disable-next-line no-restricted-exports
export default async function createLocal(payload, options) {
    const { collection: collectionSlug, data, depth, disableVerificationEmail, draft, file, filePath, overrideAccess = true, overwriteExistingFiles = false, showHiddenFields } = options;
    const collection = payload.collections[collectionSlug];
    if (!collection) {
        throw new APIError(`The collection with slug ${String(collectionSlug)} can't be found. Create Operation.`);
    }
    const req = await createLocalReq(options, payload);
    req.file = file ?? await getFileByPath(filePath);
    return createOperation({
        collection,
        data,
        depth,
        disableVerificationEmail,
        draft,
        overrideAccess,
        overwriteExistingFiles,
        req,
        showHiddenFields
    });
}

//# sourceMappingURL=create.js.map