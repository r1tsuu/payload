/* eslint-disable no-param-reassign */ export const insertArrays = async ({ adapter, arrays, db, parentRows })=>{
    // Maintain a map of flattened rows by table
    const rowsByTable = {};
    arrays.forEach((arraysByTable, parentRowIndex)=>{
        Object.entries(arraysByTable).forEach(([tableName, arrayRows])=>{
            // If the table doesn't exist in map, initialize it
            if (!rowsByTable[tableName]) {
                rowsByTable[tableName] = {
                    arrays: [],
                    locales: [],
                    rows: []
                };
            }
            const parentID = parentRows[parentRowIndex].id;
            // Add any sub arrays that need to be created
            // We will call this recursively below
            arrayRows.forEach((arrayRow, i)=>{
                if (Object.keys(arrayRow.arrays).length > 0) {
                    rowsByTable[tableName].arrays.push(arrayRow.arrays);
                }
                // Set up parent IDs for both row and locale row
                arrayRow.row._parentID = parentID;
                rowsByTable[tableName].rows.push(arrayRow.row);
                Object.entries(arrayRow.locales).forEach(([arrayRowLocale, arrayRowLocaleData])=>{
                    arrayRowLocaleData._parentID = arrayRow.row.id;
                    arrayRowLocaleData._locale = arrayRowLocale;
                    rowsByTable[tableName].locales.push(arrayRowLocaleData);
                    if (!arrayRow.row.id) {
                        arrayRowLocaleData._getParentID = (rows)=>rows[i].id;
                    }
                });
            });
        });
    });
    // Insert all corresponding arrays
    // (one insert per array table)
    for (const [tableName, row] of Object.entries(rowsByTable)){
        // the nested arrays need the ID for the parentID foreign key
        let insertedRows;
        if (row.rows.length > 0) {
            insertedRows = await db.insert(adapter.tables[tableName]).values(row.rows).returning();
        }
        // Insert locale rows
        if (adapter.tables[`${tableName}${adapter.localesSuffix}`] && row.locales.length > 0) {
            if (!row.locales[0]._parentID) {
                row.locales = row.locales.map((localeRow)=>{
                    if (typeof localeRow._getParentID === 'function') {
                        localeRow._parentID = localeRow._getParentID(insertedRows);
                        delete localeRow._getParentID;
                    }
                    return localeRow;
                });
            }
            await db.insert(adapter.tables[`${tableName}${adapter.localesSuffix}`]).values(row.locales).returning();
        }
        // If there are sub arrays, call this function recursively
        if (row.arrays.length > 0) {
            await insertArrays({
                adapter,
                arrays: row.arrays,
                db,
                parentRows: insertedRows
            });
        }
    }
};

//# sourceMappingURL=insertArrays.js.map