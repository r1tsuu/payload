/* eslint-disable no-param-reassign */ import { isArrayOfRows } from '../../utilities/isArrayOfRows.js';
import { traverseFields } from './traverseFields.js';
export const transformArray = ({ adapter, arrayTableName, baseTableName, blocks, blocksToDelete, data, field, locale, numbers, path, relationships, relationshipsToDelete, selects, texts })=>{
    const newRows = [];
    const hasUUID = adapter.tables[arrayTableName]._uuid;
    if (isArrayOfRows(data)) {
        data.forEach((arrayRow, i)=>{
            const newRow = {
                arrays: {},
                locales: {},
                row: {
                    _order: i + 1
                }
            };
            // If we have declared a _uuid field on arrays,
            // that means the ID has to be unique,
            // and our ids within arrays are not unique.
            // So move the ID to a uuid field for storage
            // and allow the database to generate a serial id automatically
            if (hasUUID) {
                newRow.row._uuid = arrayRow.id;
                delete arrayRow.id;
            }
            if (locale) {
                newRow.locales[locale] = {
                    _locale: locale
                };
            }
            if (field.localized) {
                newRow.row._locale = locale;
            }
            traverseFields({
                adapter,
                arrays: newRow.arrays,
                baseTableName,
                blocks,
                blocksToDelete,
                columnPrefix: '',
                data: arrayRow,
                fieldPrefix: '',
                fields: field.fields,
                locales: newRow.locales,
                numbers,
                parentTableName: arrayTableName,
                path: `${path || ''}${field.name}.${i}.`,
                relationships,
                relationshipsToDelete,
                row: newRow.row,
                selects,
                texts
            });
            newRows.push(newRow);
        });
    }
    return newRows;
};

//# sourceMappingURL=array.js.map