export const buildVersionCollectionFields = (collection)=>{
    const fields = [
        {
            name: 'parent',
            type: 'relationship',
            index: true,
            relationTo: collection.slug
        },
        {
            name: 'version',
            type: 'group',
            fields: collection.fields.filter((field)=>!('name' in field) || field.name !== 'id')
        },
        {
            name: 'createdAt',
            type: 'date',
            admin: {
                disabled: true
            },
            index: true
        },
        {
            name: 'updatedAt',
            type: 'date',
            admin: {
                disabled: true
            },
            index: true
        }
    ];
    if (collection?.versions?.drafts) {
        fields.push({
            name: 'latest',
            type: 'checkbox',
            admin: {
                disabled: true
            },
            index: true
        });
    }
    if (collection?.versions?.drafts && collection?.versions?.drafts?.autosave) {
        fields.push({
            name: 'autosave',
            type: 'checkbox',
            index: true
        });
    }
    return fields;
};

//# sourceMappingURL=buildCollectionFields.js.map