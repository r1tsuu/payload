import { fieldAffectsData, fieldHasSubFields } from 'payload/shared';
export const hasLocalesTable = (fields)=>{
    return fields.some((field)=>{
        if (fieldAffectsData(field) && field.localized) return true;
        if (fieldHasSubFields(field) && field.type !== 'array') return hasLocalesTable(field.fields);
        if (field.type === 'tabs') return field.tabs.some((tab)=>hasLocalesTable(tab.fields));
        return false;
    });
};

//# sourceMappingURL=hasLocalesTable.js.map