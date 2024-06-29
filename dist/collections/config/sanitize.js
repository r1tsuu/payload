import merge from 'deepmerge';
import baseAccountLockFields from '../../auth/baseFields/accountLock.js';
import baseAPIKeyFields from '../../auth/baseFields/apiKey.js';
import baseAuthFields from '../../auth/baseFields/auth.js';
import baseVerificationFields from '../../auth/baseFields/verification.js';
import { TimestampsRequired } from '../../errors/TimestampsRequired.js';
import { sanitizeFields } from '../../fields/config/sanitize.js';
import { fieldAffectsData } from '../../fields/config/types.js';
import mergeBaseFields from '../../fields/mergeBaseFields.js';
import { getBaseUploadFields } from '../../uploads/getBaseFields.js';
import { formatLabels } from '../../utilities/formatLabels.js';
import { isPlainObject } from '../../utilities/isPlainObject.js';
import baseVersionFields from '../../versions/baseFields.js';
import { versionDefaults } from '../../versions/defaults.js';
import { authDefaults, defaults } from './defaults.js';
export const sanitizeCollection = async (config, collection, /**
   * If this property is set, RichText fields won't be sanitized immediately. Instead, they will be added to this array as promises
   * so that you can sanitize them together, after the config has been sanitized.
   */ richTextSanitizationPromises)=>{
    // /////////////////////////////////
    // Make copy of collection config
    // /////////////////////////////////
    const sanitized = merge(defaults, collection, {
        isMergeableObject: isPlainObject
    });
    if (sanitized.timestamps !== false) {
        // add default timestamps fields only as needed
        let hasUpdatedAt = null;
        let hasCreatedAt = null;
        sanitized.fields.some((field)=>{
            if (fieldAffectsData(field)) {
                if (field.name === 'updatedAt') hasUpdatedAt = true;
                if (field.name === 'createdAt') hasCreatedAt = true;
            }
            return hasCreatedAt && hasUpdatedAt;
        });
        if (!hasUpdatedAt) {
            sanitized.fields.push({
                name: 'updatedAt',
                type: 'date',
                admin: {
                    disableBulkEdit: true,
                    hidden: true
                },
                label: ({ t })=>t('general:updatedAt')
            });
        }
        if (!hasCreatedAt) {
            sanitized.fields.push({
                name: 'createdAt',
                admin: {
                    disableBulkEdit: true,
                    hidden: true
                },
                // The default sort for list view is createdAt. Thus, enabling indexing by default, is a major performance improvement, especially for large or a large amount of collections.
                type: 'date',
                index: true,
                label: ({ t })=>t('general:createdAt')
            });
        }
    }
    sanitized.labels = sanitized.labels || formatLabels(sanitized.slug);
    if (sanitized.versions) {
        if (sanitized.versions === true) sanitized.versions = {
            drafts: false
        };
        if (sanitized.timestamps === false) {
            throw new TimestampsRequired(collection);
        }
        if (sanitized.versions.drafts) {
            if (sanitized.versions.drafts === true) {
                sanitized.versions.drafts = {
                    autosave: false,
                    validate: false
                };
            }
            if (sanitized.versions.drafts.autosave === true) {
                sanitized.versions.drafts.autosave = {
                    interval: versionDefaults.autosaveInterval
                };
            }
            if (sanitized.versions.drafts.validate === undefined) {
                sanitized.versions.drafts.validate = false;
            }
            sanitized.fields = mergeBaseFields(sanitized.fields, baseVersionFields);
        }
    }
    if (sanitized.upload) {
        if (sanitized.upload === true) sanitized.upload = {};
        // disable duplicate for uploads by default
        sanitized.disableDuplicate = sanitized.disableDuplicate || true;
        sanitized.upload.staticDir = sanitized.upload.staticDir || sanitized.slug;
        sanitized.admin.useAsTitle = sanitized.admin.useAsTitle && sanitized.admin.useAsTitle !== 'id' ? sanitized.admin.useAsTitle : 'filename';
        const uploadFields = getBaseUploadFields({
            collection: sanitized,
            config
        });
        sanitized.fields = mergeBaseFields(sanitized.fields, uploadFields);
    }
    if (sanitized.auth) {
        sanitized.auth = merge(authDefaults, typeof sanitized.auth === 'object' ? sanitized.auth : {}, {
            isMergeableObject: isPlainObject
        });
        let authFields = [];
        if (sanitized.auth.useAPIKey) {
            authFields = authFields.concat(baseAPIKeyFields);
        }
        if (!sanitized.auth.disableLocalStrategy) {
            authFields = authFields.concat(baseAuthFields);
            if (sanitized.auth.verify) {
                if (sanitized.auth.verify === true) sanitized.auth.verify = {};
                authFields = authFields.concat(baseVerificationFields);
            }
            if (sanitized.auth.maxLoginAttempts > 0) {
                authFields = authFields.concat(baseAccountLockFields);
            }
        }
        // disable duplicate for auth enabled collections by default
        sanitized.disableDuplicate = sanitized.disableDuplicate || true;
        if (!sanitized.auth.strategies) {
            sanitized.auth.strategies = [];
        }
        sanitized.fields = mergeBaseFields(sanitized.fields, authFields);
    }
    // /////////////////////////////////
    // Sanitize fields
    // /////////////////////////////////
    const validRelationships = config.collections.map((c)=>c.slug) || [];
    sanitized.fields = await sanitizeFields({
        config,
        fields: sanitized.fields,
        richTextSanitizationPromises,
        validRelationships
    });
    return sanitized;
};

//# sourceMappingURL=sanitize.js.map