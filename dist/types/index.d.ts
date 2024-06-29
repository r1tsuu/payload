import type { I18n, TFunction } from '@payloadcms/translations';
import type DataLoader from 'dataloader';
import type { TypeWithID, TypeWithTimestamps } from '../collections/config/types.js';
import type payload from '../index.js';
import type { TypedLocale, TypedUser } from '../index.js';
import type { validOperators } from './constants.js';
export type { Payload as Payload } from '../index.js';
export type CustomPayloadRequestProperties = {
    context: RequestContext;
    /** The locale that should be used for a field when it is not translated to the requested locale */
    fallbackLocale?: string;
    i18n: I18n;
    /**
     * The requested locale if specified
     * Only available for localized collections
     */
    locale?: TypedLocale;
    /**
     * The payload object
     */
    payload: typeof payload;
    /**
     * The context in which the request is being made
     */
    payloadAPI: 'GraphQL' | 'REST' | 'local';
    /** Optimized document loader */
    payloadDataLoader?: DataLoader<string, TypeWithID>;
    /** Resized versions of the image that was uploaded during this request */
    payloadUploadSizes?: Record<string, Buffer>;
    /** Query params on the request */
    query: Record<string, unknown>;
    /** Any response headers that are required to be set when a response is sent */
    responseHeaders?: Headers;
    /** The route parameters
     * @example
     * /:collection/:id -> /posts/123
     * { collection: 'posts', id: '123' }
     */
    routeParams?: Record<string, unknown>;
    /** Translate function - duplicate of i18n.t */
    t: TFunction;
    /**
     * Identifier for the database transaction for interactions in a single, all-or-nothing operation.
     */
    transactionID?: number | string;
    /**
     * Used to ensure consistency when multiple operations try to create a transaction concurrently on the same request
     */
    transactionIDPromise?: Promise<void>;
    /** The signed-in user */
    user: TypedUser | null;
} & Pick<URL, 'hash' | 'host' | 'href' | 'origin' | 'pathname' | 'port' | 'protocol' | 'search' | 'searchParams'>;
export type PayloadRequestData = {
    /** Data from the request body */
    data?: Record<string, unknown>;
    /** The locale that should be used for a field when it is not translated to the requested locale */
    file?: {
        data: Buffer;
        mimetype: string;
        name: string;
        size: number;
        tempFilePath?: string;
    };
};
export type PayloadRequest = Partial<Request> & Required<Pick<Request, 'headers'>> & CustomPayloadRequestProperties;
export type PayloadRequestWithData = PayloadRequest & PayloadRequestData;
export interface RequestContext {
    [key: string]: unknown;
}
export type Operator = (typeof validOperators)[number];
export type WhereField = {
    [key in Operator]?: unknown;
};
export type Where = {
    [key: string]: Where[] | WhereField;
    and?: Where[];
    or?: Where[];
};
export type Document = any;
export type Operation = 'create' | 'delete' | 'read' | 'update';
export type VersionOperations = 'readVersions';
export type AuthOperations = 'unlock';
export type AllOperations = AuthOperations | Operation | VersionOperations;
export declare function docHasTimestamps(doc: any): doc is TypeWithTimestamps;
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
export type IsAny<T> = IfAny<T, true, false>;
export type ReplaceAny<T, DefaultType> = IsAny<T> extends true ? DefaultType : T;
//# sourceMappingURL=index.d.ts.map