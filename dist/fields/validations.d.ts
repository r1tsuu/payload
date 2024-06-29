import type { ArrayField, BlockField, CheckboxField, CodeField, DateField, EmailField, JSONField, NumberField, PointField, RadioField, RelationshipField, RelationshipValue, RichTextField, SelectField, TextField, TextareaField, UploadField, Validate } from './config/types.js';
export declare const text: Validate<string | string[], unknown, unknown, TextField>;
export declare const password: Validate<string, unknown, unknown, TextField>;
export declare const email: Validate<string, unknown, unknown, EmailField>;
export declare const textarea: Validate<string, unknown, unknown, TextareaField>;
export declare const code: Validate<string, unknown, unknown, CodeField>;
export declare const json: Validate<string, unknown, unknown, JSONField & {
    jsonError?: string;
}>;
export declare const checkbox: Validate<boolean, unknown, unknown, CheckboxField>;
export declare const date: Validate<Date, unknown, unknown, DateField>;
export declare const richText: Validate<object, unknown, unknown, RichTextField>;
export declare const number: Validate<number | number[], unknown, unknown, NumberField>;
export declare const array: Validate<unknown[], unknown, unknown, ArrayField>;
export declare const blocks: Validate<unknown, unknown, unknown, BlockField>;
export declare const upload: Validate<unknown, unknown, unknown, UploadField>;
export declare const relationship: Validate<RelationshipValue, unknown, unknown, RelationshipField>;
export declare const select: Validate<unknown, unknown, unknown, SelectField>;
export declare const radio: Validate<unknown, unknown, unknown, RadioField>;
export declare const point: Validate<[number | string, number | string], unknown, unknown, PointField>;
declare const _default: {
    array: Validate<unknown[], unknown, unknown, ArrayField>;
    blocks: Validate<unknown, unknown, unknown, BlockField>;
    checkbox: Validate<boolean, unknown, unknown, CheckboxField>;
    code: Validate<string, unknown, unknown, CodeField>;
    date: Validate<Date, unknown, unknown, DateField>;
    email: Validate<string, unknown, unknown, EmailField>;
    json: Validate<string, unknown, unknown, Omit<import("./config/types.js").FieldBase, "admin"> & {
        admin?: {
            className?: string;
            components?: {
                Cell?: import("../index.js").CustomComponent;
                Description?: import("../index.js").DescriptionComponent;
                Field?: import("../index.js").CustomComponent;
                Filter?: import("react").ComponentType<any>;
            };
            condition?: import("./config/types.js").Condition;
            custom?: Record<string, any>;
            description?: import("../index.js").Description;
            disableBulkEdit?: boolean;
            disableListColumn?: boolean;
            disableListFilter?: boolean;
            disabled?: boolean;
            hidden?: boolean;
            position?: "sidebar";
            readOnly?: boolean;
            style?: import("react").CSSProperties;
            width?: string;
        } & {
            components?: {
                Error?: import("../index.js").CustomComponent<import("../index.js").ErrorProps>;
                Label?: import("../index.js").CustomComponent<import("../index.js").LabelProps>;
            };
            editorOptions?: import("@monaco-editor/react").EditorProps["options"];
        };
        jsonSchema?: {
            fileMatch: string[];
            schema: import("json-schema").JSONSchema4;
            uri: string;
        };
        type: "json";
    } & {
        jsonError?: string;
    }>;
    number: Validate<number | number[], unknown, unknown, NumberField>;
    password: Validate<string, unknown, unknown, TextField>;
    point: Validate<[string | number, string | number], unknown, unknown, PointField>;
    radio: Validate<unknown, unknown, unknown, RadioField>;
    relationship: Validate<RelationshipValue, unknown, unknown, RelationshipField>;
    richText: Validate<object, unknown, unknown, RichTextField>;
    select: Validate<unknown, unknown, unknown, SelectField>;
    text: Validate<string | string[], unknown, unknown, TextField>;
    textarea: Validate<string, unknown, unknown, TextareaField>;
    upload: Validate<unknown, unknown, unknown, UploadField>;
};
export default _default;
//# sourceMappingURL=validations.d.ts.map