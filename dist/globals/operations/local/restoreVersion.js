import { APIError } from '../../../errors/index.js';
import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { restoreVersionOperation } from '../restoreVersion.js';
export default async function restoreVersionLocal(payload, options) {
    const { id, slug: globalSlug, depth, overrideAccess = true, showHiddenFields } = options;
    const globalConfig = payload.globals.config.find((config)=>config.slug === globalSlug);
    if (!globalConfig) {
        throw new APIError(`The global with slug ${String(globalSlug)} can't be found.`);
    }
    return restoreVersionOperation({
        id,
        depth,
        globalConfig,
        overrideAccess,
        req: await createLocalReq(options, payload),
        showHiddenFields
    });
}

//# sourceMappingURL=restoreVersion.js.map