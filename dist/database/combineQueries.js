import { hasWhereAccessResult } from '../auth/index.js';
export const combineQueries = (where, access)=>{
    if (!where && !access) return {};
    const result = {
        and: []
    };
    if (where) result.and.push(where);
    if (hasWhereAccessResult(access)) result.and.push(access);
    return result;
};

//# sourceMappingURL=combineQueries.js.map