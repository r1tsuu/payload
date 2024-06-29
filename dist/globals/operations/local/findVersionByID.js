import { APIError } from '../../../errors/index.js';
import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { findVersionByIDOperation } from '../findVersionByID.js';
// eslint-disable-next-line no-restricted-exports
export default async function findVersionByIDLocal(payload, options) {
    const { id, slug: globalSlug, depth, disableErrors = false, overrideAccess = true, showHiddenFields } = options;
    const globalConfig = payload.globals.config.find((config)=>config.slug === globalSlug);
    if (!globalConfig) {
        throw new APIError(`The global with slug ${String(globalSlug)} can't be found.`);
    }
    return findVersionByIDOperation({
        id,
        depth,
        disableErrors,
        globalConfig,
        overrideAccess,
        req: await createLocalReq(options, payload),
        showHiddenFields
    });
}

//# sourceMappingURL=findVersionByID.js.map