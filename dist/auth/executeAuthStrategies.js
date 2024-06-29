export const executeAuthStrategies = async (args)=>{
    return args.payload.authStrategies.reduce(async (accumulatorPromise, strategy)=>{
        const result = await accumulatorPromise;
        if (!result.user) {
            return strategy.authenticate(args);
        }
        return result;
    }, Promise.resolve({
        user: null
    }));
};

//# sourceMappingURL=executeAuthStrategies.js.map