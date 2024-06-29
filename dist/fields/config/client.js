export const createClientFieldConfig = ({ field: incomingField, t })=>{
    const field = {
        ...incomingField
    };
    const serverOnlyFieldProperties = [
        'hooks',
        'access',
        'validate',
        'defaultValue',
        'label',
        'filterOptions',
        'editor',
        'custom'
    ];
    serverOnlyFieldProperties.forEach((key)=>{
        if (key in field) {
            delete field[key];
        }
    });
    if ('options' in field && Array.isArray(field.options)) {
        field.options = field.options.map((option)=>{
            if (typeof option === 'object' && typeof option.label === 'function') {
                return {
                    label: option.label({
                        t
                    }),
                    value: option.value
                };
            }
            return option;
        });
    }
    if ('fields' in field) {
        field.fields = createClientFieldConfigs({
            fields: field.fields,
            t
        });
    }
    if ('blocks' in field) {
        field.blocks = field.blocks.map((block)=>{
            const sanitized = {
                ...block
            };
            sanitized.fields = createClientFieldConfigs({
                fields: sanitized.fields,
                t
            });
            return sanitized;
        });
    }
    if ('tabs' in field) {
        // @ts-expect-error
        field.tabs = field.tabs.map((tab)=>createClientFieldConfig({
                field: tab,
                t
            }));
    }
    if ('admin' in field) {
        field.admin = {
            ...field.admin
        };
        const serverOnlyFieldAdminProperties = [
            'components',
            'condition',
            'description'
        ];
        serverOnlyFieldAdminProperties.forEach((key)=>{
            if (key in field.admin) {
                delete field.admin[key];
            }
        });
    }
    return field;
};
export const createClientFieldConfigs = ({ fields, t })=>fields.map((field)=>createClientFieldConfig({
            field,
            t
        }));

//# sourceMappingURL=client.js.map