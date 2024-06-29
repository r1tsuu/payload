export const buildVersionGlobalFields = (global)=>{
    const fields = [
        {
            name: 'version',
            type: 'group',
            fields: global.fields
        },
        {
            name: 'createdAt',
            type: 'date',
            admin: {
                disabled: true
            }
        },
        {
            name: 'updatedAt',
            type: 'date',
            admin: {
                disabled: true
            }
        }
    ];
    if (global?.versions?.drafts) {
        fields.push({
            name: 'latest',
            type: 'checkbox',
            admin: {
                disabled: true
            },
            index: true
        });
    }
    if (global?.versions?.drafts && global?.versions?.drafts?.autosave) {
        fields.push({
            name: 'autosave',
            type: 'checkbox',
            index: true
        });
    }
    return fields;
};

//# sourceMappingURL=buildGlobalFields.js.map