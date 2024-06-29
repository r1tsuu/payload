import type { ExecutionResult, GraphQLSchema, ValidationRule } from 'graphql';
import type { OperationArgs, Request as graphQLRequest } from 'graphql-http';
import type pino from 'pino';
import type { AuthArgs } from './auth/operations/auth.js';
import type { Result as ForgotPasswordResult } from './auth/operations/forgotPassword.js';
import type { Options as ForgotPasswordOptions } from './auth/operations/local/forgotPassword.js';
import type { Options as LoginOptions } from './auth/operations/local/login.js';
import type { Options as ResetPasswordOptions } from './auth/operations/local/resetPassword.js';
import type { Options as UnlockOptions } from './auth/operations/local/unlock.js';
import type { Options as VerifyEmailOptions } from './auth/operations/local/verifyEmail.js';
import type { Result as LoginResult } from './auth/operations/login.js';
import type { Result as ResetPasswordResult } from './auth/operations/resetPassword.js';
import type { AuthStrategy, User } from './auth/types.js';
import type { BulkOperationResult, Collection, DataFromCollectionSlug, TypeWithID } from './collections/config/types.js';
import type { Options as CountOptions } from './collections/operations/local/count.js';
import type { Options as CreateOptions } from './collections/operations/local/create.js';
import type { ByIDOptions as DeleteByIDOptions, ManyOptions as DeleteManyOptions } from './collections/operations/local/delete.js';
import type { Options as DuplicateOptions } from './collections/operations/local/duplicate.js';
import type { Options as FindOptions } from './collections/operations/local/find.js';
import type { Options as FindByIDOptions } from './collections/operations/local/findByID.js';
import type { Options as FindVersionByIDOptions } from './collections/operations/local/findVersionByID.js';
import type { Options as FindVersionsOptions } from './collections/operations/local/findVersions.js';
import type { Options as RestoreVersionOptions } from './collections/operations/local/restoreVersion.js';
import type { ByIDOptions as UpdateByIDOptions, ManyOptions as UpdateManyOptions } from './collections/operations/local/update.js';
import type { InitOptions, SanitizedConfig } from './config/types.js';
import type { BaseDatabaseAdapter, PaginatedDocs } from './database/types.js';
import type { InitializedEmailAdapter } from './email/types.js';
import type { DataFromGlobalSlug, Globals } from './globals/config/types.js';
import type { Options as FindGlobalOptions } from './globals/operations/local/findOne.js';
import type { Options as FindGlobalVersionByIDOptions } from './globals/operations/local/findVersionByID.js';
import type { Options as FindGlobalVersionsOptions } from './globals/operations/local/findVersions.js';
import type { Options as RestoreGlobalVersionOptions } from './globals/operations/local/restoreVersion.js';
import type { Options as UpdateGlobalOptions } from './globals/operations/local/update.js';
import type { TypeWithVersion } from './versions/types.js';
import { decrypt, encrypt } from './auth/crypto.js';
import { getDependencies } from './utilities/dependencies/getDependencies.js';
export interface GeneratedTypes {
    collectionsUntyped: {
        [slug: string]: TypeWithID & Record<string, unknown>;
    };
    globalsUntyped: {
        [slug: string]: Record<string, unknown>;
    };
    localeUntyped: null | string;
    userUntyped: User;
}
type ResolveCollectionType<T> = 'collections' extends keyof T ? T['collections'] : T['collectionsUntyped'];
type ResolveGlobalType<T> = 'globals' extends keyof T ? T['globals'] : T['globalsUntyped'];
export type TypedCollection = ResolveCollectionType<GeneratedTypes>;
export type TypedGlobal = ResolveGlobalType<GeneratedTypes>;
type StringKeyOf<T> = Extract<keyof T, string>;
export type CollectionSlug = StringKeyOf<TypedCollection>;
export type GlobalSlug = StringKeyOf<TypedGlobal>;
type ResolveLocaleType<T> = 'locale' extends keyof T ? T['locale'] : T['localeUntyped'];
type ResolveUserType<T> = 'user' extends keyof T ? T['user'] : T['userUntyped'];
export type TypedLocale = ResolveLocaleType<GeneratedTypes>;
export type TypedUser = ResolveUserType<GeneratedTypes>;
/**
 * @description Payload
 */
export declare class BasePayload {
    /**
     * @description Authorization and Authentication using headers and cookies to run auth user strategies
     * @returns permissions: Permissions
     * @returns user: User
     */
    auth: (options: AuthArgs) => Promise<import("./auth/operations/auth.js").AuthResult>;
    authStrategies: AuthStrategy[];
    collections: {
        [slug: number | string | symbol]: Collection;
    };
    config: SanitizedConfig;
    /**
     * @description Performs count operation
     * @param options
     * @returns count of documents satisfying query
     */
    count: <T extends CollectionSlug>(options: CountOptions<T>) => Promise<{
        totalDocs: number;
    }>;
    /**
     * @description Performs create operation
     * @param options
     * @returns created document
     */
    create: <TSlug extends CollectionSlug>(options: CreateOptions<TSlug>) => Promise<DataFromCollectionSlug<TSlug>>;
    db: DatabaseAdapter;
    decrypt: typeof decrypt;
    duplicate: <TSlug extends CollectionSlug>(options: DuplicateOptions<TSlug>) => Promise<DataFromCollectionSlug<TSlug>>;
    email: InitializedEmailAdapter;
    encrypt: typeof encrypt;
    extensions: (args: {
        args: OperationArgs<any>;
        req: graphQLRequest<unknown, unknown>;
        result: ExecutionResult;
    }) => Promise<any>;
    /**
     * @description Find documents with criteria
     * @param options
     * @returns documents satisfying query
     */
    find: <TSlug extends CollectionSlug>(options: FindOptions<TSlug>) => Promise<PaginatedDocs<DataFromCollectionSlug<TSlug>>>;
    /**
     * @description Find document by ID
     * @param options
     * @returns document with specified ID
     */
    findByID: <TSlug extends CollectionSlug>(options: FindByIDOptions<TSlug>) => Promise<DataFromCollectionSlug<TSlug>>;
    findGlobal: <TSlug extends GlobalSlug>(options: FindGlobalOptions<TSlug>) => Promise<DataFromGlobalSlug<TSlug>>;
    /**
     * @description Find global version by ID
     * @param options
     * @returns global version with specified ID
     */
    findGlobalVersionByID: <TSlug extends GlobalSlug>(options: FindGlobalVersionByIDOptions<TSlug>) => Promise<TypeWithVersion<DataFromGlobalSlug<TSlug>>>;
    /**
     * @description Find global versions with criteria
     * @param options
     * @returns versions satisfying query
     */
    findGlobalVersions: <TSlug extends GlobalSlug>(options: FindGlobalVersionsOptions<TSlug>) => Promise<PaginatedDocs<TypeWithVersion<DataFromGlobalSlug<TSlug>>>>;
    /**
     * @description Find version by ID
     * @param options
     * @returns version with specified ID
     */
    findVersionByID: <TSlug extends CollectionSlug>(options: FindVersionByIDOptions<TSlug>) => Promise<TypeWithVersion<DataFromCollectionSlug<TSlug>>>;
    /**
     * @description Find versions with criteria
     * @param options
     * @returns versions satisfying query
     */
    findVersions: <TSlug extends CollectionSlug>(options: FindVersionsOptions<TSlug>) => Promise<PaginatedDocs<TypeWithVersion<DataFromCollectionSlug<TSlug>>>>;
    forgotPassword: <TSlug extends CollectionSlug>(options: ForgotPasswordOptions<TSlug>) => Promise<ForgotPasswordResult>;
    getAPIURL: () => string;
    getAdminURL: () => string;
    globals: Globals;
    logger: pino.Logger;
    login: <TSlug extends CollectionSlug>(options: LoginOptions<TSlug>) => Promise<LoginResult & {
        user: DataFromCollectionSlug<TSlug>;
    }>;
    resetPassword: <TSlug extends CollectionSlug>(options: ResetPasswordOptions<TSlug>) => Promise<ResetPasswordResult>;
    /**
     * @description Restore global version by ID
     * @param options
     * @returns version with specified ID
     */
    restoreGlobalVersion: <TSlug extends GlobalSlug>(options: RestoreGlobalVersionOptions<TSlug>) => Promise<DataFromGlobalSlug<TSlug>>;
    /**
     * @description Restore version by ID
     * @param options
     * @returns version with specified ID
     */
    restoreVersion: <TSlug extends CollectionSlug>(options: RestoreVersionOptions<TSlug>) => Promise<DataFromCollectionSlug<TSlug>>;
    schema: GraphQLSchema;
    secret: string;
    sendEmail: InitializedEmailAdapter['sendEmail'];
    types: {
        arrayTypes: any;
        blockInputTypes: any;
        blockTypes: any;
        fallbackLocaleInputType?: any;
        groupTypes: any;
        localeInputType?: any;
        tabTypes: any;
    };
    unlock: <TSlug extends CollectionSlug>(options: UnlockOptions<TSlug>) => Promise<boolean>;
    updateGlobal: <TSlug extends GlobalSlug>(options: UpdateGlobalOptions<TSlug>) => Promise<DataFromGlobalSlug<TSlug>>;
    validationRules: (args: OperationArgs<any>) => ValidationRule[];
    verifyEmail: <TSlug extends CollectionSlug>(options: VerifyEmailOptions<TSlug>) => Promise<boolean>;
    versions: {
        [slug: string]: any;
    };
    bin({ args, cwd, log, }: {
        args: string[];
        cwd?: string;
        log?: boolean;
    }): Promise<{
        code: number;
    }>;
    /**
     * @description delete one or more documents
     * @param options
     * @returns Updated document(s)
     */
    delete<TSlug extends CollectionSlug>(options: DeleteByIDOptions<TSlug>): Promise<DataFromCollectionSlug<TSlug>>;
    delete<TSlug extends CollectionSlug>(options: DeleteManyOptions<TSlug>): Promise<BulkOperationResult<TSlug>>;
    /**
     * @description Initializes Payload
     * @param options
     */
    init(options: InitOptions): Promise<Payload>;
    update<TSlug extends CollectionSlug>(options: UpdateManyOptions<TSlug>): Promise<BulkOperationResult<TSlug>>;
    /**
     * @description Update one or more documents
     * @param options
     * @returns Updated document(s)
     */
    update<TSlug extends CollectionSlug>(options: UpdateByIDOptions<TSlug>): Promise<DataFromCollectionSlug<TSlug>>;
}
declare const initialized: BasePayload;
export default initialized;
export declare const getPayload: (options: InitOptions) => Promise<BasePayload>;
type Payload = BasePayload;
interface RequestContext {
    [key: string]: unknown;
}
export interface DatabaseAdapter extends BaseDatabaseAdapter {
}
export type { Payload, RequestContext };
export * from './types/index.js';
export type * from './admin/types.js';
export type * from './uploads/types.js';
export type { MeOperationResult } from './auth/operations/me.js';
export type { ClientCollectionConfig } from './collections/config/client.js';
export type { AfterChangeHook as CollectionAfterChangeHook, AfterDeleteHook as CollectionAfterDeleteHook, AfterErrorHook as CollectionAfterErrorHook, AfterForgotPasswordHook as CollectionAfterForgotPasswordHook, AfterLoginHook as CollectionAfterLoginHook, AfterOperationHook as CollectionAfterOperationHook, AfterReadHook as CollectionAfterReadHook, BeforeChangeHook as CollectionBeforeChangeHook, BeforeDeleteHook as CollectionBeforeDeleteHook, BeforeLoginHook as CollectionBeforeLoginHook, BeforeOperationHook as CollectionBeforeOperationHook, BeforeReadHook as CollectionBeforeReadHook, BeforeValidateHook as CollectionBeforeValidateHook, Collection, CollectionConfig, DataFromCollectionSlug, MeHook as CollectionMeHook, RefreshHook as CollectionRefreshHook, RequiredDataFromCollection, RequiredDataFromCollectionSlug, SanitizedCollectionConfig, TypeWithID, TypeWithTimestamps, } from './collections/config/types.js';
export { createDataloaderCacheKey, getDataLoader } from './collections/dataloader.js';
export { buildConfig } from './config/build.js';
export type { ClientConfig } from './config/client.js';
export type { Access, AccessArgs, EditViewComponent, EntityDescription, EntityDescriptionComponent, EntityDescriptionFunction, SanitizedConfig, } from './config/types.js';
export type { EmailAdapter as PayloadEmailAdapter, SendEmailOptions } from './email/types.js';
export { APIError, AuthenticationError, DuplicateCollection, DuplicateFieldName, DuplicateGlobal, ErrorDeletingFile, FileRetrievalError, FileUploadError, Forbidden, InvalidConfiguration, InvalidFieldName, InvalidFieldRelationship, LockedAuth, MissingCollectionLabel, MissingEditorProp, MissingFieldInputOptions, MissingFieldType, MissingFile, NotFound, QueryError, ValidationError, } from './errors/index.js';
export type { ClientFieldConfig } from './fields/config/client.js';
export type { ArrayField, Block, BlockField, CheckboxField, ClientValidate, CodeField, CollapsibleField, Condition, DateField, EmailField, Field, FieldAccess, FieldAffectingData, FieldBase, FieldHook, FieldHookArgs, FieldPresentationalOnly, FieldWithMany, FieldWithMaxDepth, FieldWithPath, FieldWithSubFields, FilterOptions, FilterOptionsProps, GroupField, HookName, JSONField, Labels, NamedTab, NonPresentationalField, NumberField, Option, OptionObject, PointField, PolymorphicRelationshipField, RadioField, RelationshipField, RelationshipValue, RichTextField, RowAdmin, RowField, SelectField, SingleRelationshipField, Tab, TabAsField, TabsAdmin, TabsField, TextField, TextareaField, UIField, UnnamedTab, UploadField, Validate, ValidateOptions, ValueWithRelation, } from './fields/config/types.js';
export { traverseFields as afterChangeTraverseFields } from './fields/hooks/afterChange/traverseFields.js';
export { promise as afterReadPromise } from './fields/hooks/afterRead/promise.js';
export { traverseFields as afterReadTraverseFields } from './fields/hooks/afterRead/traverseFields.js';
export { traverseFields as beforeChangeTraverseFields } from './fields/hooks/beforeChange/traverseFields.js';
export { traverseFields as beforeValidateTraverseFields } from './fields/hooks/beforeValidate/traverseFields.js';
export type { ClientGlobalConfig } from './globals/config/client.js';
export type { AfterChangeHook as GlobalAfterChangeHook, AfterReadHook as GlobalAfterReadHook, BeforeChangeHook as GlobalBeforeChangeHook, BeforeReadHook as GlobalBeforeReadHook, BeforeValidateHook as GlobalBeforeValidateHook, DataFromGlobalSlug, GlobalAdminOptions, GlobalConfig, SanitizedGlobalConfig, } from './globals/config/types.js';
export type { CollapsedPreferences, DocumentPreferences, FieldsPreferences, InsideFieldsPreferences, PreferenceRequest, PreferenceUpdateRequest, TabsPreferences, } from './preferences/types.js';
export { getLocalI18n } from './translations/getLocalI18n.js';
export { combineMerge } from './utilities/combineMerge.js';
export { configToJSONSchema, entityToJSONSchema, fieldsToJSONSchema, withNullableJSONSchemaType, } from './utilities/configToJSONSchema.js';
export { createArrayFromCommaDelineated } from './utilities/createArrayFromCommaDelineated.js';
export { createLocalReq } from './utilities/createLocalReq.js';
export { default as flattenTopLevelFields } from './utilities/flattenTopLevelFields.js';
export { formatLabels, formatNames, toWords } from './utilities/formatLabels.js';
export { getCollectionIDFieldTypes } from './utilities/getCollectionIDFieldTypes.js';
export { getObjectDotNotation } from './utilities/getObjectDotNotation.js';
export { isEntityHidden } from './utilities/isEntityHidden.js';
export { isPlainObject } from './utilities/isPlainObject.js';
export { isValidID } from './utilities/isValidID.js';
export { default as isolateObjectProperty } from './utilities/isolateObjectProperty.js';
export { mapAsync } from './utilities/mapAsync.js';
export { mergeListSearchAndWhere } from './utilities/mergeListSearchAndWhere.js';
export { buildVersionCollectionFields } from './versions/buildCollectionFields.js';
export { buildVersionGlobalFields } from './versions/buildGlobalFields.js';
export { versionDefaults } from './versions/defaults.js';
export { deleteCollectionVersions } from './versions/deleteCollectionVersions.js';
export { enforceMaxVersions } from './versions/enforceMaxVersions.js';
export { getLatestCollectionVersion } from './versions/getLatestCollectionVersion.js';
export { getLatestGlobalVersion } from './versions/getLatestGlobalVersion.js';
export { saveVersion } from './versions/saveVersion.js';
export type { TypeWithVersion } from './versions/types.js';
export * from './config/types.js';
export type { FieldTypes } from './admin/forms/FieldTypes.js';
export type { AuthStrategyFunction, AuthStrategyFunctionArgs, CollectionPermission, DocumentPermissions, FieldPermissions, GlobalPermission, IncomingAuthType, Permission, Permissions, User, VerifyConfig, } from './auth/types.js';
export { createClientCollectionConfig } from './collections/config/client.js';
export { createClientConfig } from './config/client.js';
export { defaults } from './config/defaults.js';
export type { BaseDatabaseAdapter, BeginTransaction, CommitTransaction, Connect, Count, CountArgs, Create, CreateArgs, CreateGlobal, CreateGlobalArgs, CreateGlobalVersion, CreateGlobalVersionArgs, CreateMigration, CreateVersion, CreateVersionArgs, DBIdentifierName, DatabaseAdapterResult as DatabaseAdapterObj, DeleteMany, DeleteManyArgs, DeleteOne, DeleteOneArgs, DeleteVersions, DeleteVersionsArgs, Destroy, Find, FindArgs, FindGlobal, FindGlobalArgs, FindGlobalVersions, FindGlobalVersionsArgs, FindOne, FindOneArgs, FindVersions, FindVersionsArgs, Init, Migration, MigrationData, MigrationTemplateArgs, PaginatedDocs, QueryDrafts, QueryDraftsArgs, RollbackTransaction, Transaction, UpdateGlobal, UpdateGlobalArgs, UpdateGlobalVersion, UpdateGlobalVersionArgs, UpdateOne, UpdateOneArgs, UpdateVersion, UpdateVersionArgs, } from './database/types.js';
export { baseBlockFields } from './fields/baseFields/baseBlockFields.js';
export { baseIDField } from './fields/baseFields/baseIDField.js';
export { createClientFieldConfig } from './fields/config/client.js';
export { sanitizeFields } from './fields/config/sanitize.js';
export { createClientGlobalConfig } from './globals/config/client.js';
export type * from './database/queryValidation/types.js';
export { accessOperation } from './auth/operations/access.js';
export { forgotPasswordOperation } from './auth/operations/forgotPassword.js';
export { initOperation } from './auth/operations/init.js';
export { loginOperation } from './auth/operations/login.js';
export { logoutOperation } from './auth/operations/logout.js';
export { meOperation } from './auth/operations/me.js';
export { refreshOperation } from './auth/operations/refresh.js';
export { registerFirstUserOperation } from './auth/operations/registerFirstUser.js';
export { resetPasswordOperation } from './auth/operations/resetPassword.js';
export { unlockOperation } from './auth/operations/unlock.js';
export { verifyEmailOperation } from './auth/operations/verifyEmail.js';
export { countOperation } from './collections/operations/count.js';
export { createOperation } from './collections/operations/create.js';
export { deleteOperation } from './collections/operations/delete.js';
export { deleteByIDOperation } from './collections/operations/deleteByID.js';
export { docAccessOperation } from './collections/operations/docAccess.js';
export { duplicateOperation } from './collections/operations/duplicate.js';
export { findOperation } from './collections/operations/find.js';
export { findByIDOperation } from './collections/operations/findByID.js';
export { findVersionByIDOperation } from './collections/operations/findVersionByID.js';
export { findVersionsOperation } from './collections/operations/findVersions.js';
export { restoreVersionOperation } from './collections/operations/restoreVersion.js';
export { updateOperation } from './collections/operations/update.js';
export { updateByIDOperation } from './collections/operations/updateByID.js';
export { sanitizeConfig } from './config/sanitize.js';
export type { EntityPolicies, PathToQuery } from './database/queryValidation/types.js';
export { default as getDefaultValue } from './fields/getDefaultValue.js';
export { default as sortableFieldTypes } from './fields/sortableFieldTypes.js';
export { docAccessOperation as docAccessOperationGlobal } from './globals/operations/docAccess.js';
export { findOneOperation } from './globals/operations/findOne.js';
export { findVersionByIDOperation as findVersionByIDOperationGlobal } from './globals/operations/findVersionByID.js';
export { findVersionsOperation as findVersionsOperationGlobal } from './globals/operations/findVersions.js';
export { restoreVersionOperation as restoreVersionOperationGlobal } from './globals/operations/restoreVersion.js';
export { updateOperation as updateOperationGlobal } from './globals/operations/update.js';
export * from './auth/index.js';
export { default as executeAccess } from './auth/executeAccess.js';
export { executeAuthStrategies } from './auth/executeAuthStrategies.js';
export { getAccessResults } from './auth/getAccessResults.js';
export { getFieldsToSign } from './auth/getFieldsToSign.js';
export { combineQueries } from './database/combineQueries.js';
export { createDatabaseAdapter } from './database/createDatabaseAdapter.js';
export { default as flattenWhereToOperators } from './database/flattenWhereToOperators.js';
export { getLocalizedPaths } from './database/getLocalizedPaths.js';
export { createMigration } from './database/migrations/createMigration.js';
export { getMigrations } from './database/migrations/getMigrations.js';
export { getPredefinedMigration } from './database/migrations/getPredefinedMigration.js';
export { migrate } from './database/migrations/migrate.js';
export { migrateDown } from './database/migrations/migrateDown.js';
export { migrateRefresh } from './database/migrations/migrateRefresh.js';
export { migrateReset } from './database/migrations/migrateReset.js';
export { migrateStatus } from './database/migrations/migrateStatus.js';
export { migrationTemplate } from './database/migrations/migrationTemplate.js';
export { migrationsCollection } from './database/migrations/migrationsCollection.js';
export { readMigrationFiles } from './database/migrations/readMigrationFiles.js';
export { validateQueryPaths } from './database/queryValidation/validateQueryPaths.js';
export { validateSearchParam } from './database/queryValidation/validateSearchParams.js';
export { getFileByPath } from './uploads/getFileByPath.js';
export { commitTransaction } from './utilities/commitTransaction.js';
export { getDependencies };
export { initTransaction } from './utilities/initTransaction.js';
export { killTransaction } from './utilities/killTransaction.js';
//# sourceMappingURL=index.d.ts.map