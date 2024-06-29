import { asc, desc } from 'drizzle-orm';
import { getTableColumnFromPath } from './getTableColumnFromPath.js';
import { parseParams } from './parseParams.js';
const buildQuery = async function buildQuery({ adapter, fields, locale, sort, tableName, where: incomingWhere }) {
    const selectFields = {
        id: adapter.tables[tableName].id
    };
    const joins = [];
    const orderBy = {
        column: null,
        order: null
    };
    if (sort) {
        let sortPath;
        if (sort[0] === '-') {
            sortPath = sort.substring(1);
            orderBy.order = desc;
        } else {
            sortPath = sort;
            orderBy.order = asc;
        }
        try {
            const { columnName: sortTableColumnName, table: sortTable } = getTableColumnFromPath({
                adapter,
                collectionPath: sortPath,
                fields,
                joins,
                locale,
                pathSegments: sortPath.replace(/__/g, '.').split('.'),
                selectFields,
                tableName,
                value: sortPath
            });
            orderBy.column = sortTable?.[sortTableColumnName];
        } catch (err) {
        // continue
        }
    }
    if (!orderBy?.column) {
        orderBy.order = desc;
        const createdAt = adapter.tables[tableName]?.createdAt;
        if (createdAt) {
            orderBy.column = createdAt;
        } else {
            orderBy.column = adapter.tables[tableName].id;
        }
    }
    if (orderBy.column) {
        selectFields.sort = orderBy.column;
    }
    let where;
    if (incomingWhere && Object.keys(incomingWhere).length > 0) {
        where = await parseParams({
            adapter,
            fields,
            joins,
            locale,
            selectFields,
            tableName,
            where: incomingWhere
        });
    }
    return {
        joins,
        orderBy,
        selectFields,
        where
    };
};
export default buildQuery;

//# sourceMappingURL=buildQuery.js.map