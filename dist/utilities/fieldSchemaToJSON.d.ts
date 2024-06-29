import type { FieldTypes } from '../admin/forms/FieldTypes.js';
import type { ClientFieldConfig } from '../fields/config/client.js';
export type FieldSchemaJSON = {
    blocks?: FieldSchemaJSON;
    fields?: FieldSchemaJSON;
    hasMany?: boolean;
    name: string;
    relationTo?: string;
    slug?: string;
    type: keyof FieldTypes;
}[];
export declare const fieldSchemaToJSON: (fields: ClientFieldConfig[]) => FieldSchemaJSON;
//# sourceMappingURL=fieldSchemaToJSON.d.ts.map