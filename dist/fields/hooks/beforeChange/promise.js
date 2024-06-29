import merge from 'deepmerge';
import { MissingEditorProp } from '../../../errors/index.js';
import { fieldAffectsData, tabHasName } from '../../config/types.js';
import { getFieldPaths } from '../../getFieldPaths.js';
import { beforeDuplicate } from './beforeDuplicate.js';
import { getExistingRowDoc } from './getExistingRowDoc.js';
import { traverseFields } from './traverseFields.js';
// This function is responsible for the following actions, in order:
// - Run condition
// - Execute field hooks
// - Validate data
// - Transform data for storage
// - beforeDuplicate hooks (if duplicate)
// - Unflatten locales
export const promise = async ({ id, collection, context, data, doc, docWithLocales, duplicate, errors, field, global, mergeLocaleActions, operation, parentPath, parentSchemaPath, req, siblingData, siblingDoc, siblingDocWithLocales, skipValidation })=>{
    const passesCondition = field.admin?.condition ? Boolean(field.admin.condition(data, siblingData, {
        user: req.user
    })) : true;
    let skipValidationFromHere = skipValidation || !passesCondition;
    const { localization } = req.payload.config;
    const defaultLocale = localization ? localization?.defaultLocale : 'en';
    const operationLocale = req.locale || defaultLocale;
    const { path: fieldPath, schemaPath: fieldSchemaPath } = getFieldPaths({
        field,
        parentPath,
        parentSchemaPath
    });
    if (fieldAffectsData(field)) {
        // skip validation if the field is localized and the incoming data is null
        if (field.localized && operationLocale !== defaultLocale) {
            if ([
                'array',
                'blocks'
            ].includes(field.type) && siblingData[field.name] === null) {
                skipValidationFromHere = true;
            }
        }
        // Execute hooks
        if (field.hooks?.beforeChange) {
            await field.hooks.beforeChange.reduce(async (priorHook, currentHook)=>{
                await priorHook;
                const hookedValue = await currentHook({
                    collection,
                    context,
                    data,
                    field,
                    global,
                    operation,
                    originalDoc: doc,
                    path: fieldPath,
                    previousSiblingDoc: siblingDoc,
                    previousValue: siblingDoc[field.name],
                    req,
                    schemaPath: parentSchemaPath,
                    siblingData,
                    siblingDocWithLocales,
                    value: siblingData[field.name]
                });
                if (hookedValue !== undefined) {
                    siblingData[field.name] = hookedValue;
                }
            }, Promise.resolve());
        }
        // Validate
        if (!skipValidationFromHere && field.validate) {
            const valueToValidate = siblingData[field.name];
            let jsonError;
            if (field.type === 'json' && typeof siblingData[field.name] === 'string') {
                try {
                    JSON.parse(siblingData[field.name]);
                } catch (e) {
                    jsonError = e;
                }
            }
            const validationResult = await field.validate(valueToValidate, {
                ...field,
                id,
                data: merge(doc, data, {
                    arrayMerge: (_, source)=>source
                }),
                jsonError,
                operation,
                preferences: {
                    fields: {}
                },
                req,
                siblingData: merge(siblingDoc, siblingData, {
                    arrayMerge: (_, source)=>source
                })
            });
            if (typeof validationResult === 'string') {
                errors.push({
                    field: fieldPath.join('.'),
                    message: validationResult
                });
            }
        }
        const beforeDuplicateArgs = {
            collection,
            context,
            data,
            field,
            global: undefined,
            path: fieldPath,
            previousSiblingDoc: siblingDoc,
            previousValue: siblingDoc[field.name],
            req,
            schemaPath: parentSchemaPath,
            siblingData,
            siblingDocWithLocales,
            value: siblingData[field.name]
        };
        // Push merge locale action if applicable
        if (localization && field.localized) {
            mergeLocaleActions.push(async ()=>{
                const localeData = await localization.localeCodes.reduce(async (localizedValuesPromise, locale)=>{
                    const localizedValues = await localizedValuesPromise;
                    let fieldValue = locale === req.locale ? siblingData[field.name] : siblingDocWithLocales?.[field.name]?.[locale];
                    if (duplicate && field.hooks?.beforeDuplicate?.length) {
                        beforeDuplicateArgs.value = fieldValue;
                        fieldValue = await beforeDuplicate(beforeDuplicateArgs);
                    }
                    // const result = await localizedValues
                    // update locale value if it's not undefined
                    if (typeof fieldValue !== 'undefined') {
                        return {
                            ...localizedValues,
                            [locale]: fieldValue
                        };
                    }
                    return localizedValuesPromise;
                }, Promise.resolve({}));
                // If there are locales with data, set the data
                if (Object.keys(localeData).length > 0) {
                    siblingData[field.name] = localeData;
                }
            });
        } else if (duplicate && field.hooks?.beforeDuplicate?.length) {
            mergeLocaleActions.push(async ()=>{
                siblingData[field.name] = await beforeDuplicate(beforeDuplicateArgs);
            });
        }
    }
    switch(field.type){
        case 'point':
            {
                // Transform point data for storage
                if (Array.isArray(siblingData[field.name]) && siblingData[field.name][0] !== null && siblingData[field.name][1] !== null) {
                    siblingData[field.name] = {
                        type: 'Point',
                        coordinates: [
                            parseFloat(siblingData[field.name][0]),
                            parseFloat(siblingData[field.name][1])
                        ]
                    };
                }
                break;
            }
        case 'group':
            {
                if (typeof siblingData[field.name] !== 'object') siblingData[field.name] = {};
                if (typeof siblingDoc[field.name] !== 'object') siblingDoc[field.name] = {};
                if (typeof siblingDocWithLocales[field.name] !== 'object') siblingDocWithLocales[field.name] = {};
                await traverseFields({
                    id,
                    collection,
                    context,
                    data,
                    doc,
                    docWithLocales,
                    duplicate,
                    errors,
                    fields: field.fields,
                    global,
                    mergeLocaleActions,
                    operation,
                    path: fieldPath,
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData: siblingData[field.name],
                    siblingDoc: siblingDoc[field.name],
                    siblingDocWithLocales: siblingDocWithLocales[field.name],
                    skipValidation: skipValidationFromHere
                });
                break;
            }
        case 'array':
            {
                const rows = siblingData[field.name];
                if (Array.isArray(rows)) {
                    const promises = [];
                    rows.forEach((row, i)=>{
                        promises.push(traverseFields({
                            id,
                            collection,
                            context,
                            data,
                            doc,
                            docWithLocales,
                            duplicate,
                            errors,
                            fields: field.fields,
                            global,
                            mergeLocaleActions,
                            operation,
                            path: [
                                ...fieldPath,
                                i
                            ],
                            req,
                            schemaPath: fieldSchemaPath,
                            siblingData: row,
                            siblingDoc: getExistingRowDoc(row, siblingDoc[field.name]),
                            siblingDocWithLocales: getExistingRowDoc(row, siblingDocWithLocales[field.name]),
                            skipValidation: skipValidationFromHere
                        }));
                    });
                    await Promise.all(promises);
                }
                break;
            }
        case 'blocks':
            {
                const rows = siblingData[field.name];
                if (Array.isArray(rows)) {
                    const promises = [];
                    rows.forEach((row, i)=>{
                        const rowSiblingDoc = getExistingRowDoc(row, siblingDoc[field.name]);
                        const rowSiblingDocWithLocales = getExistingRowDoc(row, siblingDocWithLocales[field.name]);
                        const blockTypeToMatch = row.blockType || rowSiblingDoc.blockType;
                        const block = field.blocks.find((blockType)=>blockType.slug === blockTypeToMatch);
                        if (block) {
                            promises.push(traverseFields({
                                id,
                                collection,
                                context,
                                data,
                                doc,
                                docWithLocales,
                                duplicate,
                                errors,
                                fields: block.fields,
                                global,
                                mergeLocaleActions,
                                operation,
                                path: [
                                    ...fieldPath,
                                    i
                                ],
                                req,
                                schemaPath: fieldSchemaPath,
                                siblingData: row,
                                siblingDoc: rowSiblingDoc,
                                siblingDocWithLocales: rowSiblingDocWithLocales,
                                skipValidation: skipValidationFromHere
                            }));
                        }
                    });
                    await Promise.all(promises);
                }
                break;
            }
        case 'row':
        case 'collapsible':
            {
                await traverseFields({
                    id,
                    collection,
                    context,
                    data,
                    doc,
                    docWithLocales,
                    duplicate,
                    errors,
                    fields: field.fields,
                    global,
                    mergeLocaleActions,
                    operation,
                    path: fieldPath,
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData,
                    siblingDoc,
                    siblingDocWithLocales,
                    skipValidation: skipValidationFromHere
                });
                break;
            }
        case 'tab':
            {
                let tabSiblingData = siblingData;
                let tabSiblingDoc = siblingDoc;
                let tabSiblingDocWithLocales = siblingDocWithLocales;
                if (tabHasName(field)) {
                    if (typeof siblingData[field.name] !== 'object') siblingData[field.name] = {};
                    if (typeof siblingDoc[field.name] !== 'object') siblingDoc[field.name] = {};
                    if (typeof siblingDocWithLocales[field.name] !== 'object') siblingDocWithLocales[field.name] = {};
                    tabSiblingData = siblingData[field.name];
                    tabSiblingDoc = siblingDoc[field.name];
                    tabSiblingDocWithLocales = siblingDocWithLocales[field.name];
                }
                await traverseFields({
                    id,
                    collection,
                    context,
                    data,
                    doc,
                    docWithLocales,
                    duplicate,
                    errors,
                    fields: field.fields,
                    global,
                    mergeLocaleActions,
                    operation,
                    path: fieldPath,
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData: tabSiblingData,
                    siblingDoc: tabSiblingDoc,
                    siblingDocWithLocales: tabSiblingDocWithLocales,
                    skipValidation: skipValidationFromHere
                });
                break;
            }
        case 'tabs':
            {
                await traverseFields({
                    id,
                    collection,
                    context,
                    data,
                    doc,
                    docWithLocales,
                    duplicate,
                    errors,
                    fields: field.tabs.map((tab)=>({
                            ...tab,
                            type: 'tab'
                        })),
                    global,
                    mergeLocaleActions,
                    operation,
                    path: fieldPath,
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData,
                    siblingDoc,
                    siblingDocWithLocales,
                    skipValidation: skipValidationFromHere
                });
                break;
            }
        case 'richText':
            {
                if (!field?.editor) {
                    throw new MissingEditorProp(field) // while we allow disabling editor functionality, you should not have any richText fields defined if you do not have an editor
                    ;
                }
                if (typeof field?.editor === 'function') {
                    throw new Error('Attempted to access unsanitized rich text editor.');
                }
                const editor = field?.editor;
                if (editor?.hooks?.beforeChange?.length) {
                    await editor.hooks.beforeChange.reduce(async (priorHook, currentHook)=>{
                        await priorHook;
                        const hookedValue = await currentHook({
                            collection,
                            context,
                            data,
                            docWithLocales,
                            duplicate,
                            errors,
                            field,
                            global,
                            mergeLocaleActions,
                            operation,
                            originalDoc: doc,
                            path: fieldPath,
                            previousSiblingDoc: siblingDoc,
                            previousValue: siblingDoc[field.name],
                            req,
                            schemaPath: parentSchemaPath,
                            siblingData,
                            siblingDocWithLocales,
                            skipValidation,
                            value: siblingData[field.name]
                        });
                        if (hookedValue !== undefined) {
                            siblingData[field.name] = hookedValue;
                        }
                    }, Promise.resolve());
                }
                break;
            }
        default:
            {
                break;
            }
    }
};

//# sourceMappingURL=promise.js.map