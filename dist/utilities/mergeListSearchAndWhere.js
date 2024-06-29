import { fieldAffectsData } from '../fields/config/types.js';
import { default as flattenTopLevelFields } from './flattenTopLevelFields.js';
const hoistQueryParamsToAnd = (where, queryParams)=>{
    if ('and' in where) {
        where.and.push(queryParams);
    } else if ('or' in where) {
        where = {
            and: [
                where,
                queryParams
            ]
        };
    } else {
        where = {
            and: [
                where,
                queryParams
            ]
        };
    }
    return where;
};
const getTitleField = (collection)=>{
    const { admin: { useAsTitle }, fields } = collection;
    const topLevelFields = flattenTopLevelFields(fields);
    return topLevelFields.find((field)=>fieldAffectsData(field) && field.name === useAsTitle);
};
export const mergeListSearchAndWhere = ({ collectionConfig, query })=>{
    const search = query?.search || undefined;
    let where = query?.where || undefined;
    if (search) {
        let copyOfWhere = {
            ...where || {}
        };
        const searchAsConditions = (collectionConfig.admin.listSearchableFields || [
            getTitleField(collectionConfig)?.name || 'id'
        ]).map((fieldName)=>{
            return {
                [fieldName]: {
                    like: search
                }
            };
        }, []);
        if (searchAsConditions.length > 0) {
            const conditionalSearchFields = {
                or: [
                    ...searchAsConditions
                ]
            };
            copyOfWhere = hoistQueryParamsToAnd(copyOfWhere, conditionalSearchFields);
        }
        where = copyOfWhere;
    }
    return where;
};

//# sourceMappingURL=mergeListSearchAndWhere.js.map