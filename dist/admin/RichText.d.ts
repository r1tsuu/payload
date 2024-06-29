import type { GenericLanguages, I18n, I18nClient } from '@payloadcms/translations';
import type { JSONSchema4 } from 'json-schema';
import type React from 'react';
import type { SanitizedCollectionConfig, TypeWithID } from '../collections/config/types.js';
import type { SanitizedConfig } from '../config/types.js';
import type { Field, FieldAffectingData, RichTextField, Validate } from '../fields/config/types.js';
import type { SanitizedGlobalConfig } from '../globals/config/types.js';
import type { PayloadRequestWithData, RequestContext } from '../types/index.js';
import type { WithServerSidePropsComponentProps } from './elements/WithServerSideProps.js';
export type RichTextFieldProps<Value extends object, AdapterProps, ExtraFieldProperties = {}> = Omit<RichTextField<Value, AdapterProps, ExtraFieldProperties>, 'type'> & {
    path?: string;
};
export type AfterReadRichTextHookArgs<TData extends TypeWithID = any, TValue = any, TSiblingData = any> = {
    currentDepth?: number;
    depth?: number;
    draft?: boolean;
    fallbackLocale?: string;
    fieldPromises?: Promise<void>[];
    /** Boolean to denote if this hook is running against finding one, or finding many within the afterRead hook. */
    findMany?: boolean;
    flattenLocales?: boolean;
    locale?: string;
    /** A string relating to which operation the field type is currently executing within. */
    operation?: 'create' | 'delete' | 'read' | 'update';
    overrideAccess?: boolean;
    populationPromises?: Promise<void>[];
    showHiddenFields?: boolean;
    triggerAccessControl?: boolean;
    triggerHooks?: boolean;
};
export type AfterChangeRichTextHookArgs<TData extends TypeWithID = any, TValue = any, TSiblingData = any> = {
    /** A string relating to which operation the field type is currently executing within. */
    operation: 'create' | 'update';
    /** The document before changes were applied. */
    previousDoc?: TData;
    /** The sibling data of the document before changes being applied. */
    previousSiblingDoc?: TData;
    /** The previous value of the field, before changes */
    previousValue?: TValue;
};
export type BeforeValidateRichTextHookArgs<TData extends TypeWithID = any, TValue = any, TSiblingData = any> = {
    /** A string relating to which operation the field type is currently executing within. */
    operation: 'create' | 'update';
    overrideAccess?: boolean;
    /** The sibling data of the document before changes being applied. */
    previousSiblingDoc?: TData;
    /** The previous value of the field, before changes */
    previousValue?: TValue;
};
export type BeforeChangeRichTextHookArgs<TData extends TypeWithID = any, TValue = any, TSiblingData = any> = {
    /**
     * The original data with locales (not modified by any hooks). Only available in `beforeChange` and `beforeDuplicate` field hooks.
     */
    docWithLocales?: Record<string, unknown>;
    duplicate?: boolean;
    errors?: {
        field: string;
        message: string;
    }[];
    /** Only available in `beforeChange` field hooks */
    mergeLocaleActions?: (() => Promise<void>)[];
    /** A string relating to which operation the field type is currently executing within. */
    operation?: 'create' | 'delete' | 'read' | 'update';
    /** The sibling data of the document before changes being applied. */
    previousSiblingDoc?: TData;
    /** The previous value of the field, before changes */
    previousValue?: TValue;
    /**
     * The original siblingData with locales (not modified by any hooks).
     */
    siblingDocWithLocales?: Record<string, unknown>;
    skipValidation?: boolean;
};
export type BaseRichTextHookArgs<TData extends TypeWithID = any, TValue = any, TSiblingData = any> = {
    /** The collection which the field belongs to. If the field belongs to a global, this will be null. */
    collection: SanitizedCollectionConfig | null;
    context: RequestContext;
    /** The data passed to update the document within create and update operations, and the full document itself in the afterRead hook. */
    data?: Partial<TData>;
    /** The field which the hook is running against. */
    field: FieldAffectingData;
    /** The global which the field belongs to. If the field belongs to a collection, this will be null. */
    global: SanitizedGlobalConfig | null;
    /** The full original document in `update` operations. In the `afterChange` hook, this is the resulting document of the operation. */
    originalDoc?: TData;
    /**
     * The path of the field, e.g. ["group", "myArray", 1, "textField"]. The path is the schemaPath but with indexes and would be used in the context of field data, not field schemas.
     */
    path: (number | string)[];
    /** The Express request object. It is mocked for Local API operations. */
    req: PayloadRequestWithData;
    /**
     * The schemaPath of the field, e.g. ["group", "myArray", "textField"]. The schemaPath is the path but without indexes and would be used in the context of field schemas, not field data.
     */
    schemaPath: string[];
    /** The sibling data passed to a field that the hook is running against. */
    siblingData: Partial<TSiblingData>;
    /** The value of the field. */
    value?: TValue;
};
export type AfterReadRichTextHook<TData extends TypeWithID = any, TValue = any, TSiblingData = any> = (args: BaseRichTextHookArgs<TData, TValue, TSiblingData> & AfterReadRichTextHookArgs<TData, TValue, TSiblingData>) => Promise<TValue> | TValue;
export type AfterChangeRichTextHook<TData extends TypeWithID = any, TValue = any, TSiblingData = any> = (args: BaseRichTextHookArgs<TData, TValue, TSiblingData> & AfterChangeRichTextHookArgs<TData, TValue, TSiblingData>) => Promise<TValue> | TValue;
export type BeforeChangeRichTextHook<TData extends TypeWithID = any, TValue = any, TSiblingData = any> = (args: BaseRichTextHookArgs<TData, TValue, TSiblingData> & BeforeChangeRichTextHookArgs<TData, TValue, TSiblingData>) => Promise<TValue> | TValue;
export type BeforeValidateRichTextHook<TData extends TypeWithID = any, TValue = any, TSiblingData = any> = (args: BaseRichTextHookArgs<TData, TValue, TSiblingData> & BeforeValidateRichTextHookArgs<TData, TValue, TSiblingData>) => Promise<TValue> | TValue;
export type RichTextHooks = {
    afterChange?: AfterChangeRichTextHook[];
    afterRead?: AfterReadRichTextHook[];
    beforeChange?: BeforeChangeRichTextHook[];
    beforeValidate?: BeforeValidateRichTextHook[];
};
type RichTextAdapterBase<Value extends object = object, AdapterProps = any, ExtraFieldProperties = {}> = {
    generateComponentMap: (args: {
        WithServerSideProps: React.FC<Omit<WithServerSidePropsComponentProps, 'serverOnlyProps'>>;
        config: SanitizedConfig;
        i18n: I18nClient;
        schemaPath: string;
    }) => Map<string, React.ReactNode>;
    generateSchemaMap?: (args: {
        config: SanitizedConfig;
        i18n: I18n<any, any>;
        schemaMap: Map<string, Field[]>;
        schemaPath: string;
    }) => Map<string, Field[]>;
    /**
     * Like an afterRead hook, but runs only for the GraphQL resolver. For populating data, this should be used, as afterRead hooks do not have a depth in graphQL.
     *
     * To populate stuff / resolve field hooks, mutate the incoming populationPromises or fieldPromises array. They will then be awaited in the correct order within payload itself.
     * @param data
     */
    graphQLPopulationPromises?: (data: {
        context: RequestContext;
        currentDepth?: number;
        depth: number;
        draft: boolean;
        field: RichTextField<Value, AdapterProps, ExtraFieldProperties>;
        fieldPromises: Promise<void>[];
        findMany: boolean;
        flattenLocales: boolean;
        overrideAccess?: boolean;
        populationPromises: Promise<void>[];
        req: PayloadRequestWithData;
        showHiddenFields: boolean;
        siblingDoc: Record<string, unknown>;
    }) => void;
    hooks?: RichTextHooks;
    i18n?: Partial<GenericLanguages>;
    outputSchema?: ({ collectionIDFieldTypes, config, field, interfaceNameDefinitions, isRequired, }: {
        collectionIDFieldTypes: {
            [key: string]: 'number' | 'string';
        };
        config?: SanitizedConfig;
        field: RichTextField<Value, AdapterProps, ExtraFieldProperties>;
        /**
         * Allows you to define new top-level interfaces that can be re-used in the output schema.
         */
        interfaceNameDefinitions: Map<string, JSONSchema4>;
        isRequired: boolean;
    }) => JSONSchema4;
    validate: Validate<Value, Value, unknown, RichTextField<Value, AdapterProps, ExtraFieldProperties>>;
};
export type RichTextAdapter<Value extends object = object, AdapterProps = any, ExtraFieldProperties = {}> = RichTextAdapterBase<Value, AdapterProps, ExtraFieldProperties> & {
    CellComponent: React.FC<any>;
    FieldComponent: React.FC<RichTextFieldProps<Value, AdapterProps, ExtraFieldProperties>>;
};
export type RichTextAdapterProvider<Value extends object = object, AdapterProps = any, ExtraFieldProperties = {}> = ({ config, isRoot, }: {
    config: SanitizedConfig;
    /**
     * Whether or not this is the root richText editor, defined in the payload.config.ts.
     *
     * @default false
     */
    isRoot?: boolean;
}) => Promise<RichTextAdapter<Value, AdapterProps, ExtraFieldProperties>> | RichTextAdapter<Value, AdapterProps, ExtraFieldProperties>;
export {};
//# sourceMappingURL=RichText.d.ts.map