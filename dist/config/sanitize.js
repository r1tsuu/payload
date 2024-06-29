import { en } from '@payloadcms/translations/languages/en';
import merge from 'deepmerge';
import { defaultUserCollection } from '../auth/defaultUser.js';
import { sanitizeCollection } from '../collections/config/sanitize.js';
import { migrationsCollection } from '../database/migrations/migrationsCollection.js';
import { InvalidConfiguration } from '../errors/index.js';
import { sanitizeGlobals } from '../globals/config/sanitize.js';
import getPreferencesCollection from '../preferences/preferencesCollection.js';
import checkDuplicateCollections from '../utilities/checkDuplicateCollections.js';
import { deepMerge } from '../utilities/deepMerge.js';
import { isPlainObject } from '../utilities/isPlainObject.js';
import { defaults } from './defaults.js';
const sanitizeAdminConfig = (configToSanitize)=>{
    const sanitizedConfig = {
        ...configToSanitize
    };
    // add default user collection if none provided
    if (!sanitizedConfig?.admin?.user) {
        const firstCollectionWithAuth = sanitizedConfig.collections.find(({ auth })=>Boolean(auth));
        if (firstCollectionWithAuth) {
            sanitizedConfig.admin.user = firstCollectionWithAuth.slug;
        } else {
            sanitizedConfig.admin.user = defaultUserCollection.slug;
            sanitizedConfig.collections.push(defaultUserCollection);
        }
    }
    const userCollection = sanitizedConfig.collections.find(({ slug })=>slug === sanitizedConfig.admin.user);
    if (!userCollection || !userCollection.auth) {
        throw new InvalidConfiguration(`${sanitizedConfig.admin.user} is not a valid admin user collection`);
    }
    return sanitizedConfig;
};
export const sanitizeConfig = async (incomingConfig)=>{
    const configWithDefaults = merge(defaults, incomingConfig, {
        isMergeableObject: isPlainObject
    });
    if (!configWithDefaults?.serverURL) {
        configWithDefaults.serverURL = '';
    }
    if (process.env.NEXT_BASE_PATH) {
        if (!incomingConfig?.routes?.api) {
            // check for incomingConfig, as configWithDefaults will always have a default value for routes.api
            configWithDefaults.routes.api = process.env.NEXT_BASE_PATH + '/api';
        }
    }
    const config = sanitizeAdminConfig(configWithDefaults);
    if (config.localization && config.localization.locales?.length > 0) {
        // clone localization config so to not break everything
        const firstLocale = config.localization.locales[0];
        if (typeof firstLocale === 'string') {
            config.localization.localeCodes = [
                ...config.localization.locales
            ];
            // is string[], so convert to Locale[]
            config.localization.locales = config.localization.locales.map((locale)=>({
                    code: locale,
                    label: locale,
                    rtl: false,
                    toString: ()=>locale
                }));
        } else {
            // is Locale[], so convert to string[] for localeCodes
            config.localization.localeCodes = config.localization.locales.reduce((locales, locale)=>{
                locales.push(locale.code);
                return locales;
            }, []);
            config.localization.locales = config.localization.locales.map((locale)=>({
                    ...locale,
                    toString: ()=>locale.code
                }));
        }
    }
    const i18nConfig = {
        fallbackLanguage: 'en',
        supportedLanguages: {
            en
        },
        translations: {}
    };
    if (incomingConfig?.i18n) {
        i18nConfig.supportedLanguages = incomingConfig.i18n?.supportedLanguages || i18nConfig.supportedLanguages;
        const supportedLangKeys = Object.keys(i18nConfig.supportedLanguages);
        const fallbackLang = incomingConfig.i18n?.fallbackLanguage || i18nConfig.fallbackLanguage;
        i18nConfig.fallbackLanguage = supportedLangKeys.includes(fallbackLang) ? fallbackLang : supportedLangKeys[0];
        i18nConfig.translations = incomingConfig.i18n?.translations || i18nConfig.translations;
    }
    config.i18n = i18nConfig;
    configWithDefaults.collections.push(getPreferencesCollection(config));
    configWithDefaults.collections.push(migrationsCollection);
    const richTextSanitizationPromises = [];
    for(let i = 0; i < config.collections.length; i++){
        config.collections[i] = await sanitizeCollection(config, config.collections[i], richTextSanitizationPromises);
    }
    checkDuplicateCollections(config.collections);
    if (config.globals.length > 0) {
        config.globals = await sanitizeGlobals(config, richTextSanitizationPromises);
    }
    if (config.serverURL !== '') {
        config.csrf.push(config.serverURL);
    }
    // Get deduped list of upload adapters
    if (!config.upload) config.upload = {
        adapters: []
    };
    config.upload.adapters = Array.from(new Set(config.collections.map((c)=>c.upload?.adapter).filter(Boolean)));
    /*
    Execute richText sanitization
   */ if (typeof incomingConfig.editor === 'function') {
        config.editor = await incomingConfig.editor({
            config: config,
            isRoot: true
        });
        if (config.editor.i18n && Object.keys(config.editor.i18n).length >= 0) {
            config.i18n.translations = deepMerge(config.i18n.translations, config.editor.i18n);
        }
    }
    const promises = [];
    for (const sanitizeFunction of richTextSanitizationPromises){
        promises.push(sanitizeFunction(config));
    }
    await Promise.all(promises);
    return config;
};

//# sourceMappingURL=sanitize.js.map