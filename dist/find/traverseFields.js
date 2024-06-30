/* eslint-disable no-param-reassign */ import { fieldAffectsData, tabHasName } from 'payload/shared';
import toSnakeCase from 'to-snake-case';
export const traverseFields = ({ _locales, adapter, currentArgs, currentTableName, depth, fields, path, topLevelArgs, topLevelTableName })=>{
    fields.forEach((field)=>{
        if ('dbStore' in field && !field.dbStore) return;
        // handle simple relationship
        if (depth > 0 && (field.type === 'upload' || field.type === 'relationship' && !field.hasMany && typeof field.relationTo === 'string')) {
            if (field.localized) {
                _locales.with[`${path}${field.name}`] = true;
            } else {
                currentArgs.with[`${path}${field.name}`] = true;
            }
        }
        if (field.type === 'collapsible' || field.type === 'row') {
            traverseFields({
                _locales,
                adapter,
                currentArgs,
                currentTableName,
                depth,
                fields: field.fields,
                path,
                topLevelArgs,
                topLevelTableName
            });
            return;
        }
        if (field.type === 'tabs') {
            field.tabs.forEach((tab)=>{
                const tabPath = tabHasName(tab) ? `${path}${tab.name}_` : path;
                traverseFields({
                    _locales,
                    adapter,
                    currentArgs,
                    currentTableName,
                    depth,
                    fields: tab.fields,
                    path: tabPath,
                    topLevelArgs,
                    topLevelTableName
                });
            });
            return;
        }
        if (fieldAffectsData(field)) {
            switch(field.type){
                case 'array':
                    {
                        if (field.dbJsonColumn) break;
                        const withArray = {
                            columns: {
                                _parentID: false
                            },
                            orderBy: ({ _order }, { asc })=>[
                                    asc(_order)
                                ],
                            with: {}
                        };
                        const arrayTableName = adapter.tableNameMap.get(`${currentTableName}_${path}${toSnakeCase(field.name)}`);
                        const arrayTableNameWithLocales = `${arrayTableName}${adapter.localesSuffix}`;
                        if (adapter.tables[arrayTableNameWithLocales]) {
                            withArray.with._locales = {
                                columns: {
                                    id: false,
                                    _parentID: false
                                },
                                with: {}
                            };
                        }
                        currentArgs.with[`${path}${field.name}`] = withArray;
                        traverseFields({
                            _locales: withArray.with._locales,
                            adapter,
                            currentArgs: withArray,
                            currentTableName: arrayTableName,
                            depth,
                            fields: field.fields,
                            path: '',
                            topLevelArgs,
                            topLevelTableName
                        });
                        break;
                    }
                case 'select':
                    {
                        if (field.dbJsonColumn) break;
                        if (field.hasMany) {
                            const withSelect = {
                                columns: {
                                    id: false,
                                    order: false,
                                    parent: false
                                },
                                orderBy: ({ order }, { asc })=>[
                                        asc(order)
                                    ]
                            };
                            currentArgs.with[`${path}${field.name}`] = withSelect;
                        }
                        break;
                    }
                case 'blocks':
                    if (field.dbJsonColumn) break;
                    field.blocks.forEach((block)=>{
                        const blockKey = `_blocks_${block.slug}`;
                        if (!topLevelArgs[blockKey]) {
                            const withBlock = {
                                columns: {
                                    _parentID: false
                                },
                                orderBy: ({ _order }, { asc })=>[
                                        asc(_order)
                                    ],
                                with: {}
                            };
                            const tableName = adapter.tableNameMap.get(`${topLevelTableName}_blocks_${toSnakeCase(block.slug)}`);
                            if (adapter.tables[`${tableName}${adapter.localesSuffix}`]) {
                                withBlock.with._locales = {
                                    with: {}
                                };
                            }
                            topLevelArgs.with[blockKey] = withBlock;
                            traverseFields({
                                _locales: withBlock.with._locales,
                                adapter,
                                currentArgs: withBlock,
                                currentTableName: tableName,
                                depth,
                                fields: block.fields,
                                path: '',
                                topLevelArgs,
                                topLevelTableName
                            });
                        }
                    });
                    break;
                case 'group':
                    if (field.dbJsonColumn) break;
                    traverseFields({
                        _locales,
                        adapter,
                        currentArgs,
                        currentTableName,
                        depth,
                        fields: field.fields,
                        path: `${path}${field.name}_`,
                        topLevelArgs,
                        topLevelTableName
                    });
                    break;
                default:
                    {
                        break;
                    }
            }
        }
    });
    return topLevelArgs;
};

//# sourceMappingURL=traverseFields.js.map