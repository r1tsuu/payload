export const buildAfterOperation = async (operationArgs)=>{
    const { args, collection, operation, result } = operationArgs;
    let newResult = result;
    await args.collection.config.hooks.afterOperation.reduce(async (priorHook, hook)=>{
        await priorHook;
        const hookResult = await hook({
            args,
            collection,
            operation,
            req: args.req,
            result: newResult
        });
        if (hookResult !== undefined) {
            newResult = hookResult;
        }
    }, Promise.resolve());
    return newResult;
};

//# sourceMappingURL=utils.js.map