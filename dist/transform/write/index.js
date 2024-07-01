/* eslint-disable no-param-reassign */ import { traverseFields } from './traverseFields.js';
export const transformForWrite = ({ adapter, data, fields, path = '', tableName })=>{
    // Split out the incoming data into rows to insert / delete
    const rowToInsert = {
        arrays: {},
        blocks: {},
        blocksToDelete: new Set(),
        locales: {},
        numbers: [],
        relationships: [],
        relationshipsToDelete: [],
        row: {},
        selects: {},
        texts: []
    };
    // This function is responsible for building up the
    // above rowToInsert
    traverseFields({
        adapter,
        arrays: rowToInsert.arrays,
        baseTableName: tableName,
        blocks: rowToInsert.blocks,
        blocksToDelete: rowToInsert.blocksToDelete,
        columnPrefix: '',
        data,
        fieldPrefix: '',
        fields,
        locales: rowToInsert.locales,
        numbers: rowToInsert.numbers,
        parentTableName: tableName,
        path,
        relationships: rowToInsert.relationships,
        relationshipsToDelete: rowToInsert.relationshipsToDelete,
        row: rowToInsert.row,
        selects: rowToInsert.selects,
        texts: rowToInsert.texts
    });
    return rowToInsert;
};

//# sourceMappingURL=index.js.map