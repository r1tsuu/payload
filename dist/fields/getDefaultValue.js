import { deepCopyObject } from '../utilities/deepCopyObject.js';
const getValueWithDefault = ({ defaultValue, locale, user, value })=>{
    if (typeof value !== 'undefined') {
        return value;
    }
    if (defaultValue && typeof defaultValue === 'function') {
        return defaultValue({
            locale,
            user
        });
    }
    if (typeof defaultValue === 'object') {
        return deepCopyObject(defaultValue);
    }
    return defaultValue;
};
// eslint-disable-next-line no-restricted-exports
export default getValueWithDefault;

//# sourceMappingURL=getDefaultValue.js.map