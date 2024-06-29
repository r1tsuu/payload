export declare const defaults: {
    access: {
        create: ({ req: { user } }: {
            req: import("../../index.js").PayloadRequestWithData;
        }) => boolean;
        delete: ({ req: { user } }: {
            req: import("../../index.js").PayloadRequestWithData;
        }) => boolean;
        read: ({ req: { user } }: {
            req: import("../../index.js").PayloadRequestWithData;
        }) => boolean;
        unlock: ({ req: { user } }: {
            req: import("../../index.js").PayloadRequestWithData;
        }) => boolean;
        update: ({ req: { user } }: {
            req: import("../../index.js").PayloadRequestWithData;
        }) => boolean;
    };
    admin: {
        components: {};
        custom: {};
        enableRichTextLink: boolean;
        enableRichTextRelationship: boolean;
        pagination: {
            defaultLimit: number;
            limits: number[];
        };
        useAsTitle: string;
    };
    auth: boolean;
    custom: {};
    endpoints: any[];
    fields: any[];
    hooks: {
        afterChange: any[];
        afterDelete: any[];
        afterForgotPassword: any[];
        afterLogin: any[];
        afterLogout: any[];
        afterMe: any[];
        afterOperation: any[];
        afterRead: any[];
        afterRefresh: any[];
        beforeChange: any[];
        beforeDelete: any[];
        beforeLogin: any[];
        beforeOperation: any[];
        beforeRead: any[];
        beforeValidate: any[];
        me: any[];
        refresh: any[];
    };
    timestamps: boolean;
    upload: boolean;
    versions: boolean;
};
export declare const authDefaults: {
    cookies: {
        sameSite: string;
        secure: boolean;
    };
    forgotPassword: {};
    lockTime: number;
    maxLoginAttempts: number;
    tokenExpiration: number;
    verify: boolean;
};
//# sourceMappingURL=defaults.d.ts.map