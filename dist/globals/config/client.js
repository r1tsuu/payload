import { createClientFieldConfigs } from '../../fields/config/client.js';
export const createClientGlobalConfig = ({ global, t })=>{
    const sanitized = {
        ...global
    };
    sanitized.fields = createClientFieldConfigs({
        fields: sanitized.fields,
        t
    });
    const serverOnlyProperties = [
        'hooks',
        'access',
        'endpoints',
        'custom'
    ];
    serverOnlyProperties.forEach((key)=>{
        if (key in sanitized) {
            delete sanitized[key];
        }
    });
    if ('admin' in sanitized) {
        sanitized.admin = {
            ...sanitized.admin
        };
        const serverOnlyGlobalAdminProperties = [
            'components',
            'hidden',
            'preview'
        ];
        serverOnlyGlobalAdminProperties.forEach((key)=>{
            if (key in sanitized.admin) {
                delete sanitized.admin[key];
            }
        });
        if ('livePreview' in sanitized.admin) {
            sanitized.admin.livePreview = {
                ...sanitized.admin.livePreview
            };
            delete sanitized.admin.livePreview.url;
        }
    }
    return sanitized;
};
export const createClientGlobalConfigs = ({ globals, t })=>globals.map((global)=>createClientGlobalConfig({
            global,
            t
        }));

//# sourceMappingURL=client.js.map