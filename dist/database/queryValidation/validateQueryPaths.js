/* eslint-disable no-restricted-syntax */ import { QueryError } from '../../errors/QueryError.js';
import { validOperators } from '../../types/constants.js';
import { deepCopyObject } from '../../utilities/deepCopyObject.js';
import flattenFields from '../../utilities/flattenTopLevelFields.js';
import { validateSearchParam } from './validateSearchParams.js';
const flattenWhere = (query)=>Object.entries(query).reduce((flattenedConstraints, [key, val])=>{
        if ((key === 'and' || key === 'or') && Array.isArray(val)) {
            const subWhereConstraints = val.reduce((acc, subVal)=>{
                const subWhere = flattenWhere(subVal);
                return [
                    ...acc,
                    ...subWhere
                ];
            }, []);
            return [
                ...flattenedConstraints,
                ...subWhereConstraints
            ];
        }
        return [
            ...flattenedConstraints,
            {
                [key]: val
            }
        ];
    }, []);
export async function validateQueryPaths({ collectionConfig, errors = [], globalConfig, overrideAccess, policies = {
    collections: {},
    globals: {}
}, req, versionFields, where }) {
    const fields = flattenFields(versionFields || (globalConfig || collectionConfig).fields);
    if (typeof where === 'object') {
        const whereFields = flattenWhere(where);
        // We need to determine if the whereKey is an AND, OR, or a schema path
        const promises = [];
        whereFields.map(async (constraint)=>{
            Object.keys(constraint).map(async (path)=>{
                Object.entries(constraint[path]).map(async ([operator, val])=>{
                    if (validOperators.includes(operator)) {
                        promises.push(validateSearchParam({
                            collectionConfig: deepCopyObject(collectionConfig),
                            errors,
                            fields: fields,
                            globalConfig: deepCopyObject(globalConfig),
                            operator,
                            overrideAccess,
                            path,
                            policies,
                            req,
                            val,
                            versionFields
                        }));
                    }
                });
            });
        });
        await Promise.all(promises);
        if (errors.length > 0) {
            throw new QueryError(errors);
        }
    }
}

//# sourceMappingURL=validateQueryPaths.js.map