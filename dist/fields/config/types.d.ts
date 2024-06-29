import type { EditorProps } from '@monaco-editor/react';
import type { CSSProperties } from 'react';
import type { JSONSchema4 } from 'json-schema';
import type React from 'react';
import type { RichTextAdapter, RichTextAdapterProvider } from '../../admin/RichText.js';
import type { ConditionalDateProps, Description, DescriptionComponent, ErrorProps, LabelProps, RowLabelComponent } from '../../admin/types.js';
import type { SanitizedCollectionConfig, TypeWithID } from '../../collections/config/types.js';
import type { CustomComponent, LabelFunction } from '../../config/types.js';
import type { DBIdentifierName } from '../../database/types.js';
import type { SanitizedGlobalConfig } from '../../globals/config/types.js';
import type { CollectionSlug } from '../../index.js';
import type { DocumentPreferences } from '../../preferences/types.js';
import type { Operation, PayloadRequestWithData, RequestContext, Where } from '../../types/index.js';
import type { ClientFieldConfig } from './client.js';
export type FieldHookArgs<TData extends TypeWithID = any, TValue = any, TSiblingData = any> = {
    /** The collection which the field belongs to. If the field belongs to a global, this will be null. */
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    /** The data passed to update the document within create and update operations, and the full document itself in the afterRead hook. */
    data?: Partial<TData>;
    /** The field which the hook is running against. */
    field: FieldAffectingData;
    /** Boolean to denote if this hook is running against finding one, or finding many within the afterRead hook. */
    findMany?: boolean;
    /** The global which the field belongs to. If the field belongs to a collection, this will be null. */
    global: SanitizedGlobalConfig | null;
    /** A string relating to which operation the field type is currently executing within. Useful within beforeValidate, beforeChange, and afterChange hooks to differentiate between create and update operations. */
    operation?: 'create' | 'delete' | 'read' | 'update';
    /** The full original document in `update` operations. In the `afterChange` hook, this is the resulting document of the operation. */
    originalDoc?: TData;
    overrideAccess?: boolean;
    /**
     * The path of the field, e.g. ["group", "myArray", 1, "textField"]. The path is the schemaPath but with indexes and would be used in the context of field data, not field schemas.
     */
    path: (number | string)[];
    /** The document before changes were applied, only in `afterChange` hooks. */
    previousDoc?: TData;
    /** The sibling data of the document before changes being applied, only in `beforeChange`, `beforeValidate`, `beforeDuplicate` and `afterChange` field hooks. */
    previousSiblingDoc?: TData;
    /** The previous value of the field, before changes, only in `beforeChange`, `afterChange`, `beforeDuplicate` and `beforeValidate` field hooks. */
    previousValue?: TValue;
    /** The Express request object. It is mocked for Local API operations. */
    req: PayloadRequestWithData;
    /**
     * The schemaPath of the field, e.g. ["group", "myArray", "textField"]. The schemaPath is the path but without indexes and would be used in the context of field schemas, not field data.
     */
    schemaPath: string[];
    /** The sibling data passed to a field that the hook is running against. */
    siblingData: Partial<TSiblingData>;
    /**
     * The original siblingData with locales (not modified by any hooks). Only available in `beforeChange` and `beforeDuplicate` field hooks.
     */
    siblingDocWithLocales?: Record<string, unknown>;
    /** The value of the field. */
    value?: TValue;
};
export type FieldHook<TData extends TypeWithID = any, TValue = any, TSiblingData = any> = (args: FieldHookArgs<TData, TValue, TSiblingData>) => Promise<TValue> | TValue;
export type FieldAccess<TData extends TypeWithID = any, TSiblingData = any> = (args: {
    /**
     * The incoming data used to `create` or `update` the document with. `data` is undefined during the `read` operation.
     */
    data?: Partial<TData>;
    /**
     * The original data of the document before the `update` is applied. `doc` is undefined during the `create` operation.
     */
    doc?: TData;
    /**
     * The `id` of the current document being read or updated. `id` is undefined during the `create` operation.
     */
    id?: number | string;
    /** The `payload` object to interface with the payload API */
    req: PayloadRequestWithData;
    /**
     * Immediately adjacent data to this field. For example, if this is a `group` field, then `siblingData` will be the other fields within the group.
     */
    siblingData?: Partial<TSiblingData>;
}) => Promise<boolean> | boolean;
export type Condition<TData extends TypeWithID = any, TSiblingData = any> = (data: Partial<TData>, siblingData: Partial<TSiblingData>, { user }: {
    user: PayloadRequestWithData['user'];
}) => boolean;
export type FilterOptionsProps<TData = any> = {
    /**
     * An object containing the full collection or global document currently being edited.
     */
    data: TData;
    /**
     * The `id` of the current document being edited. `id` is undefined during the `create` operation.
     */
    id: number | string;
    /**
     * The collection `slug` to filter against, limited to this field's `relationTo` property.
     */
    relationTo: CollectionSlug;
    /**
     * An object containing document data that is scoped to only fields within the same parent of this field.
     */
    siblingData: unknown;
    /**
     * An object containing the currently authenticated user.
     */
    user: Partial<PayloadRequestWithData['user']>;
};
export type FilterOptions<TData = any> = ((options: FilterOptionsProps<TData>) => Promise<Where | boolean> | Where | boolean) | Where | null;
type Admin = {
    className?: string;
    components?: {
        Cell?: CustomComponent;
        Description?: DescriptionComponent;
        Field?: CustomComponent;
        /**
         * The Filter component has to be a client component
         */
        Filter?: React.ComponentType<any>;
    };
    /**
     * You can programmatically show / hide fields based on what other fields are doing.
     * This is also run on the server, to determine if the field should be validated.
     */
    condition?: Condition;
    /** Extension point to add your custom data. Available in server and client. */
    custom?: Record<string, any>;
    description?: Description;
    disableBulkEdit?: boolean;
    /**
     * Shows / hides fields from appearing in the list view column selector.
     * @type boolean
     */
    disableListColumn?: boolean;
    /**
     * Shows / hides fields from appearing in the list view filter options.
     * @type boolean
     */
    disableListFilter?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    position?: 'sidebar';
    readOnly?: boolean;
    style?: CSSProperties;
    width?: string;
};
export type Labels = {
    plural: LabelFunction | Record<string, string> | string;
    singular: LabelFunction | Record<string, string> | string;
};
export type BaseValidateOptions<TData, TSiblingData> = {
    data: Partial<TData>;
    id?: number | string;
    operation?: Operation;
    preferences: DocumentPreferences;
    req: PayloadRequestWithData;
    siblingData: Partial<TSiblingData>;
};
export type ValidateOptions<TData, TSiblingData, TFieldConfig extends object> = BaseValidateOptions<TData, TSiblingData> & TFieldConfig;
export type Validate<TValue = any, TData = any, TSiblingData = any, TFieldConfig extends object = object> = (value: TValue, options: ValidateOptions<TData, TSiblingData, TFieldConfig>) => Promise<string | true> | string | true;
export type ClientValidate = Omit<Validate, 'req'>;
export type OptionObject = {
    label: LabelFunction | Record<string, string> | string;
    value: string;
};
export type Option = OptionObject | string;
export interface FieldBase {
    access?: {
        create?: FieldAccess;
        read?: FieldAccess;
        update?: FieldAccess;
    };
    admin?: Admin;
    /** Extension point to add your custom data. Server only. */
    custom?: Record<string, any>;
    defaultValue?: any;
    hidden?: boolean;
    hooks?: {
        afterChange?: FieldHook[];
        afterRead?: FieldHook[];
        beforeChange?: FieldHook[];
        /**
         * Runs before a document is duplicated to prevent errors in unique fields or return null to use defaultValue.
         */
        beforeDuplicate?: FieldHook[];
        beforeValidate?: FieldHook[];
    };
    index?: boolean;
    label?: LabelFunction | Record<string, string> | false | string;
    localized?: boolean;
    name: string;
    required?: boolean;
    saveToJWT?: boolean | string;
    /** Overrides Payload Typescript generation for the field  */
    typescriptSchema?: JSONSchema4;
    unique?: boolean;
    validate?: Validate;
}
export type NumberField = FieldBase & {
    admin?: Admin & {
        /** Set this property to a string that will be used for browser autocomplete. */
        autoComplete?: string;
        components?: {
            Error?: CustomComponent<ErrorProps>;
            Label?: CustomComponent<LabelProps>;
            afterInput?: CustomComponent[];
            beforeInput?: CustomComponent[];
        };
        /** Set this property to define a placeholder string for the field. */
        placeholder?: Record<string, string> | string;
        /** Set a value for the number field to increment / decrement using browser controls. */
        step?: number;
    };
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    /**
     * Changes SQL column type. With `bigint` and `integer` used in the default `validation` function to accept only integers.
     */
    dbType?: 'bigint' | 'integer' | 'numeric' | 'real';
    /** Maximum value accepted. Used in the default `validation` function. */
    max?: number;
    /** Minimum value accepted. Used in the default `validation` function. */
    min?: number;
    type: 'number';
} & ({
    /** Makes this field an ordered array of numbers instead of just a single number. */
    hasMany?: false | undefined;
    /** Maximum number of numbers in the numbers array, if `hasMany` is set to true. */
    maxRows?: undefined;
    /** Minimum number of numbers in the numbers array, if `hasMany` is set to true. */
    minRows?: undefined;
} | {
    /** Store the field in a single JSON column in the SQL */
    dbJsonColumn?: boolean;
    /** Makes this field an ordered array of numbers instead of just a single number. */
    hasMany: true;
    /** Maximum number of numbers in the numbers array, if `hasMany` is set to true. */
    maxRows?: number;
    /** Minimum number of numbers in the numbers array, if `hasMany` is set to true. */
    minRows?: number;
});
export type TextField = FieldBase & {
    admin?: Admin & {
        autoComplete?: string;
        components?: {
            Error?: CustomComponent<ErrorProps>;
            Label?: CustomComponent<LabelProps>;
            afterInput?: CustomComponent[];
            beforeInput?: CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        rtl?: boolean;
    };
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    maxLength?: number;
    minLength?: number;
    type: 'text';
} & ({
    /** Makes this field an ordered array of strings instead of just a single string. */
    hasMany?: false | undefined;
    /** Maximum number of strings in the strings array, if `hasMany` is set to true. */
    maxRows?: undefined;
    /** Minimum number of strings in the strings array, if `hasMany` is set to true. */
    minRows?: undefined;
} | {
    /** Store the field in a single JSON column in the SQL */
    dbJsonColumn?: boolean;
    /** Makes this field an ordered array of strings instead of just a single string. */
    hasMany: true;
    /** Maximum number of strings in the strings array, if `hasMany` is set to true. */
    maxRows?: number;
    /** Minimum number of strings in the strings array, if `hasMany` is set to true. */
    minRows?: number;
});
export type EmailField = FieldBase & {
    admin?: Admin & {
        autoComplete?: string;
        components?: {
            Error?: CustomComponent<ErrorProps>;
            Label?: CustomComponent<LabelProps>;
            afterInput?: CustomComponent[];
            beforeInput?: CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
    };
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    type: 'email';
};
export type TextareaField = FieldBase & {
    admin?: Admin & {
        components?: {
            Error?: CustomComponent<ErrorProps>;
            Label?: CustomComponent<LabelProps>;
            afterInput?: CustomComponent[];
            beforeInput?: CustomComponent[];
        };
        placeholder?: Record<string, string> | string;
        rows?: number;
        rtl?: boolean;
    };
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    maxLength?: number;
    minLength?: number;
    type: 'textarea';
};
export type CheckboxField = FieldBase & {
    admin?: Admin & {
        components?: {
            Error?: CustomComponent<ErrorProps>;
            Label?: CustomComponent<LabelProps>;
            afterInput?: CustomComponent[];
            beforeInput?: CustomComponent[];
        };
    };
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    type: 'checkbox';
};
export type DateField = FieldBase & {
    admin?: Admin & {
        components?: {
            Error?: CustomComponent<ErrorProps>;
            Label?: CustomComponent<LabelProps>;
            afterInput?: CustomComponent[];
            beforeInput?: CustomComponent[];
        };
        date?: ConditionalDateProps;
        placeholder?: Record<string, string> | string;
    };
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    type: 'date';
};
export type GroupField = Omit<FieldBase, 'required' | 'validation'> & {
    admin?: Admin & {
        hideGutter?: boolean;
    };
    /** Store the field in a single JSON column in the SQL */
    dbJsonColumn?: boolean;
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    fields: Field[];
    /** Customize generated GraphQL and Typescript schema names.
     * By default, it is bound to the collection.
     *
     * This is useful if you would like to generate a top level type to share amongst collections/fields.
     * **Note**: Top level types can collide, ensure they are unique amongst collections, arrays, groups, blocks, tabs.
     */
    interfaceName?: string;
    type: 'group';
};
export type RowAdmin = Omit<Admin, 'description'>;
export type RowField = Omit<FieldBase, 'admin' | 'label' | 'name'> & {
    admin?: RowAdmin;
    fields: Field[];
    type: 'row';
};
export type CollapsibleField = Omit<FieldBase, 'label' | 'name'> & {
    fields: Field[];
    type: 'collapsible';
} & ({
    admin: Admin & {
        components: {
            RowLabel: RowLabelComponent;
        } & Admin['components'];
        initCollapsed?: boolean;
    };
    label?: Required<FieldBase['label']>;
} | {
    admin?: Admin & {
        initCollapsed?: boolean;
    };
    label: Required<FieldBase['label']>;
});
export type TabsAdmin = Omit<Admin, 'description'>;
type TabBase = Omit<FieldBase, 'required' | 'validation'> & {
    description?: Description;
    fields: Field[];
    interfaceName?: string;
    saveToJWT?: boolean | string;
};
export type NamedTab = TabBase & {
    /** Customize generated GraphQL and Typescript schema names.
     * The slug is used by default.
     *
     * This is useful if you would like to generate a top level type to share amongst collections/fields.
     * **Note**: Top level types can collide, ensure they are unique amongst collections, arrays, groups, blocks, tabs.
     */
    interfaceName?: string;
};
export type UnnamedTab = Omit<TabBase, 'name'> & {
    interfaceName?: never;
    /**
     * Can be either:
     * - A string, which will be used as the tab's label.
     * - An object, where the key is the language code and the value is the label.
     */
    label: {
        [selectedLanguage: string]: string;
    } | LabelFunction | string;
    localized?: never;
};
export type Tab = NamedTab | UnnamedTab;
export type TabsField = Omit<FieldBase, 'admin' | 'localized' | 'name' | 'saveToJWT'> & {
    admin?: TabsAdmin;
    tabs: Tab[];
    type: 'tabs';
};
export type TabAsField = Tab & {
    /** Store the field in a single JSON column in the SQL */
    dbJsonColumn?: boolean;
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    name?: string;
    type: 'tab';
};
export type UIField = {
    admin: {
        components?: {
            Cell?: CustomComponent;
            Field: CustomComponent;
            /**
             * The Filter component has to be a client component
             */
            Filter?: React.ComponentType<any>;
        };
        condition?: Condition;
        /** Extension point to add your custom data. Available in server and client. */
        custom?: Record<string, any>;
        disableBulkEdit?: boolean;
        /**
         * Shows / hides fields from appearing in the list view column selector.
         * @type boolean
         */
        disableListColumn?: boolean;
        position?: string;
        width?: string;
    };
    /** Extension point to add your custom data. Server only. */
    custom?: Record<string, any>;
    label?: Record<string, string> | string;
    name: string;
    type: 'ui';
};
export type UploadField = FieldBase & {
    admin?: {
        components?: {
            Error?: CustomComponent<ErrorProps>;
            Label?: CustomComponent<LabelProps>;
        };
    };
    /** Store the field in a single JSON column in the SQL */
    dbJsonColumn?: boolean;
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    filterOptions?: FilterOptions;
    /**
     * Sets a maximum population depth for this field, regardless of the remaining depth when this field is reached.
     *
     * {@link https://payloadcms.com/docs/getting-started/concepts#field-level-max-depth}
     */
    maxDepth?: number;
    relationTo: CollectionSlug;
    type: 'upload';
};
type CodeAdmin = Admin & {
    components?: {
        Error?: CustomComponent<ErrorProps>;
        Label?: CustomComponent<LabelProps>;
    };
    editorOptions?: EditorProps['options'];
    language?: string;
};
export type CodeField = Omit<FieldBase, 'admin'> & {
    admin?: CodeAdmin;
    maxLength?: number;
    minLength?: number;
    type: 'code';
};
type JSONAdmin = Admin & {
    components?: {
        Error?: CustomComponent<ErrorProps>;
        Label?: CustomComponent<LabelProps>;
    };
    editorOptions?: EditorProps['options'];
};
export type JSONField = Omit<FieldBase, 'admin'> & {
    admin?: JSONAdmin;
    jsonSchema?: {
        fileMatch: string[];
        schema: JSONSchema4;
        uri: string;
    };
    type: 'json';
};
export type SelectField = FieldBase & {
    admin?: Admin & {
        components?: {
            Error?: CustomComponent<ErrorProps>;
            Label?: CustomComponent<LabelProps>;
        };
        isClearable?: boolean;
        isSortable?: boolean;
    };
    /** Store the field in a single JSON column in the SQL */
    dbJsonColumn?: boolean;
    /**
     * Customize the SQL table name
     */
    dbName?: DBIdentifierName;
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    /**
     * Customize the DB enum naFme
     */
    enumName?: DBIdentifierName;
    hasMany?: boolean;
    options: Option[];
    type: 'select';
};
type SharedRelationshipProperties = FieldBase & {
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    filterOptions?: FilterOptions;
    hasMany?: boolean;
    /**
     * Sets a maximum population depth for this field, regardless of the remaining depth when this field is reached.
     *
     * {@link https://payloadcms.com/docs/getting-started/concepts#field-level-max-depth}
     */
    maxDepth?: number;
    type: 'relationship';
} & ({
    /** Store the field in a single JSON column in the SQL */
    dbJsonColumn?: boolean;
    hasMany: true;
    /**
     * @deprecated Use 'maxRows' instead
     */
    max?: number;
    maxRows?: number;
    /**
     * @deprecated Use 'minRows' instead
     */
    min?: number;
    minRows?: number;
} | {
    hasMany?: false | undefined;
    /**
     * @deprecated Use 'maxRows' instead
     */
    max?: undefined;
    maxRows?: undefined;
    /**
     * @deprecated Use 'minRows' instead
     */
    min?: undefined;
    minRows?: undefined;
});
type RelationshipAdmin = Admin & {
    allowCreate?: boolean;
    components?: {
        Error?: CustomComponent<ErrorProps>;
        Label?: CustomComponent<LabelProps>;
    };
    isSortable?: boolean;
};
export type PolymorphicRelationshipField = SharedRelationshipProperties & {
    admin?: RelationshipAdmin & {
        sortOptions?: {
            [collectionSlug: CollectionSlug]: string;
        };
    };
    /** Store the field in a single JSON column in the SQL */
    dbJsonColumn?: boolean;
    relationTo: CollectionSlug[];
};
export type SingleRelationshipField = SharedRelationshipProperties & {
    admin?: RelationshipAdmin & {
        sortOptions?: string;
    };
    relationTo: CollectionSlug;
};
export type RelationshipField = PolymorphicRelationshipField | SingleRelationshipField;
export type ValueWithRelation = {
    relationTo: CollectionSlug;
    value: number | string;
};
export declare function valueIsValueWithRelation(value: unknown): value is ValueWithRelation;
export type RelationshipValue = (number | string)[] | ValueWithRelation | ValueWithRelation[] | (number | string);
export type RichTextField<Value extends object = any, AdapterProps = any, ExtraProperties = object> = FieldBase & {
    admin?: Admin & {
        components?: {
            Error?: CustomComponent<ErrorProps>;
            Label?: CustomComponent<LabelProps>;
        };
    };
    editor?: RichTextAdapter<Value, AdapterProps, AdapterProps> | RichTextAdapterProvider<Value, AdapterProps, AdapterProps>;
    /**
     * Sets a maximum population depth for this field, regardless of the remaining depth when this field is reached.
     *
     * {@link https://payloadcms.com/docs/getting-started/concepts#field-level-max-depth}
     */
    maxDepth?: number;
    type: 'richText';
} & ExtraProperties;
export type ArrayField = FieldBase & {
    admin?: Admin & {
        components?: {
            RowLabel?: RowLabelComponent;
        } & Admin['components'];
        initCollapsed?: boolean;
        /**
         * Disable drag and drop sorting
         */
        isSortable?: boolean;
    };
    /** Store the field in a single JSON column in the SQL */
    dbJsonColumn?: boolean;
    /**
     * Customize the SQL table name
     */
    dbName?: DBIdentifierName;
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    fields: Field[];
    /** Customize generated GraphQL and Typescript schema names.
     * By default, it is bound to the collection.
     *
     * This is useful if you would like to generate a top level type to share amongst collections/fields.
     * **Note**: Top level types can collide, ensure they are unique amongst collections, arrays, groups, blocks, tabs.
     */
    interfaceName?: string;
    labels?: Labels;
    maxRows?: number;
    minRows?: number;
    type: 'array';
};
export type RadioField = FieldBase & {
    admin?: Admin & {
        components?: {
            Error?: CustomComponent<ErrorProps>;
            Label?: CustomComponent<LabelProps>;
        };
        layout?: 'horizontal' | 'vertical';
    };
    /**
     * Customize the SQL table name
     */
    dbName?: DBIdentifierName;
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    /**
     * Customize the DB enum name
     */
    enumName?: DBIdentifierName;
    options: Option[];
    type: 'radio';
};
export type Block = {
    admin?: {
        /** Extension point to add your custom data. Available in server and client. */
        custom?: Record<string, any>;
    };
    /** Extension point to add your custom data. Server only. */
    custom?: Record<string, any>;
    /**
     * Customize the SQL table name
     */
    dbName?: DBIdentifierName;
    fields: Field[];
    /** @deprecated - please migrate to the interfaceName property instead. */
    graphQL?: {
        singularName?: string;
    };
    imageAltText?: string;
    imageURL?: string;
    /** Customize generated GraphQL and Typescript schema names.
     * The slug is used by default.
     *
     * This is useful if you would like to generate a top level type to share amongst collections/fields.
     * **Note**: Top level types can collide, ensure they are unique amongst collections, arrays, groups, blocks, tabs.
     */
    interfaceName?: string;
    labels?: Labels;
    slug: string;
};
export type BlockField = FieldBase & {
    admin?: Admin & {
        initCollapsed?: boolean;
        /**
         * Disable drag and drop sorting
         */
        isSortable?: boolean;
    };
    blocks: Block[];
    /** Store the field in a single JSON column in the SQL */
    dbJsonColumn?: boolean;
    /**
     * Disables creation of the field schema in the SQL
     * for [Virtual Fields](https://payloadcms.com/blog/learn-how-virtual-fields-can-help-solve-common-cms-challenges)
     */
    dbStore?: boolean;
    defaultValue?: unknown;
    labels?: Labels;
    maxRows?: number;
    minRows?: number;
    type: 'blocks';
};
export type PointField = FieldBase & {
    type: 'point';
};
export type Field = ArrayField | BlockField | CheckboxField | CodeField | CollapsibleField | DateField | EmailField | GroupField | JSONField | NumberField | PointField | RadioField | RelationshipField | RichTextField | RowField | SelectField | TabsField | TextField | TextareaField | UIField | UploadField;
export type FieldAffectingData = ArrayField | BlockField | CheckboxField | CodeField | DateField | EmailField | GroupField | JSONField | NumberField | PointField | RadioField | RelationshipField | RichTextField | SelectField | TabAsField | TextField | TextareaField | UploadField;
export type NonPresentationalField = ArrayField | BlockField | CheckboxField | CodeField | CollapsibleField | DateField | EmailField | GroupField | JSONField | NumberField | PointField | RadioField | RelationshipField | RichTextField | RowField | SelectField | TabsField | TextField | TextareaField | UploadField;
export type FieldWithPath = Field & {
    path?: string;
};
export type FieldWithSubFields = ArrayField | CollapsibleField | GroupField | RowField;
export type FieldPresentationalOnly = UIField;
export type FieldWithMany = RelationshipField | SelectField;
export type FieldWithMaxDepth = RelationshipField | UploadField;
export declare function fieldHasSubFields(field: ClientFieldConfig | Field): field is FieldWithSubFields;
export declare function fieldIsArrayType(field: Field): field is ArrayField;
export declare function fieldIsBlockType(field: Field): field is BlockField;
export declare function fieldIsGroupType(field: Field): field is GroupField;
export declare function optionIsObject(option: Option): option is OptionObject;
export declare function optionsAreObjects(options: Option[]): options is OptionObject[];
export declare function optionIsValue(option: Option): option is string;
export declare function fieldSupportsMany(field: Field): field is FieldWithMany;
export declare function fieldHasMaxDepth(field: Field): field is FieldWithMaxDepth;
export declare function fieldIsPresentationalOnly(field: ClientFieldConfig | Field | TabAsField): field is UIField;
export declare function fieldAffectsData(field: ClientFieldConfig | Field | TabAsField): field is FieldAffectingData;
export declare function tabHasName(tab: Tab): tab is NamedTab;
export declare function fieldIsLocalized(field: Field | Tab): boolean;
export type HookName = 'afterChange' | 'afterRead' | 'beforeChange' | 'beforeRead' | 'beforeValidate';
export {};
//# sourceMappingURL=types.d.ts.map