import type { Payload } from '../index.js';
import type { SanitizedCollectionConfig } from './../collections/config/types.js';
type CookieOptions = {
    domain?: string;
    expires?: Date;
    httpOnly?: boolean;
    maxAge?: number;
    name: string;
    path?: string;
    returnCookieAsObject: boolean;
    sameSite?: 'Lax' | 'None' | 'Strict';
    secure?: boolean;
    value?: string;
};
type CookieObject = {
    domain?: string;
    expires?: string;
    httpOnly?: boolean;
    maxAge?: number;
    name: string;
    path?: string;
    sameSite?: 'Lax' | 'None' | 'Strict';
    secure?: boolean;
    value: string;
};
export declare const generateCookie: <ReturnCookieAsObject = boolean>(args: CookieOptions) => ReturnCookieAsObject extends true ? CookieObject : string;
type GetCookieExpirationArgs = {
    seconds: number;
};
export declare const getCookieExpiration: ({ seconds }: GetCookieExpirationArgs) => Date;
type GeneratePayloadCookieArgs = {
    collectionConfig: SanitizedCollectionConfig;
    payload: Payload;
    returnCookieAsObject?: boolean;
    token: string;
};
export declare const generatePayloadCookie: <T extends GeneratePayloadCookieArgs>({ collectionConfig, payload, returnCookieAsObject, token, }: T) => T["returnCookieAsObject"] extends true ? CookieObject : string;
export declare const generateExpiredPayloadCookie: <T extends Omit<GeneratePayloadCookieArgs, "token">>({ collectionConfig, payload, returnCookieAsObject, }: T) => T["returnCookieAsObject"] extends true ? CookieObject : string;
export declare const parseCookies: (headers: Request["headers"]) => Map<string, string>;
export {};
//# sourceMappingURL=cookies.d.ts.map