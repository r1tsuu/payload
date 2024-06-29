import { createClientCollectionConfigs } from '../collections/config/client.js';
import { createClientGlobalConfigs } from '../globals/config/client.js';
export const createClientConfig = async ({ config, t })=>{
    const clientConfig = {
        ...config
    };
    const serverOnlyConfigProperties = [
        'endpoints',
        'db',
        'editor',
        'plugins',
        'sharp',
        'onInit',
        'secret',
        'hooks',
        'bin',
        'typescript',
        'cors',
        'csrf',
        'email',
        'custom',
        'graphQL'
    ];
    serverOnlyConfigProperties.forEach((key)=>{
        if (key in clientConfig) {
            delete clientConfig[key];
        }
    });
    if ('localization' in clientConfig && clientConfig.localization) {
        clientConfig.localization = {
            ...clientConfig.localization
        };
        clientConfig.localization.locales.forEach((locale)=>{
            delete locale.toString;
        });
    }
    if ('admin' in clientConfig) {
        clientConfig.admin = {
            ...clientConfig.admin
        };
        const serverOnlyAdminProperties = [
            'components'
        ];
        serverOnlyAdminProperties.forEach((key)=>{
            if (key in clientConfig.admin) {
                delete clientConfig.admin[key];
            }
        });
        if ('livePreview' in clientConfig.admin) {
            clientConfig.admin.livePreview = {
                ...clientConfig.admin.livePreview
            };
            delete clientConfig.admin.livePreview.url;
        }
    }
    clientConfig.collections = createClientCollectionConfigs({
        collections: clientConfig.collections,
        t
    });
    clientConfig.globals = createClientGlobalConfigs({
        globals: clientConfig.globals,
        t
    });
    return clientConfig;
};

//# sourceMappingURL=client.js.map