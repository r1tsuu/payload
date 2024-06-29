export const statuses = [
    {
        label: ({ t })=>t('version:draft'),
        value: 'draft'
    },
    {
        label: ({ t })=>t('version:published'),
        value: 'published'
    }
];
const baseVersionFields = [
    {
        name: '_status',
        type: 'select',
        admin: {
            components: {
                Field: ()=>null
            },
            disableBulkEdit: true
        },
        defaultValue: 'draft',
        label: ({ t })=>t('version:status'),
        options: statuses
    }
];
export default baseVersionFields;

//# sourceMappingURL=baseFields.js.map