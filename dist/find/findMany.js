import { inArray, sql } from 'drizzle-orm';
import buildQuery from '../queries/buildQuery.js';
import { selectDistinct } from '../queries/selectDistinct.js';
import { transform } from '../transform/read/index.js';
import { buildFindManyArgs } from './buildFindManyArgs.js';
import { chainMethods } from './chainMethods.js';
export const findMany = async function find({ adapter, fields, limit: limitArg, locale, page = 1, pagination, req = {}, skip, sort, tableName, where: whereArg }) {
    const db = adapter.sessions[req.transactionID]?.db || adapter.drizzle;
    const table = adapter.tables[tableName];
    const limit = limitArg ?? 10;
    let totalDocs;
    let totalPages;
    let hasPrevPage;
    let hasNextPage;
    let pagingCounter;
    const { joins, orderBy, selectFields, where } = await buildQuery({
        adapter,
        fields,
        locale,
        sort,
        tableName,
        where: whereArg
    });
    const orderedIDMap = {};
    let orderedIDs;
    const selectDistinctMethods = [];
    if (orderBy?.order && orderBy?.column) {
        selectDistinctMethods.push({
            args: [
                orderBy.order(orderBy.column)
            ],
            method: 'orderBy'
        });
    }
    const findManyArgs = buildFindManyArgs({
        adapter,
        depth: 0,
        fields,
        tableName
    });
    selectDistinctMethods.push({
        args: [
            skip || (page - 1) * limit
        ],
        method: 'offset'
    });
    selectDistinctMethods.push({
        args: [
            limit === 0 ? undefined : limit
        ],
        method: 'limit'
    });
    const selectDistinctResult = await selectDistinct({
        adapter,
        chainedMethods: selectDistinctMethods,
        db,
        joins,
        selectFields,
        tableName,
        where
    });
    if (selectDistinctResult) {
        if (selectDistinctResult.length === 0) {
            return {
                docs: [],
                hasNextPage: false,
                hasPrevPage: false,
                limit,
                nextPage: null,
                page: 1,
                pagingCounter: 0,
                prevPage: null,
                totalDocs: 0,
                totalPages: 0
            };
        } else {
            // set the id in an object for sorting later
            selectDistinctResult.forEach(({ id }, i)=>{
                orderedIDMap[id] = i;
            });
            orderedIDs = Object.keys(orderedIDMap);
            findManyArgs.where = inArray(adapter.tables[tableName].id, orderedIDs);
        }
    } else {
        findManyArgs.limit = limitArg === 0 ? undefined : limitArg;
        const offset = skip || (page - 1) * limitArg;
        if (!Number.isNaN(offset)) findManyArgs.offset = offset;
        if (where) {
            findManyArgs.where = where;
        }
        findManyArgs.orderBy = orderBy.order(orderBy.column);
    }
    const findPromise = db.query[tableName].findMany(findManyArgs);
    if (pagination !== false && (orderedIDs ? orderedIDs?.length <= limit : true)) {
        const selectCountMethods = [];
        joins.forEach(({ condition, table })=>{
            selectCountMethods.push({
                args: [
                    table,
                    condition
                ],
                method: 'leftJoin'
            });
        });
        const countResult = await chainMethods({
            methods: selectCountMethods,
            query: db.select({
                count: sql`count
            (DISTINCT ${adapter.tables[tableName].id})`
            }).from(table).where(where)
        });
        totalDocs = Number(countResult[0].count);
        totalPages = typeof limit === 'number' && limit !== 0 ? Math.ceil(totalDocs / limit) : 1;
        hasPrevPage = page > 1;
        hasNextPage = totalPages > page;
        pagingCounter = (page - 1) * limit + 1;
    }
    const rawDocs = await findPromise;
    // sort rawDocs from selectQuery
    if (Object.keys(orderedIDMap).length > 0) {
        rawDocs.sort((a, b)=>orderedIDMap[a.id] - orderedIDMap[b.id]);
    }
    if (pagination === false || !totalDocs) {
        totalDocs = rawDocs.length;
        totalPages = 1;
        pagingCounter = 1;
        hasPrevPage = false;
        hasNextPage = false;
    }
    const docs = rawDocs.map((data)=>{
        return transform({
            adapter,
            config: adapter.payload.config,
            data,
            fields
        });
    });
    return {
        docs,
        hasNextPage,
        hasPrevPage,
        limit,
        nextPage: hasNextPage ? page + 1 : null,
        page,
        pagingCounter,
        prevPage: hasPrevPage ? page - 1 : null,
        totalDocs,
        totalPages
    };
};

//# sourceMappingURL=findMany.js.map