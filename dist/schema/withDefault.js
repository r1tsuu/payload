const escapeSQLString = (input)=>{
    return input.replace(`'`, `''`);
};
export const withDefault = (column, field)=>{
    if (typeof field.defaultValue === 'function' || typeof field.defaultValue === 'undefined') return column;
    return column.default(typeof field.defaultValue === 'string' ? escapeSQLString(field.defaultValue) : field.defaultValue);
};

//# sourceMappingURL=withDefault.js.map