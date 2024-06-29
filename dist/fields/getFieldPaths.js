import { tabHasName } from './config/types.js';
export function getFieldPaths({ field, parentPath, parentSchemaPath }) {
    if (field.type === 'tabs' || field.type === 'row' || field.type === 'collapsible') {
        return {
            path: parentPath,
            schemaPath: parentSchemaPath
        };
    } else if (field.type === 'tab') {
        if (tabHasName(field)) {
            return {
                path: [
                    ...parentPath,
                    field.name
                ],
                schemaPath: [
                    ...parentSchemaPath,
                    field.name
                ]
            };
        } else {
            return {
                path: parentPath,
                schemaPath: parentSchemaPath
            };
        }
    }
    const path = parentPath?.length ? [
        ...parentPath,
        field.name
    ] : [
        field.name
    ];
    const schemaPath = parentSchemaPath?.length ? [
        ...parentSchemaPath,
        field.name
    ] : [
        field.name
    ];
    return {
        path,
        schemaPath
    };
}

//# sourceMappingURL=getFieldPaths.js.map