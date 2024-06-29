import { MissingEditorProp } from '../../errors/MissingEditorProp.js';
import { DuplicateFieldName, InvalidFieldName, InvalidFieldRelationship, MissingFieldType } from '../../errors/index.js';
import { deepMerge } from '../../utilities/deepMerge.js';
import { formatLabels, toWords } from '../../utilities/formatLabels.js';
import { baseBlockFields } from '../baseFields/baseBlockFields.js';
import { baseIDField } from '../baseFields/baseIDField.js';
import { setDefaultBeforeDuplicate } from '../setDefaultBeforeDuplicate.js';
import validations from '../validations.js';
import { fieldAffectsData, tabHasName } from './types.js';
export const sanitizeFields = async ({ config, existingFieldNames = new Set(), fields, requireFieldLevelRichTextEditor = false, richTextSanitizationPromises, validRelationships })=>{
    if (!fields) return [];
    for(let i = 0; i < fields.length; i++){
        const field = fields[i];
        if (!field.type) throw new MissingFieldType(field);
        // assert that field names do not contain forbidden characters
        if (fieldAffectsData(field) && field.name.includes('.')) {
            throw new InvalidFieldName(field, field.name);
        }
        // Auto-label
        if ('name' in field && field.name && typeof field.label !== 'object' && typeof field.label !== 'string' && typeof field.label !== 'function' && field.label !== false) {
            field.label = toWords(field.name);
        }
        if (field.type === 'checkbox' && typeof field.defaultValue === 'undefined' && field.required === true) {
            field.defaultValue = false;
        }
        if (field.type === 'relationship' || field.type === 'upload') {
            if (validRelationships) {
                const relationships = Array.isArray(field.relationTo) ? field.relationTo : [
                    field.relationTo
                ];
                relationships.forEach((relationship)=>{
                    if (!validRelationships.includes(relationship)) {
                        throw new InvalidFieldRelationship(field, relationship);
                    }
                });
            }
            if (field.type === 'relationship') {
                if (field.min && !field.minRows) {
                    console.warn(`(payload): The "min" property is deprecated for the Relationship field "${field.name}" and will be removed in a future version. Please use "minRows" instead.`);
                }
                if (field.max && !field.maxRows) {
                    console.warn(`(payload): The "max" property is deprecated for the Relationship field "${field.name}" and will be removed in a future version. Please use "maxRows" instead.`);
                }
                field.minRows = field.minRows || field.min;
                field.maxRows = field.maxRows || field.max;
            }
        }
        if (field.type === 'blocks' && field.blocks) {
            field.blocks = field.blocks.map((block)=>({
                    ...block,
                    fields: block.fields.concat(baseBlockFields)
                }));
        }
        if (field.type === 'array' && field.fields) {
            field.fields.push(baseIDField);
        }
        if ((field.type === 'blocks' || field.type === 'array') && field.label) {
            field.labels = field.labels || formatLabels(field.name);
        }
        if (fieldAffectsData(field)) {
            if (existingFieldNames.has(field.name)) {
                throw new DuplicateFieldName(field.name);
            } else if (![
                'blockName',
                'id'
            ].includes(field.name)) {
                existingFieldNames.add(field.name);
            }
            if (field.localized && !config.localization) delete field.localized;
            if (typeof field.validate === 'undefined') {
                const defaultValidate = validations[field.type];
                if (defaultValidate) {
                    field.validate = (val, options)=>defaultValidate(val, {
                            ...field,
                            ...options
                        });
                } else {
                    field.validate = ()=>true;
                }
            }
            if (!field.hooks) field.hooks = {};
            if (!field.access) field.access = {};
            setDefaultBeforeDuplicate(field);
        }
        if (!field.admin) {
            field.admin = {};
        }
        // Make sure that the richText field has an editor
        if (field.type === 'richText') {
            const sanitizeRichText = async (_config)=>{
                if (!field.editor) {
                    if (_config.editor && !requireFieldLevelRichTextEditor) {
                        // config.editor should be sanitized at this point
                        field.editor = _config.editor;
                    } else {
                        throw new MissingEditorProp(field) // while we allow disabling editor functionality, you should not have any richText fields defined if you do not have an editor
                        ;
                    }
                }
                if (typeof field.editor === 'function') {
                    field.editor = await field.editor({
                        config: _config,
                        isRoot: requireFieldLevelRichTextEditor
                    });
                }
                if (field.editor.i18n && Object.keys(field.editor.i18n).length >= 0) {
                    config.i18n.translations = deepMerge(config.i18n.translations, field.editor.i18n);
                }
            };
            if (richTextSanitizationPromises) {
                richTextSanitizationPromises.push(sanitizeRichText);
            } else {
                await sanitizeRichText(config);
            }
        }
        if ('fields' in field && field.fields) {
            field.fields = await sanitizeFields({
                config,
                existingFieldNames: fieldAffectsData(field) ? new Set() : existingFieldNames,
                fields: field.fields,
                requireFieldLevelRichTextEditor,
                richTextSanitizationPromises,
                validRelationships
            });
        }
        if (field.type === 'tabs') {
            for(let j = 0; j < field.tabs.length; j++){
                const tab = field.tabs[j];
                if (tabHasName(tab) && typeof tab.label === 'undefined') {
                    tab.label = toWords(tab.name);
                }
                tab.fields = await sanitizeFields({
                    config,
                    existingFieldNames: tabHasName(tab) ? new Set() : existingFieldNames,
                    fields: tab.fields,
                    requireFieldLevelRichTextEditor,
                    richTextSanitizationPromises,
                    validRelationships
                });
                field.tabs[j] = tab;
            }
        }
        if ('blocks' in field && field.blocks) {
            for(let j = 0; j < field.blocks.length; j++){
                const block = field.blocks[j];
                block.labels = !block.labels ? formatLabels(block.slug) : block.labels;
                block.fields = await sanitizeFields({
                    config,
                    existingFieldNames: new Set(),
                    fields: block.fields,
                    requireFieldLevelRichTextEditor,
                    richTextSanitizationPromises,
                    validRelationships
                });
                field.blocks[j] = block;
            }
        }
        fields[i] = field;
    }
    return fields;
};

//# sourceMappingURL=sanitize.js.map