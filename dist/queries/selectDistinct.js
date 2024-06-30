import { chainMethods } from '../find/chainMethods.js';
/**
 * Selects distinct records from a table only if there are joins that need to be used, otherwise return null
 */ export const selectDistinct = ({ adapter, chainedMethods = [], db, joins, selectFields, tableName, where })=>{
    if (Object.keys(joins).length > 0) {
        if (where) {
            chainedMethods.push({
                args: [
                    where
                ],
                method: 'where'
            });
        }
        joins.forEach(({ condition, table })=>{
            chainedMethods.push({
                args: [
                    table,
                    condition
                ],
                method: 'leftJoin'
            });
        });
        return chainMethods({
            methods: chainedMethods,
            query: db.selectDistinct(selectFields).from(adapter.tables[tableName])
        });
    }
};

//# sourceMappingURL=selectDistinct.js.map