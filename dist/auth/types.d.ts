import type { DeepRequired } from 'ts-essentials';
import type { Payload } from '../index.js';
import type { PayloadRequestWithData, Where } from '../types/index.js';
export type Permission = {
    permission: boolean;
    where?: Record<string, unknown>;
};
export type FieldPermissions = {
    blocks?: {
        [blockSlug: string]: {
            fields: {
                [fieldName: string]: FieldPermissions;
            };
        };
    };
    create: {
        permission: boolean;
    };
    fields?: {
        [fieldName: string]: FieldPermissions;
    };
    read: {
        permission: boolean;
    };
    update: {
        permission: boolean;
    };
};
export type CollectionPermission = {
    create: Permission;
    delete: Permission;
    fields: {
        [fieldName: string]: FieldPermissions;
    };
    read: Permission;
    readVersions?: Permission;
    update: Permission;
};
export type GlobalPermission = {
    fields: {
        [fieldName: string]: FieldPermissions;
    };
    read: Permission;
    readVersions?: Permission;
    update: Permission;
};
export type DocumentPermissions = CollectionPermission | GlobalPermission;
export type Permissions = {
    canAccessAdmin: boolean;
    collections: {
        [collectionSlug: string]: CollectionPermission;
    };
    globals?: {
        [globalSlug: string]: GlobalPermission;
    };
};
export type User = {
    [key: string]: any;
    collection: string;
    email: string;
    id: number | string;
};
/**
 * `collection` is not available one the client. It's only available on the server (req.user)
 * On the client, you can access the collection via config.admin.user. Config can be accessed using the useConfig() hook
 */
export type ClientUser = Omit<User, 'collection'>;
type GenerateVerifyEmailHTML = (args: {
    req: PayloadRequestWithData;
    token: string;
    user: any;
}) => Promise<string> | string;
type GenerateVerifyEmailSubject = (args: {
    req: PayloadRequestWithData;
    token: string;
    user: any;
}) => Promise<string> | string;
type GenerateForgotPasswordEmailHTML = (args?: {
    req?: PayloadRequestWithData;
    token?: string;
    user?: unknown;
}) => Promise<string> | string;
type GenerateForgotPasswordEmailSubject = (args?: {
    req?: PayloadRequestWithData;
    token?: string;
    user?: any;
}) => Promise<string> | string;
export type AuthStrategyFunctionArgs = {
    headers: Request['headers'];
    isGraphQL?: boolean;
    payload: Payload;
};
export type AuthStrategyResult = {
    responseHeaders?: Headers;
    user: User | null;
};
export type AuthStrategyFunction = (args: AuthStrategyFunctionArgs) => AuthStrategyResult | Promise<AuthStrategyResult>;
export type AuthStrategy = {
    authenticate: AuthStrategyFunction;
    name: string;
};
export interface IncomingAuthType {
    cookies?: {
        domain?: string;
        sameSite?: 'Lax' | 'None' | 'Strict' | boolean;
        secure?: boolean;
    };
    depth?: number;
    disableLocalStrategy?: true;
    forgotPassword?: {
        generateEmailHTML?: GenerateForgotPasswordEmailHTML;
        generateEmailSubject?: GenerateForgotPasswordEmailSubject;
    };
    lockTime?: number;
    maxLoginAttempts?: number;
    removeTokenFromResponses?: true;
    strategies?: AuthStrategy[];
    tokenExpiration?: number;
    useAPIKey?: boolean;
    verify?: {
        generateEmailHTML?: GenerateVerifyEmailHTML;
        generateEmailSubject?: GenerateVerifyEmailSubject;
    } | boolean;
}
export type VerifyConfig = {
    generateEmailHTML?: GenerateVerifyEmailHTML;
    generateEmailSubject?: GenerateVerifyEmailSubject;
};
export interface Auth extends Omit<DeepRequired<IncomingAuthType>, 'forgotPassword' | 'verify'> {
    forgotPassword?: {
        generateEmailHTML?: GenerateForgotPasswordEmailHTML;
        generateEmailSubject?: GenerateForgotPasswordEmailSubject;
    };
    verify?: VerifyConfig | boolean;
}
export declare function hasWhereAccessResult(result: Where | boolean): result is Where;
export {};
//# sourceMappingURL=types.d.ts.map