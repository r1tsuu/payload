import { traverseFields } from './traverseFields.js';
// Generate the Drizzle query for findMany based on
// a collection field structure
export const buildFindManyArgs = ({ adapter, depth, fields, tableName })=>{
    const result = {
        with: {}
    };
    const _locales = {
        columns: {
            id: false,
            _parentID: false
        },
        with: {}
    };
    if (adapter.tables[`${tableName}_texts`]) {
        result.with._texts = {
            columns: {
                id: false,
                parent: false
            },
            orderBy: ({ order }, { asc: ASC })=>[
                    ASC(order)
                ]
        };
    }
    if (adapter.tables[`${tableName}_numbers`]) {
        result.with._numbers = {
            columns: {
                id: false,
                parent: false
            },
            orderBy: ({ order }, { asc: ASC })=>[
                    ASC(order)
                ]
        };
    }
    if (adapter.tables[`${tableName}${adapter.relationshipsSuffix}`]) {
        result.with._rels = {
            columns: {
                id: false,
                parent: false
            },
            orderBy: ({ order }, { asc: ASC })=>[
                    ASC(order)
                ]
        };
    }
    if (adapter.tables[`${tableName}${adapter.localesSuffix}`]) {
        result.with._locales = _locales;
    }
    traverseFields({
        _locales,
        adapter,
        currentArgs: result,
        currentTableName: tableName,
        depth,
        fields,
        path: '',
        topLevelArgs: result,
        topLevelTableName: tableName
    });
    return result;
};

//# sourceMappingURL=buildFindManyArgs.js.map