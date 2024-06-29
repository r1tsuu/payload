import { APIError } from '../../../errors/index.js';
import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { updateOperation } from '../update.js';
export default async function updateLocal(payload, options) {
    const { slug: globalSlug, data, depth, draft, overrideAccess = true, showHiddenFields } = options;
    const globalConfig = payload.globals.config.find((config)=>config.slug === globalSlug);
    if (!globalConfig) {
        throw new APIError(`The global with slug ${String(globalSlug)} can't be found.`);
    }
    return updateOperation({
        slug: globalSlug,
        data,
        depth,
        draft,
        globalConfig,
        overrideAccess,
        req: await createLocalReq(options, payload),
        showHiddenFields
    });
}

//# sourceMappingURL=update.js.map