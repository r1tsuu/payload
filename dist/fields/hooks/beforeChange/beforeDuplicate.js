export const beforeDuplicate = async (args)=>await args.field.hooks.beforeDuplicate.reduce(async (priorHook, currentHook)=>{
        await priorHook;
        return await currentHook(args);
    }, Promise.resolve());

//# sourceMappingURL=beforeDuplicate.js.map