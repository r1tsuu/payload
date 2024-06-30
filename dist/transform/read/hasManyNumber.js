/* eslint-disable no-param-reassign */ export const transformHasManyNumber = ({ field, locale, numberRows, ref })=>{
    const result = numberRows.map(({ number })=>number);
    if (locale) {
        ref[field.name][locale] = result;
    } else {
        ref[field.name] = result;
    }
};

//# sourceMappingURL=hasManyNumber.js.map