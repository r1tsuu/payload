/* eslint-disable no-param-reassign */ import { fieldAffectsData } from 'payload/shared';
import { transformHasManyNumber } from './hasManyNumber.js';
import { transformHasManyText } from './hasManyText.js';
import { transformRelationship } from './relationship.js';
// Traverse fields recursively, transforming data
// for each field type into required Payload shape
export const traverseFields = ({ adapter, blocks, config, dataRef, deletions, fieldPrefix, fields, numbers, path, relationships, table, texts })=>{
    const sanitizedPath = path ? `${path}.` : path;
    const formatted = fields.reduce((result, field)=>{
        if (field.type === 'tabs') {
            traverseFields({
                adapter,
                blocks,
                config,
                dataRef,
                deletions,
                fieldPrefix,
                fields: field.tabs.map((tab)=>({
                        ...tab,
                        type: 'tab'
                    })),
                numbers,
                path,
                relationships,
                table,
                texts
            });
        }
        if (field.type === 'collapsible' || field.type === 'row' || field.type === 'tab' && !('name' in field)) {
            traverseFields({
                adapter,
                blocks,
                config,
                dataRef,
                deletions,
                fieldPrefix,
                fields: field.fields,
                numbers,
                path,
                relationships,
                table,
                texts
            });
        }
        if (fieldAffectsData(field)) {
            if ('dbStore' in field && !field.dbStore) return result;
            const fieldName = `${fieldPrefix || ''}${field.name}`;
            const fieldData = table[fieldName];
            const localizedFieldData = {};
            const valuesToTransform = [];
            if (fieldPrefix) {
                deletions.push(()=>delete table[fieldName]);
            }
            if ('dbJsonColumn' in field && field.dbJsonColumn) {
                result[field.name] = table[`${fieldPrefix || ''}${field.name}`];
                return result;
            }
            if (field.type === 'array') {
                if (Array.isArray(fieldData)) {
                    if (field.localized) {
                        result[field.name] = fieldData.reduce((arrayResult, row)=>{
                            if (typeof row._locale === 'string') {
                                if (!arrayResult[row._locale]) arrayResult[row._locale] = [];
                                const locale = row._locale;
                                const data = {};
                                delete row._locale;
                                if (row._uuid) {
                                    row.id = row._uuid;
                                    delete row._uuid;
                                }
                                const rowResult = traverseFields({
                                    adapter,
                                    blocks,
                                    config,
                                    dataRef: data,
                                    deletions,
                                    fieldPrefix: '',
                                    fields: field.fields,
                                    numbers,
                                    path: `${sanitizedPath}${field.name}.${row._order - 1}`,
                                    relationships,
                                    table: row,
                                    texts
                                });
                                if ('_order' in rowResult) {
                                    delete rowResult._order;
                                }
                                arrayResult[locale].push(rowResult);
                            }
                            return arrayResult;
                        }, {});
                    } else {
                        result[field.name] = fieldData.map((row, i)=>{
                            if (row._uuid) {
                                row.id = row._uuid;
                                delete row._uuid;
                            }
                            if ('_order' in row) {
                                delete row._order;
                            }
                            return traverseFields({
                                adapter,
                                blocks,
                                config,
                                dataRef: row,
                                deletions,
                                fieldPrefix: '',
                                fields: field.fields,
                                numbers,
                                path: `${sanitizedPath}${field.name}.${i}`,
                                relationships,
                                table: row,
                                texts
                            });
                        });
                    }
                }
                return result;
            }
            if (field.type === 'blocks') {
                const blockFieldPath = `${sanitizedPath}${field.name}`;
                if (Array.isArray(blocks[blockFieldPath])) {
                    if (field.localized) {
                        result[field.name] = {};
                        blocks[blockFieldPath].forEach((row)=>{
                            if (row._uuid) {
                                row.id = row._uuid;
                                delete row._uuid;
                            }
                            if (typeof row._locale === 'string') {
                                if (!result[field.name][row._locale]) result[field.name][row._locale] = [];
                                result[field.name][row._locale].push(row);
                                delete row._locale;
                            }
                        });
                        Object.entries(result[field.name]).forEach(([locale, localizedBlocks])=>{
                            result[field.name][locale] = localizedBlocks.map((row)=>{
                                const block = field.blocks.find(({ slug })=>slug === row.blockType);
                                if (block) {
                                    const blockResult = traverseFields({
                                        adapter,
                                        blocks,
                                        config,
                                        dataRef: row,
                                        deletions,
                                        fieldPrefix: '',
                                        fields: block.fields,
                                        numbers,
                                        path: `${blockFieldPath}.${row._order - 1}`,
                                        relationships,
                                        table: row,
                                        texts
                                    });
                                    delete blockResult._order;
                                    return blockResult;
                                }
                                return {};
                            });
                        });
                    } else {
                        result[field.name] = blocks[blockFieldPath].map((row, i)=>{
                            delete row._order;
                            if (row._uuid) {
                                row.id = row._uuid;
                                delete row._uuid;
                            }
                            const block = field.blocks.find(({ slug })=>slug === row.blockType);
                            if (block) {
                                return traverseFields({
                                    adapter,
                                    blocks,
                                    config,
                                    dataRef: row,
                                    deletions,
                                    fieldPrefix: '',
                                    fields: block.fields,
                                    numbers,
                                    path: `${blockFieldPath}.${i}`,
                                    relationships,
                                    table: row,
                                    texts
                                });
                            }
                            return {};
                        });
                    }
                }
                return result;
            }
            if (field.type === 'relationship' || field.type === 'upload') {
                if (typeof field.relationTo === 'string' && !('hasMany' in field && field.hasMany)) {
                    if (field.localized && config.localization && config.localization.locales && Array.isArray(table?._locales)) {
                        table._locales.forEach((localeRow)=>{
                            result[field.name] = {
                                [localeRow._locale]: localeRow[fieldName]
                            };
                        });
                    } else {
                        valuesToTransform.push({
                            ref: result,
                            table
                        });
                    }
                } else {
                    const relationPathMatch = relationships[`${sanitizedPath}${field.name}`];
                    if (!relationPathMatch) {
                        if ('hasMany' in field && field.hasMany) {
                            if (field.localized && config.localization && config.localization.locales) {
                                result[field.name] = {
                                    [config.localization.defaultLocale]: []
                                };
                            } else {
                                result[field.name] = [];
                            }
                        }
                        return result;
                    }
                    if (field.localized) {
                        result[field.name] = {};
                        const relationsByLocale = {};
                        relationPathMatch.forEach((row)=>{
                            if (typeof row.locale === 'string') {
                                if (!relationsByLocale[row.locale]) relationsByLocale[row.locale] = [];
                                relationsByLocale[row.locale].push(row);
                            }
                        });
                        Object.entries(relationsByLocale).forEach(([locale, relations])=>{
                            transformRelationship({
                                field,
                                locale,
                                ref: result,
                                relations
                            });
                        });
                    } else {
                        transformRelationship({
                            field,
                            ref: result,
                            relations: relationPathMatch
                        });
                    }
                    return result;
                }
            }
            if (field.type === 'text' && field?.hasMany) {
                const textPathMatch = texts[`${sanitizedPath}${field.name}`];
                if (!textPathMatch) return result;
                if (field.localized) {
                    result[field.name] = {};
                    const textsByLocale = {};
                    textPathMatch.forEach((row)=>{
                        if (typeof row.locale === 'string') {
                            if (!textsByLocale[row.locale]) textsByLocale[row.locale] = [];
                            textsByLocale[row.locale].push(row);
                        }
                    });
                    Object.entries(textsByLocale).forEach(([locale, texts])=>{
                        transformHasManyText({
                            field,
                            locale,
                            ref: result,
                            textRows: texts
                        });
                    });
                } else {
                    transformHasManyText({
                        field,
                        ref: result,
                        textRows: textPathMatch
                    });
                }
                return result;
            }
            if (field.type === 'number' && field.hasMany) {
                const numberPathMatch = numbers[`${sanitizedPath}${field.name}`];
                if (!numberPathMatch) return result;
                if (field.localized) {
                    result[field.name] = {};
                    const numbersByLocale = {};
                    numberPathMatch.forEach((row)=>{
                        if (typeof row.locale === 'string') {
                            if (!numbersByLocale[row.locale]) numbersByLocale[row.locale] = [];
                            numbersByLocale[row.locale].push(row);
                        }
                    });
                    Object.entries(numbersByLocale).forEach(([locale, numbers])=>{
                        transformHasManyNumber({
                            field,
                            locale,
                            numberRows: numbers,
                            ref: result
                        });
                    });
                } else {
                    transformHasManyNumber({
                        field,
                        numberRows: numberPathMatch,
                        ref: result
                    });
                }
                return result;
            }
            if (field.type === 'select' && field.hasMany) {
                if (Array.isArray(fieldData)) {
                    if (field.localized) {
                        result[field.name] = fieldData.reduce((selectResult, row)=>{
                            if (typeof row.locale === 'string') {
                                if (!selectResult[row.locale]) selectResult[row.locale] = [];
                                selectResult[row.locale].push(row.value);
                            }
                            return selectResult;
                        }, {});
                    } else {
                        result[field.name] = fieldData.map(({ value })=>value);
                    }
                }
                return result;
            }
            if (field.localized && Array.isArray(table._locales)) {
                table._locales.forEach((localeRow)=>{
                    valuesToTransform.push({
                        ref: localizedFieldData,
                        table: localeRow
                    });
                });
            } else {
                valuesToTransform.push({
                    ref: result,
                    table
                });
            }
            valuesToTransform.forEach(({ ref, table })=>{
                const fieldData = table[`${fieldPrefix || ''}${field.name}`];
                const locale = table?._locale;
                let val = fieldData;
                switch(field.type){
                    case 'tab':
                    case 'group':
                        {
                            const groupFieldPrefix = `${fieldPrefix || ''}${field.name}_`;
                            if (field.localized) {
                                if (typeof locale === 'string' && !ref[locale]) {
                                    ref[locale] = {};
                                    delete table._locale;
                                }
                                Object.entries(ref).forEach(([groupLocale, groupLocaleData])=>{
                                    ref[groupLocale] = traverseFields({
                                        adapter,
                                        blocks,
                                        config,
                                        dataRef: groupLocaleData,
                                        deletions,
                                        fieldPrefix: groupFieldPrefix,
                                        fields: field.fields,
                                        numbers,
                                        path: `${sanitizedPath}${field.name}`,
                                        relationships,
                                        table,
                                        texts
                                    });
                                });
                                if ('_order' in ref) {
                                    delete ref._order;
                                }
                            } else {
                                const groupData = {};
                                ref[field.name] = traverseFields({
                                    adapter,
                                    blocks,
                                    config,
                                    dataRef: groupData,
                                    deletions,
                                    fieldPrefix: groupFieldPrefix,
                                    fields: field.fields,
                                    numbers,
                                    path: `${sanitizedPath}${field.name}`,
                                    relationships,
                                    table,
                                    texts
                                });
                                if ('_order' in ref) {
                                    delete ref._order;
                                }
                            }
                            return;
                        }
                    case 'text':
                        {
                            if (typeof fieldData === 'string') {
                                val = String(fieldData);
                            }
                            break;
                        }
                    case 'number':
                        {
                            if (typeof fieldData === 'string') {
                                val = Number.parseFloat(fieldData);
                            }
                            break;
                        }
                    case 'date':
                        {
                            if (fieldData instanceof Date) {
                                val = fieldData.toISOString();
                            }
                            if (typeof fieldData === 'string') {
                                val = new Date(fieldData).toISOString();
                            }
                            break;
                        }
                    case 'relationship':
                    case 'upload':
                        {
                            if (val && typeof field.relationTo === 'string' && adapter.payload.collections[field.relationTo].customIDType === 'number') {
                                val = Number(val);
                            }
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
                if (typeof locale === 'string') {
                    ref[locale] = val;
                } else {
                    result[field.name] = val;
                }
            });
            if (Object.keys(localizedFieldData).length > 0) {
                result[field.name] = localizedFieldData;
            }
            return result;
        }
        return result;
    }, dataRef);
    if (Array.isArray(table._locales)) {
        deletions.push(()=>delete table._locales);
    }
    return formatted;
};

//# sourceMappingURL=traverseFields.js.map