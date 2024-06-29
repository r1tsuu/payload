import jwt from 'jsonwebtoken';
export const meOperation = async (args)=>{
    const { collection, currentToken, req } = args;
    let result = {
        user: null
    };
    if (req.user) {
        const { pathname } = req;
        const isGraphQL = pathname === `/api${req.payload.config.routes.graphQL}`;
        const user = await req.payload.findByID({
            id: req.user.id,
            collection: collection.config.slug,
            depth: isGraphQL ? 0 : collection.config.auth.depth,
            overrideAccess: false,
            req,
            showHiddenFields: false
        });
        if (req.user.collection !== collection.config.slug) {
            return {
                user: null
            };
        }
        delete user.collection;
        // /////////////////////////////////////
        // me hook - Collection
        // /////////////////////////////////////
        for (const meHook of collection.config.hooks.me){
            const hookResult = await meHook({
                args,
                user
            });
            if (hookResult) {
                result.user = hookResult.user;
                result.exp = hookResult.exp;
                break;
            }
        }
        result.collection = req.user.collection;
        result.strategy = req.user._strategy;
        if (!result.user) {
            result.user = user;
            if (currentToken) {
                const decoded = jwt.decode(currentToken);
                if (decoded) result.exp = decoded.exp;
                if (!collection.config.auth.removeTokenFromResponses) result.token = currentToken;
            }
        }
    }
    // /////////////////////////////////////
    // After Me - Collection
    // /////////////////////////////////////
    await collection.config.hooks.afterMe.reduce(async (priorHook, hook)=>{
        await priorHook;
        result = await hook({
            collection: collection?.config,
            context: req.context,
            req,
            response: result
        }) || result;
    }, Promise.resolve());
    return result;
};

//# sourceMappingURL=me.js.map