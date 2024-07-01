/**
 * Call and returning methods that would normally be chained together but cannot be because of control logic
 * @param methods
 * @param query
 */ const chainMethods = ({ methods, query })=>{
    return methods.reduce((query, { args, method })=>{
        return query[method](...args);
    }, query);
};
export { chainMethods };

//# sourceMappingURL=chainMethods.js.map