/* eslint-disable no-param-reassign */ export const transformHasManyText = ({ field, locale, ref, textRows })=>{
    const result = textRows.map(({ text })=>text);
    if (locale) {
        ref[field.name][locale] = result;
    } else {
        ref[field.name] = result;
    }
};

//# sourceMappingURL=hasManyText.js.map