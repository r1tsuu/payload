/* eslint-disable no-param-reassign */ import { MissingEditorProp } from '../../../errors/index.js';
import { fieldAffectsData, tabHasName, valueIsValueWithRelation } from '../../config/types.js';
import getValueWithDefault from '../../getDefaultValue.js';
import { getFieldPaths } from '../../getFieldPaths.js';
import { cloneDataFromOriginalDoc } from '../beforeChange/cloneDataFromOriginalDoc.js';
import { getExistingRowDoc } from '../beforeChange/getExistingRowDoc.js';
import { traverseFields } from './traverseFields.js';
// This function is responsible for the following actions, in order:
// - Sanitize incoming data
// - Execute field hooks
// - Execute field access control
// - Merge original document data into incoming data
// - Compute default values for undefined fields
export const promise = async ({ id, collection, context, data, doc, field, global, operation, overrideAccess, parentPath, parentSchemaPath, req, siblingData, siblingDoc })=>{
    const { path: fieldPath, schemaPath: fieldSchemaPath } = getFieldPaths({
        field,
        parentPath,
        parentSchemaPath
    });
    if (fieldAffectsData(field)) {
        if (field.name === 'id') {
            if (field.type === 'number' && typeof siblingData[field.name] === 'string') {
                const value = siblingData[field.name];
                siblingData[field.name] = parseFloat(value);
            }
            if (field.type === 'text' && typeof siblingData[field.name]?.toString === 'function' && typeof siblingData[field.name] !== 'string') {
                siblingData[field.name] = siblingData[field.name].toString();
            }
        }
        // Sanitize incoming data
        switch(field.type){
            case 'number':
                {
                    if (typeof siblingData[field.name] === 'string') {
                        const value = siblingData[field.name];
                        const trimmed = value.trim();
                        siblingData[field.name] = trimmed.length === 0 ? null : parseFloat(trimmed);
                    }
                    break;
                }
            case 'point':
                {
                    if (Array.isArray(siblingData[field.name])) {
                        siblingData[field.name] = siblingData[field.name].map((coordinate, i)=>{
                            if (typeof coordinate === 'string') {
                                const value = siblingData[field.name][i];
                                const trimmed = value.trim();
                                return trimmed.length === 0 ? null : parseFloat(trimmed);
                            }
                            return coordinate;
                        });
                    }
                    break;
                }
            case 'checkbox':
                {
                    if (siblingData[field.name] === 'true') siblingData[field.name] = true;
                    if (siblingData[field.name] === 'false') siblingData[field.name] = false;
                    if (siblingData[field.name] === '') siblingData[field.name] = false;
                    break;
                }
            case 'richText':
                {
                    if (typeof siblingData[field.name] === 'string') {
                        try {
                            const richTextJSON = JSON.parse(siblingData[field.name]);
                            siblingData[field.name] = richTextJSON;
                        } catch  {
                        // Disregard this data as it is not valid.
                        // Will be reported to user by field validation
                        }
                    }
                    break;
                }
            case 'relationship':
            case 'upload':
                {
                    if (siblingData[field.name] === '' || siblingData[field.name] === 'none' || siblingData[field.name] === 'null' || siblingData[field.name] === null) {
                        if (field.type === 'relationship' && field.hasMany === true) {
                            siblingData[field.name] = [];
                        } else {
                            siblingData[field.name] = null;
                        }
                    }
                    const value = siblingData[field.name];
                    if (Array.isArray(field.relationTo)) {
                        if (Array.isArray(value)) {
                            value.forEach((relatedDoc, i)=>{
                                const relatedCollection = req.payload.config.collections.find((collection)=>collection.slug === relatedDoc.relationTo);
                                const relationshipIDField = relatedCollection.fields.find((collectionField)=>fieldAffectsData(collectionField) && collectionField.name === 'id');
                                if (relationshipIDField?.type === 'number') {
                                    siblingData[field.name][i] = {
                                        ...relatedDoc,
                                        value: parseFloat(relatedDoc.value)
                                    };
                                }
                            });
                        }
                        if (field.type === 'relationship' && field.hasMany !== true && valueIsValueWithRelation(value)) {
                            const relatedCollection = req.payload.config.collections.find((collection)=>collection.slug === value.relationTo);
                            const relationshipIDField = relatedCollection.fields.find((collectionField)=>fieldAffectsData(collectionField) && collectionField.name === 'id');
                            if (relationshipIDField?.type === 'number') {
                                siblingData[field.name] = {
                                    ...value,
                                    value: parseFloat(value.value)
                                };
                            }
                        }
                    } else {
                        if (Array.isArray(value)) {
                            value.forEach((relatedDoc, i)=>{
                                const relatedCollection = req.payload.config.collections.find((collection)=>collection.slug === field.relationTo);
                                const relationshipIDField = relatedCollection.fields.find((collectionField)=>fieldAffectsData(collectionField) && collectionField.name === 'id');
                                if (relationshipIDField?.type === 'number') {
                                    siblingData[field.name][i] = parseFloat(relatedDoc);
                                }
                            });
                        }
                        if (field.type === 'relationship' && field.hasMany !== true && value) {
                            const relatedCollection = req.payload.config.collections.find((collection)=>collection.slug === field.relationTo);
                            const relationshipIDField = relatedCollection.fields.find((collectionField)=>fieldAffectsData(collectionField) && collectionField.name === 'id');
                            if (relationshipIDField?.type === 'number') {
                                siblingData[field.name] = parseFloat(value);
                            }
                        }
                    }
                    break;
                }
            case 'array':
            case 'blocks':
                {
                    // Handle cases of arrays being intentionally set to 0
                    if (siblingData[field.name] === '0' || siblingData[field.name] === 0) {
                        siblingData[field.name] = [];
                    }
                    break;
                }
            default:
                {
                    break;
                }
        }
        // Execute hooks
        if (field.hooks?.beforeValidate) {
            await field.hooks.beforeValidate.reduce(async (priorHook, currentHook)=>{
                await priorHook;
                const hookedValue = await currentHook({
                    collection,
                    context,
                    data,
                    field,
                    global,
                    operation,
                    originalDoc: doc,
                    overrideAccess,
                    path: fieldPath,
                    previousSiblingDoc: siblingDoc,
                    previousValue: siblingData[field.name],
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData,
                    value: siblingData[field.name]
                });
                if (hookedValue !== undefined) {
                    siblingData[field.name] = hookedValue;
                }
            }, Promise.resolve());
        }
        // Execute access control
        if (field.access && field.access[operation]) {
            const result = overrideAccess ? true : await field.access[operation]({
                id,
                data,
                doc,
                req,
                siblingData
            });
            if (!result) {
                delete siblingData[field.name];
            }
        }
        if (typeof siblingData[field.name] === 'undefined') {
            // If no incoming data, but existing document data is found, merge it in
            if (typeof siblingDoc[field.name] !== 'undefined') {
                siblingData[field.name] = cloneDataFromOriginalDoc(siblingDoc[field.name]);
            // Otherwise compute default value
            } else if (typeof field.defaultValue !== 'undefined') {
                siblingData[field.name] = await getValueWithDefault({
                    defaultValue: field.defaultValue,
                    locale: req.locale,
                    user: req.user,
                    value: siblingData[field.name]
                });
            }
        }
    }
    // Traverse subfields
    switch(field.type){
        case 'group':
            {
                if (typeof siblingData[field.name] !== 'object') siblingData[field.name] = {};
                if (typeof siblingDoc[field.name] !== 'object') siblingDoc[field.name] = {};
                const groupData = siblingData[field.name];
                const groupDoc = siblingDoc[field.name];
                await traverseFields({
                    id,
                    collection,
                    context,
                    data,
                    doc,
                    fields: field.fields,
                    global,
                    operation,
                    overrideAccess,
                    path: fieldPath,
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData: groupData,
                    siblingDoc: groupDoc
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
                            fields: field.fields,
                            global,
                            operation,
                            overrideAccess,
                            path: [
                                ...fieldPath,
                                i
                            ],
                            req,
                            schemaPath: fieldSchemaPath,
                            siblingData: row,
                            siblingDoc: getExistingRowDoc(row, siblingDoc[field.name])
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
                        const blockTypeToMatch = row.blockType || rowSiblingDoc.blockType;
                        const block = field.blocks.find((blockType)=>blockType.slug === blockTypeToMatch);
                        if (block) {
                            row.blockType = blockTypeToMatch;
                            promises.push(traverseFields({
                                id,
                                collection,
                                context,
                                data,
                                doc,
                                fields: block.fields,
                                global,
                                operation,
                                overrideAccess,
                                path: [
                                    ...fieldPath,
                                    i
                                ],
                                req,
                                schemaPath: fieldSchemaPath,
                                siblingData: row,
                                siblingDoc: rowSiblingDoc
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
                    fields: field.fields,
                    global,
                    operation,
                    overrideAccess,
                    path: fieldPath,
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData,
                    siblingDoc
                });
                break;
            }
        case 'tab':
            {
                let tabSiblingData;
                let tabSiblingDoc;
                if (tabHasName(field)) {
                    if (typeof siblingData[field.name] !== 'object') siblingData[field.name] = {};
                    if (typeof siblingDoc[field.name] !== 'object') siblingDoc[field.name] = {};
                    tabSiblingData = siblingData[field.name];
                    tabSiblingDoc = siblingDoc[field.name];
                } else {
                    tabSiblingData = siblingData;
                    tabSiblingDoc = siblingDoc;
                }
                await traverseFields({
                    id,
                    collection,
                    context,
                    data,
                    doc,
                    fields: field.fields,
                    global,
                    operation,
                    overrideAccess,
                    path: fieldPath,
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData: tabSiblingData,
                    siblingDoc: tabSiblingDoc
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
                    fields: field.tabs.map((tab)=>({
                            ...tab,
                            type: 'tab'
                        })),
                    global,
                    operation,
                    overrideAccess,
                    path: fieldPath,
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData,
                    siblingDoc
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
                if (editor?.hooks?.beforeValidate?.length) {
                    await editor.hooks.beforeValidate.reduce(async (priorHook, currentHook)=>{
                        await priorHook;
                        const hookedValue = await currentHook({
                            collection,
                            context,
                            data,
                            field,
                            global,
                            operation,
                            originalDoc: doc,
                            overrideAccess,
                            path: fieldPath,
                            previousSiblingDoc: siblingDoc,
                            previousValue: siblingData[field.name],
                            req,
                            schemaPath: fieldSchemaPath,
                            siblingData,
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