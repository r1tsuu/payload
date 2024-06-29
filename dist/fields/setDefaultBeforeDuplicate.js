// default beforeDuplicate hook for required and unique fields
const unique = ({ value })=>typeof value === 'string' ? `${value} - Copy` : undefined;
const localizedUnique = ({ req, value })=>value ? `${value} - ${req?.t('general:copy') ?? 'Copy'}` : undefined;
const uniqueRequired = ({ value })=>`${value} - Copy`;
const localizedUniqueRequired = ({ req, value })=>`${value} - ${req?.t('general:copy') ?? 'Copy'}`;
export const setDefaultBeforeDuplicate = (field)=>{
    if (('required' in field && field.required || field.unique) && (!field.hooks?.beforeDuplicate || Array.isArray(field.hooks.beforeDuplicate) && field.hooks.beforeDuplicate.length === 0)) {
        if ((field.type === 'text' || field.type === 'textarea') && field.required && field.unique) {
            field.hooks.beforeDuplicate = [
                field.localized ? localizedUniqueRequired : uniqueRequired
            ];
        } else if (field.unique) {
            field.hooks.beforeDuplicate = [
                field.localized ? localizedUnique : unique
            ];
        }
    }
};

//# sourceMappingURL=setDefaultBeforeDuplicate.js.map