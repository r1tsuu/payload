/* eslint-disable @typescript-eslint/no-explicit-any */ /* eslint-disable no-use-before-define */ export function valueIsValueWithRelation(value) {
    return value !== null && typeof value === 'object' && 'relationTo' in value && 'value' in value;
}
export function fieldHasSubFields(field) {
    return field.type === 'group' || field.type === 'array' || field.type === 'row' || field.type === 'collapsible';
}
export function fieldIsArrayType(field) {
    return field.type === 'array';
}
export function fieldIsBlockType(field) {
    return field.type === 'blocks';
}
export function fieldIsGroupType(field) {
    return field.type === 'group';
}
export function optionIsObject(option) {
    return typeof option === 'object';
}
export function optionsAreObjects(options) {
    return Array.isArray(options) && typeof options?.[0] === 'object';
}
export function optionIsValue(option) {
    return typeof option === 'string';
}
export function fieldSupportsMany(field) {
    return field.type === 'select' || field.type === 'relationship';
}
export function fieldHasMaxDepth(field) {
    return (field.type === 'upload' || field.type === 'relationship') && typeof field.maxDepth === 'number';
}
export function fieldIsPresentationalOnly(field) {
    return field.type === 'ui';
}
export function fieldAffectsData(field) {
    return 'name' in field && !fieldIsPresentationalOnly(field);
}
export function tabHasName(tab) {
    return 'name' in tab;
}
export function fieldIsLocalized(field) {
    return 'localized' in field && field.localized;
}

//# sourceMappingURL=types.js.map