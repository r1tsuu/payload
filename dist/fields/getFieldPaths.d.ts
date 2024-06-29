import type { Field, TabAsField } from './config/types.js';
export declare function getFieldPaths({ field, parentPath, parentSchemaPath, }: {
    field: Field | TabAsField;
    parentPath: (number | string)[];
    parentSchemaPath: string[];
}): {
    path: (number | string)[];
    schemaPath: string[];
};
//# sourceMappingURL=getFieldPaths.d.ts.map