export const fieldSchemaToJSON = (fields)=>{
    return fields.reduce((acc, field)=>{
        let result = acc;
        switch(field.type){
            case 'group':
                acc.push({
                    // @ts-expect-error
                    name: field.name,
                    type: field.type,
                    // @ts-expect-error
                    fields: fieldSchemaToJSON(field.fields)
                });
                break;
            case 'array':
                acc.push({
                    // @ts-expect-error
                    name: field.name,
                    type: field.type,
                    fields: fieldSchemaToJSON([
                        // @ts-expect-error
                        ...field.fields,
                        {
                            name: 'id',
                            type: 'text'
                        }
                    ])
                });
                break;
            case 'blocks':
                acc.push({
                    // @ts-expect-error
                    name: field.name,
                    type: field.type,
                    // @ts-expect-error
                    blocks: field.blocks.reduce((acc, block)=>{
                        acc[block.slug] = {
                            fields: fieldSchemaToJSON([
                                ...block.fields,
                                {
                                    name: 'id',
                                    type: 'text'
                                }
                            ])
                        };
                        return acc;
                    }, {})
                });
                break;
            case 'row':
            case 'collapsible':
                // @ts-expect-error
                result = result.concat(fieldSchemaToJSON(field.fields));
                break;
            case 'tabs':
                {
                    let tabFields = [];
                    // @ts-expect-error
                    field.tabs.forEach((tab)=>{
                        if ('name' in tab) {
                            tabFields.push({
                                name: tab.name,
                                type: field.type,
                                fields: fieldSchemaToJSON(tab.fields)
                            });
                            return;
                        }
                        tabFields = tabFields.concat(fieldSchemaToJSON(tab.fields));
                    });
                    result = result.concat(tabFields);
                    break;
                }
            case 'relationship':
            case 'upload':
                acc.push({
                    // @ts-expect-error
                    name: field.name,
                    type: field.type,
                    hasMany: 'hasMany' in field ? Boolean(field.hasMany) : false,
                    // @ts-expect-error
                    relationTo: field.relationTo
                });
                break;
            default:
                if ('name' in field) {
                    acc.push({
                        name: field.name,
                        type: field.type
                    });
                }
        }
        return result;
    }, []);
};

//# sourceMappingURL=fieldSchemaToJSON.js.map