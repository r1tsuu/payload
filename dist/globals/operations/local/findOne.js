import { APIError } from '../../../errors/index.js';
import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { findOneOperation } from '../findOne.js';
export default async function findOneLocal(payload, options) {
    const { slug: globalSlug, depth, draft = false, overrideAccess = true, showHiddenFields } = options;
    const globalConfig = payload.globals.config.find((config)=>config.slug === globalSlug);
    if (!globalConfig) {
        throw new APIError(`The global with slug ${String(globalSlug)} can't be found.`);
    }
    return findOneOperation({
        slug: globalSlug,
        depth,
        draft,
        globalConfig,
        overrideAccess,
        req: await createLocalReq(options, payload),
        showHiddenFields
    });
}

//# sourceMappingURL=findOne.js.map