import { numeric, serial, uuid, varchar } from 'drizzle-orm/pg-core';
import { flattenTopLevelFields } from 'payload';
import { fieldAffectsData } from 'payload/shared';
export const setColumnID = ({ adapter, columns, fields })=>{
    const idField = flattenTopLevelFields(fields).find((field)=>fieldAffectsData(field) && field.name === 'id');
    if (idField) {
        if (idField.type === 'number') {
            columns.id = numeric('id').primaryKey();
            return 'numeric';
        }
        if (idField.type === 'text') {
            columns.id = varchar('id').primaryKey();
            return 'varchar';
        }
    }
    if (adapter.idType === 'uuid') {
        columns.id = uuid('id').defaultRandom().primaryKey();
        return 'uuid';
    }
    columns.id = serial('id').primaryKey();
    return 'integer';
};

//# sourceMappingURL=setColumnID.js.map