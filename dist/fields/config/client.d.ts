import type { TFunction } from '@payloadcms/translations';
import type { Field, FieldBase } from '../../fields/config/types.js';
export type ClientFieldConfig = Omit<Field, 'access' | 'defaultValue' | 'hooks' | 'validate'>;
export type ServerOnlyFieldProperties = 'editor' | 'filterOptions' | 'label' | keyof Pick<FieldBase, 'access' | 'custom' | 'defaultValue' | 'hooks' | 'validate'>;
export type ServerOnlyFieldAdminProperties = keyof Pick<FieldBase['admin'], 'components' | 'condition' | 'description'>;
export declare const createClientFieldConfig: ({ field: incomingField, t, }: {
    field: Field;
    t: TFunction;
}) => {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
            RowLabel?: import("../../index.js").RowLabelComponent;
        } & {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        initCollapsed?: boolean;
        isSortable?: boolean;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbJsonColumn?: boolean;
    dbName?: import("../../index.js").DBIdentifierName;
    dbStore?: boolean;
    fields: Field[];
    interfaceName?: string;
    labels?: import("../../fields/config/types.js").Labels;
    maxRows?: number;
    minRows?: number;
    type: "array";
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        initCollapsed?: boolean;
        isSortable?: boolean;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    blocks: import("../../fields/config/types.js").Block[];
    dbJsonColumn?: boolean;
    dbStore?: boolean;
    labels?: import("../../fields/config/types.js").Labels;
    maxRows?: number;
    minRows?: number;
    type: "blocks";
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    type: "checkbox";
} | {
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    name: string;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        editorOptions?: import("@monaco-editor/react").EditorProps["options"];
        language?: string;
    };
    maxLength?: number;
    minLength?: number;
    type: "code";
} | {
    admin: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        components: {
            RowLabel: import("../../index.js").RowLabelComponent;
        } & {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        initCollapsed?: boolean;
    };
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    localized?: boolean;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    fields: Field[];
    type: "collapsible";
    label?: Required<FieldBase["label"]>;
} | {
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        initCollapsed?: boolean;
    };
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    localized?: boolean;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    fields: Field[];
    type: "collapsible";
    label: Required<FieldBase["label"]>;
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        date?: import("../../index.js").ConditionalDateProps;
        placeholder?: Record<string, string> | string;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    type: "date";
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        autoComplete?: string;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    type: "email";
} | {
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        hideGutter?: boolean;
    };
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    name: string;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbJsonColumn?: boolean;
    dbStore?: boolean;
    fields: Field[];
    interfaceName?: string;
    type: "group";
} | {
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    name: string;
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        editorOptions?: import("@monaco-editor/react").EditorProps["options"];
    };
    jsonSchema?: {
        fileMatch: string[];
        schema: import("json-schema").JSONSchema4;
        uri: string;
    };
    type: "json";
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        autoComplete?: string;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        step?: number;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    dbType?: "bigint" | "integer" | "numeric" | "real";
    max?: number;
    min?: number;
    type: "number";
    hasMany?: false | undefined;
    maxRows?: undefined;
    minRows?: undefined;
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        autoComplete?: string;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        step?: number;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    dbType?: "bigint" | "integer" | "numeric" | "real";
    max?: number;
    min?: number;
    type: "number";
    dbJsonColumn?: boolean;
    hasMany: true;
    maxRows?: number;
    minRows?: number;
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        disableListFilter?: boolean;
        disabled?: boolean;
        hidden?: boolean;
        position?: "sidebar";
        readOnly?: boolean;
        style?: import("react").CSSProperties;
        width?: string;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    type: "point";
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        layout?: "horizontal" | "vertical";
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbName?: import("../../index.js").DBIdentifierName;
    dbStore?: boolean;
    enumName?: import("../../index.js").DBIdentifierName;
    options: import("../../fields/config/types.js").Option[];
    type: "radio";
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        allowCreate?: boolean;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        isSortable?: boolean;
    } & {
        sortOptions?: {
            [collectionSlug: import("../../index.js").CollectionSlug]: string;
        };
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    filterOptions?: import("../../fields/config/types.js").FilterOptions;
    hasMany: true;
    maxDepth?: number;
    type: "relationship";
    dbJsonColumn?: boolean;
    max?: number;
    maxRows?: number;
    min?: number;
    minRows?: number;
    relationTo: import("../../index.js").CollectionSlug[];
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        allowCreate?: boolean;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        isSortable?: boolean;
    } & {
        sortOptions?: {
            [collectionSlug: import("../../index.js").CollectionSlug]: string;
        };
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    filterOptions?: import("../../fields/config/types.js").FilterOptions;
    hasMany?: false;
    maxDepth?: number;
    type: "relationship";
    max?: undefined;
    maxRows?: undefined;
    min?: undefined;
    minRows?: undefined;
    dbJsonColumn?: boolean;
    relationTo: import("../../index.js").CollectionSlug[];
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        allowCreate?: boolean;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        isSortable?: boolean;
    } & {
        sortOptions?: string;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    filterOptions?: import("../../fields/config/types.js").FilterOptions;
    hasMany: true;
    maxDepth?: number;
    type: "relationship";
    dbJsonColumn?: boolean;
    max?: number;
    maxRows?: number;
    min?: number;
    minRows?: number;
    relationTo: import("../../index.js").CollectionSlug;
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        allowCreate?: boolean;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        isSortable?: boolean;
    } & {
        sortOptions?: string;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    filterOptions?: import("../../fields/config/types.js").FilterOptions;
    hasMany?: false;
    maxDepth?: number;
    type: "relationship";
    max?: undefined;
    maxRows?: undefined;
    min?: undefined;
    minRows?: undefined;
    relationTo: import("../../index.js").CollectionSlug;
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    editor?: import("../../index.js").RichTextAdapter<any, any, any> | import("../../index.js").RichTextAdapterProvider<any, any, any>;
    maxDepth?: number;
    type: "richText";
} | {
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    localized?: boolean;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    admin?: import("../../fields/config/types.js").RowAdmin;
    fields: Field[];
    type: "row";
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
        isClearable?: boolean;
        isSortable?: boolean;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbJsonColumn?: boolean;
    dbName?: import("../../index.js").DBIdentifierName;
    dbStore?: boolean;
    enumName?: import("../../index.js").DBIdentifierName;
    hasMany?: boolean;
    options: import("../../fields/config/types.js").Option[];
    type: "select";
} | {
    custom?: Record<string, any>;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    defaultValue?: any;
    hidden?: boolean;
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    required?: boolean;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    admin?: import("../../fields/config/types.js").TabsAdmin;
    tabs: import("../../fields/config/types.js").Tab[];
    type: "tabs";
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        autoComplete?: string;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        rtl?: boolean;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    maxLength?: number;
    minLength?: number;
    type: "text";
    hasMany?: false | undefined;
    maxRows?: undefined;
    minRows?: undefined;
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
        autoComplete?: string;
        components?: {
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        rtl?: boolean;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    maxLength?: number;
    minLength?: number;
    type: "text";
    dbJsonColumn?: boolean;
    hasMany: true;
    maxRows?: number;
    minRows?: number;
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
            afterInput?: import("../../index.js").CustomComponent[];
            beforeInput?: import("../../index.js").CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        rows?: number;
        rtl?: boolean;
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbStore?: boolean;
    maxLength?: number;
    minLength?: number;
    type: "textarea";
} | {
    admin: {
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Field: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        disableBulkEdit?: boolean;
        disableListColumn?: boolean;
        position?: string;
        width?: string;
    };
    custom?: Record<string, any>;
    label?: Record<string, string> | string;
    name: string;
    type: "ui";
} | {
    access?: {
        create?: import("../../fields/config/types.js").FieldAccess;
        read?: import("../../fields/config/types.js").FieldAccess;
        update?: import("../../fields/config/types.js").FieldAccess;
    };
    admin?: {
        className?: string;
        components?: {
            Cell?: import("../../index.js").CustomComponent;
            Description?: import("../../index.js").DescriptionComponent;
            Field?: import("../../index.js").CustomComponent;
            Filter?: import("react").ComponentType<any>;
        };
        condition?: import("../../fields/config/types.js").Condition;
        custom?: Record<string, any>;
        description?: import("../../index.js").Description;
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
            Error?: import("../../index.js").CustomComponent<import("../../index.js").ErrorProps>;
            Label?: import("../../index.js").CustomComponent<import("../../index.js").LabelProps>;
        };
    };
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: import("../../fields/config/types.js").FieldHook[];
        afterRead?: import("../../fields/config/types.js").FieldHook[];
        beforeChange?: import("../../fields/config/types.js").FieldHook[];
        beforeDuplicate?: import("../../fields/config/types.js").FieldHook[];
        beforeValidate?: import("../../fields/config/types.js").FieldHook[];
    };
    index?: boolean;
    label?: import("../../index.js").LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    typescriptSchema?: import("json-schema").JSONSchema4;
    unique?: boolean;
    validate?: import("../../fields/config/types.js").Validate;
    dbJsonColumn?: boolean;
    dbStore?: boolean;
    filterOptions?: import("../../fields/config/types.js").FilterOptions;
    maxDepth?: number;
    relationTo: import("../../index.js").CollectionSlug;
    type: "upload";
};
export declare const createClientFieldConfigs: ({ fields, t, }: {
    fields: Field[];
    t: TFunction;
}) => Field[];
//# sourceMappingURL=client.d.ts.map