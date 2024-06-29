import { createClientFieldConfigs } from '../../fields/config/client.js';
export const createClientCollectionConfig = ({ collection, t })=>{
    const sanitized = {
        ...collection
    };
    sanitized.fields = createClientFieldConfigs({
        fields: sanitized.fields,
        t
    });
    const serverOnlyCollectionProperties = [
        'hooks',
        'access',
        'endpoints',
        'custom'
    ];
    serverOnlyCollectionProperties.forEach((key)=>{
        if (key in sanitized) {
            delete sanitized[key];
        }
    });
    if ('upload' in sanitized && typeof sanitized.upload === 'object') {
        sanitized.upload = {
            ...sanitized.upload
        };
        delete sanitized.upload.handlers;
        delete sanitized.upload.adminThumbnail;
        delete sanitized.upload.externalFileHeaderFilter;
    }
    if ('auth' in sanitized && typeof sanitized.auth === 'object') {
        sanitized.auth = {
            ...sanitized.auth
        };
        delete sanitized.auth.strategies;
        delete sanitized.auth.forgotPassword;
        delete sanitized.auth.verify;
    }
    if (sanitized.labels) {
        Object.entries(sanitized.labels).forEach(([labelType, collectionLabel])=>{
            if (typeof collectionLabel === 'function') {
                sanitized.labels[labelType] = collectionLabel({
                    t
                });
            }
        });
    }
    if ('admin' in sanitized) {
        sanitized.admin = {
            ...sanitized.admin
        };
        const serverOnlyCollectionAdminProperties = [
            'components',
            'hidden',
            'preview'
        ];
        serverOnlyCollectionAdminProperties.forEach((key)=>{
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
export const createClientCollectionConfigs = ({ collections, t })=>collections.map((collection)=>createClientCollectionConfig({
            collection,
            t
        }));

//# sourceMappingURL=client.js.map