import type { LivePreviewConfig, ServerOnlyLivePreviewProperties } from '../../config/types.js';
export type ServerOnlyCollectionProperties = keyof Pick<SanitizedCollectionConfig, 'access' | 'custom' | 'endpoints' | 'hooks'>;
export type ServerOnlyCollectionAdminProperties = keyof Pick<SanitizedCollectionConfig['admin'], 'components' | 'hidden' | 'preview'>;
export type ClientCollectionConfig = Omit<SanitizedCollectionConfig, 'admin' | 'fields' | ServerOnlyCollectionProperties> & {
    admin: Omit<SanitizedCollectionConfig['admin'], 'fields' | 'livePreview' | ServerOnlyCollectionAdminProperties> & {
        livePreview?: Omit<LivePreviewConfig, ServerOnlyLivePreviewProperties>;
    };
    fields: ClientFieldConfig[];
};
import type { TFunction } from '@payloadcms/translations';
import type { ClientFieldConfig } from '../../fields/config/client.js';
import type { SanitizedCollectionConfig } from './types.js';
export declare const createClientCollectionConfig: ({ collection, t, }: {
    collection: SanitizedCollectionConfig;
    t: TFunction;
}) => {
    auth: import("../../index.js").Auth;
    endpoints: import("../../config/types.js").Endpoint[] | false;
    fields: import("../../index.js").Field[];
    upload: import("../../index.js").SanitizedUploadConfig;
    versions: import("../../versions/types.js").SanitizedCollectionVersions;
    admin: {
        components: {
            afterList: import("../../config/types.js").CustomComponent[];
            afterListTable: import("../../config/types.js").CustomComponent[];
            beforeList: import("../../config/types.js").CustomComponent[];
            beforeListTable: import("../../config/types.js").CustomComponent[];
            edit: {
                Description: import("../../config/types.js").EntityDescriptionComponent;
                PreviewButton: import("../../index.js").CustomPreviewButton;
                PublishButton: import("../../index.js").CustomPublishButton;
                SaveButton: import("../../index.js").CustomSaveButton;
                SaveDraftButton: import("../../index.js").CustomSaveDraftButton;
                Upload: import("../../index.js").CustomUpload;
            };
            views: {
                Edit: import("../../config/types.js").EditViewComponent | {
                    API: import("../../config/types.js").EditViewComponent | {
                        Tab: import("../../index.js").DocumentTabComponent | {
                            Pill: React.ComponentType;
                            condition: import("../../index.js").DocumentTabCondition;
                            href: ((args: {
                                apiURL: string;
                                collection: SanitizedCollectionConfig;
                                global: import("../../index.js").SanitizedGlobalConfig;
                                id?: string;
                                routes: import("../../config/types.js").SanitizedConfig["routes"];
                            }) => string) | string;
                            isActive: ((args: {
                                href: string;
                            }) => boolean) | boolean;
                            label: ((args: {
                                t: (key: string) => string;
                            }) => string) | string;
                            newTab: boolean;
                        };
                        path: string;
                    } | {
                        Component: import("../../config/types.js").EditViewComponent;
                        path: string;
                    } | {
                        actions: import("../../config/types.js").CustomComponent[];
                    };
                    Default: import("../../config/types.js").EditViewComponent | {
                        Tab: import("../../index.js").DocumentTabComponent | {
                            Pill: React.ComponentType;
                            condition: import("../../index.js").DocumentTabCondition;
                            href: ((args: {
                                apiURL: string;
                                collection: SanitizedCollectionConfig;
                                global: import("../../index.js").SanitizedGlobalConfig;
                                id?: string;
                                routes: import("../../config/types.js").SanitizedConfig["routes"];
                            }) => string) | string;
                            isActive: ((args: {
                                href: string;
                            }) => boolean) | boolean;
                            label: ((args: {
                                t: (key: string) => string;
                            }) => string) | string;
                            newTab: boolean;
                        };
                        path: string;
                    } | {
                        Component: import("../../config/types.js").EditViewComponent;
                        path: string;
                    } | {
                        actions: import("../../config/types.js").CustomComponent[];
                    };
                    LivePreview: import("../../config/types.js").EditViewComponent | {
                        Tab: import("../../index.js").DocumentTabComponent | {
                            Pill: React.ComponentType;
                            condition: import("../../index.js").DocumentTabCondition;
                            href: ((args: {
                                apiURL: string;
                                collection: SanitizedCollectionConfig;
                                global: import("../../index.js").SanitizedGlobalConfig;
                                id?: string;
                                routes: import("../../config/types.js").SanitizedConfig["routes"];
                            }) => string) | string;
                            isActive: ((args: {
                                href: string;
                            }) => boolean) | boolean;
                            label: ((args: {
                                t: (key: string) => string;
                            }) => string) | string;
                            newTab: boolean;
                        };
                        path: string;
                    } | {
                        Component: import("../../config/types.js").EditViewComponent;
                        path: string;
                    } | {
                        actions: import("../../config/types.js").CustomComponent[];
                    };
                    Version: import("../../config/types.js").EditViewComponent | {
                        Tab: import("../../index.js").DocumentTabComponent | {
                            Pill: React.ComponentType;
                            condition: import("../../index.js").DocumentTabCondition;
                            href: ((args: {
                                apiURL: string;
                                collection: SanitizedCollectionConfig;
                                global: import("../../index.js").SanitizedGlobalConfig;
                                id?: string;
                                routes: import("../../config/types.js").SanitizedConfig["routes"];
                            }) => string) | string;
                            isActive: ((args: {
                                href: string;
                            }) => boolean) | boolean;
                            label: ((args: {
                                t: (key: string) => string;
                            }) => string) | string;
                            newTab: boolean;
                        };
                        path: string;
                    } | {
                        Component: import("../../config/types.js").EditViewComponent;
                        path: string;
                    } | {
                        actions: import("../../config/types.js").CustomComponent[];
                    };
                    Versions: import("../../config/types.js").EditViewComponent | {
                        Tab: import("../../index.js").DocumentTabComponent | {
                            Pill: React.ComponentType;
                            condition: import("../../index.js").DocumentTabCondition;
                            href: ((args: {
                                apiURL: string;
                                collection: SanitizedCollectionConfig;
                                global: import("../../index.js").SanitizedGlobalConfig;
                                id?: string;
                                routes: import("../../config/types.js").SanitizedConfig["routes"];
                            }) => string) | string;
                            isActive: ((args: {
                                href: string;
                            }) => boolean) | boolean;
                            label: ((args: {
                                t: (key: string) => string;
                            }) => string) | string;
                            newTab: boolean;
                        };
                        path: string;
                    } | {
                        Component: import("../../config/types.js").EditViewComponent;
                        path: string;
                    } | {
                        actions: import("../../config/types.js").CustomComponent[];
                    };
                } | {
                    [x: string]: {
                        Tab: import("../../index.js").DocumentTabComponent | {
                            Pill: React.ComponentType;
                            condition: import("../../index.js").DocumentTabCondition;
                            href: ((args: {
                                apiURL: string;
                                collection: SanitizedCollectionConfig;
                                global: import("../../index.js").SanitizedGlobalConfig;
                                id?: string;
                                routes: import("../../config/types.js").SanitizedConfig["routes"];
                            }) => string) | string;
                            isActive: ((args: {
                                href: string;
                            }) => boolean) | boolean;
                            label: ((args: {
                                t: (key: string) => string;
                            }) => string) | string;
                            newTab: boolean;
                        };
                        path: string;
                    } | {
                        Component: import("../../config/types.js").EditViewComponent;
                        path: string;
                    } | {
                        actions: import("../../config/types.js").CustomComponent[];
                    };
                };
                List: import("react").ComponentType<any> | {
                    Component: React.ComponentType<any>;
                    actions: import("../../config/types.js").CustomComponent[];
                };
            };
        };
        custom: {
            [x: string]: any;
        };
        defaultColumns: string[];
        description: string | import("../../config/types.js").EntityDescriptionFunction | {
            [x: string]: string;
        };
        enableRichTextLink: boolean;
        enableRichTextRelationship: boolean;
        group: string | {
            [x: string]: string;
        };
        hidden: ((args: {
            user: import("../../index.js").ClientUser;
        }) => boolean) | boolean;
        hideAPIURL: boolean;
        listSearchableFields: string[];
        livePreview: {
            breakpoints: {
                height: number | string;
                label: string;
                name: string;
                width: number | string;
            }[];
            url: ((args: {
                collectionConfig?: SanitizedCollectionConfig;
                data: Record<string, any>;
                globalConfig?: import("../../index.js").SanitizedGlobalConfig;
                locale: import("../../config/types.js").Locale;
                payload: import("../../index.js").Payload;
            }) => Promise<string> | string) | string;
        };
        meta: {
            description: string;
            openGraph: {
                description: string;
                images: {
                    alt: string;
                    height: number | string;
                    type: string;
                    url: string;
                    width: number | string;
                } | {
                    alt: string;
                    height: number | string;
                    type: string;
                    url: string;
                    width: number | string;
                }[];
                siteName: string;
                title: string;
            };
        };
        pagination: {
            defaultLimit: number;
            limits: number[];
        };
        preview: import("../../config/types.js").GeneratePreviewURL;
        useAsTitle: string;
    };
    custom: {
        [x: string]: any;
    };
    graphQL: false | {
        pluralName: string;
        singularName: string;
    };
    hooks: {
        afterChange: import("./types.js").AfterChangeHook[];
        afterDelete: import("./types.js").AfterDeleteHook[];
        afterError: import("./types.js").AfterErrorHook;
        afterForgotPassword: import("./types.js").AfterForgotPasswordHook[];
        afterLogin: import("./types.js").AfterLoginHook[];
        afterLogout: import("./types.js").AfterLogoutHook[];
        afterMe: import("./types.js").AfterMeHook[];
        afterOperation: import("./types.js").AfterOperationHook<any>[];
        afterRead: import("./types.js").AfterReadHook[];
        afterRefresh: import("./types.js").AfterRefreshHook[];
        beforeChange: import("./types.js").BeforeChangeHook[];
        beforeDelete: import("./types.js").BeforeDeleteHook[];
        beforeLogin: import("./types.js").BeforeLoginHook[];
        beforeOperation: import("./types.js").BeforeOperationHook[];
        beforeRead: import("./types.js").BeforeReadHook[];
        beforeValidate: import("./types.js").BeforeValidateHook[];
        me: import("./types.js").MeHook[];
        refresh: import("./types.js").RefreshHook[];
    };
    typescript: {
        interface: string;
    };
    access: {
        admin: ({ req }: {
            req: import("../../index.js").PayloadRequestWithData;
        }) => Promise<boolean> | boolean;
        create: import("../../config/types.js").Access;
        delete: import("../../config/types.js").Access;
        read: import("../../config/types.js").Access;
        readVersions: import("../../config/types.js").Access;
        unlock: import("../../config/types.js").Access;
        update: import("../../config/types.js").Access;
    };
    dbName: import("../../index.js").DBIdentifierName;
    defaultSort: string;
    disableDuplicate: boolean;
    labels: {
        plural: string | import("../../config/types.js").LabelFunction | {
            [x: string]: string;
        };
        singular: string | import("../../config/types.js").LabelFunction | {
            [x: string]: string;
        };
    };
    slug: string;
    timestamps: boolean;
};
export declare const createClientCollectionConfigs: ({ collections, t, }: {
    collections: SanitizedCollectionConfig[];
    t: TFunction;
}) => ClientCollectionConfig[];
//# sourceMappingURL=client.d.ts.map