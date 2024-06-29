/* eslint-disable no-param-reassign */ import { MissingEditorProp } from '../../../errors/index.js';
import { fieldAffectsData, tabHasName } from '../../config/types.js';
import { getFieldPaths } from '../../getFieldPaths.js';
import { traverseFields } from './traverseFields.js';
// This function is responsible for the following actions, in order:
// - Execute field hooks
export const promise = async ({ collection, context, data, doc, field, global, operation, parentPath, parentSchemaPath, previousDoc, previousSiblingDoc, req, siblingData, siblingDoc })=>{
    const { path: fieldPath, schemaPath: fieldSchemaPath } = getFieldPaths({
        field,
        parentPath,
        parentSchemaPath
    });
    if (fieldAffectsData(field)) {
        // Execute hooks
        if (field.hooks?.afterChange) {
            await field.hooks.afterChange.reduce(async (priorHook, currentHook)=>{
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
                    previousDoc,
                    previousSiblingDoc,
                    previousValue: previousDoc[field.name],
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData,
                    value: siblingDoc[field.name]
                });
                if (hookedValue !== undefined) {
                    siblingDoc[field.name] = hookedValue;
                }
            }, Promise.resolve());
        }
    }
    // Traverse subfields
    switch(field.type){
        case 'group':
            {
                await traverseFields({
                    collection,
                    context,
                    data,
                    doc,
                    fields: field.fields,
                    global,
                    operation,
                    path: fieldPath,
                    previousDoc,
                    previousSiblingDoc: previousDoc[field.name],
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData: siblingData?.[field.name] || {},
                    siblingDoc: siblingDoc[field.name]
                });
                break;
            }
        case 'array':
            {
                const rows = siblingDoc[field.name];
                if (Array.isArray(rows)) {
                    const promises = [];
                    rows.forEach((row, i)=>{
                        promises.push(traverseFields({
                            collection,
                            context,
                            data,
                            doc,
                            fields: field.fields,
                            global,
                            operation,
                            path: [
                                ...fieldPath,
                                i
                            ],
                            previousDoc,
                            previousSiblingDoc: previousDoc?.[field.name]?.[i] || {},
                            req,
                            schemaPath: fieldSchemaPath,
                            siblingData: siblingData?.[field.name]?.[i] || {},
                            siblingDoc: {
                                ...row
                            } || {}
                        }));
                    });
                    await Promise.all(promises);
                }
                break;
            }
        case 'blocks':
            {
                const rows = siblingDoc[field.name];
                if (Array.isArray(rows)) {
                    const promises = [];
                    rows.forEach((row, i)=>{
                        const block = field.blocks.find((blockType)=>blockType.slug === row.blockType);
                        if (block) {
                            promises.push(traverseFields({
                                collection,
                                context,
                                data,
                                doc,
                                fields: block.fields,
                                global,
                                operation,
                                path: [
                                    ...fieldPath,
                                    i
                                ],
                                previousDoc,
                                previousSiblingDoc: previousDoc?.[field.name]?.[i] || {},
                                req,
                                schemaPath: fieldSchemaPath,
                                siblingData: siblingData?.[field.name]?.[i] || {},
                                siblingDoc: {
                                    ...row
                                } || {}
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
                    collection,
                    context,
                    data,
                    doc,
                    fields: field.fields,
                    global,
                    operation,
                    path: fieldPath,
                    previousDoc,
                    previousSiblingDoc: {
                        ...previousSiblingDoc
                    },
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData: siblingData || {},
                    siblingDoc: {
                        ...siblingDoc
                    }
                });
                break;
            }
        case 'tab':
            {
                let tabSiblingData = siblingData;
                let tabSiblingDoc = siblingDoc;
                let tabPreviousSiblingDoc = siblingDoc;
                if (tabHasName(field)) {
                    tabSiblingData = siblingData[field.name];
                    tabSiblingDoc = siblingDoc[field.name];
                    tabPreviousSiblingDoc = previousDoc[field.name];
                }
                await traverseFields({
                    collection,
                    context,
                    data,
                    doc,
                    fields: field.fields,
                    global,
                    operation,
                    path: fieldPath,
                    previousDoc,
                    previousSiblingDoc: tabPreviousSiblingDoc,
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
                    path: fieldPath,
                    previousDoc,
                    previousSiblingDoc: {
                        ...previousSiblingDoc
                    },
                    req,
                    schemaPath: fieldSchemaPath,
                    siblingData: siblingData || {},
                    siblingDoc: {
                        ...siblingDoc
                    }
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
                if (editor?.hooks?.afterChange?.length) {
                    await editor.hooks.afterChange.reduce(async (priorHook, currentHook)=>{
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
                            previousDoc,
                            previousSiblingDoc,
                            previousValue: previousDoc[field.name],
                            req,
                            schemaPath: fieldSchemaPath,
                            siblingData,
                            value: siblingDoc[field.name]
                        });
                        if (hookedValue !== undefined) {
                            siblingDoc[field.name] = hookedValue;
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