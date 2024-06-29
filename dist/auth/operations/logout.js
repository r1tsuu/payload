import httpStatus from 'http-status';
import { APIError } from '../../errors/index.js';
export const logoutOperation = async (incomingArgs)=>{
    let args = incomingArgs;
    const { collection: { config: collectionConfig }, req: { user }, req } = incomingArgs;
    if (!user) throw new APIError('No User', httpStatus.BAD_REQUEST);
    if (user.collection !== collectionConfig.slug) throw new APIError('Incorrect collection', httpStatus.FORBIDDEN);
    await collectionConfig.hooks.afterLogout.reduce(async (priorHook, hook)=>{
        await priorHook;
        args = await hook({
            collection: args.collection?.config,
            context: req.context,
            req
        }) || args;
    }, Promise.resolve());
    return true;
};

//# sourceMappingURL=logout.js.map