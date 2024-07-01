import { convertPathToJSONTraversal } from './convertPathToJSONTraversal.js';
import { formatJSONPathSegment } from './formatJSONPathSegment.js';
const operatorMap = {
    contains: '~*',
    equals: '=',
    like: '~*'
};
const fromArray = ({ isRoot, operator, pathSegments, treatAsArray, value })=>{
    const newPathSegments = pathSegments.slice(isRoot ? 1 : 2);
    const alias = `${pathSegments[isRoot ? 0 : 1]}_alias_${newPathSegments.length}`;
    newPathSegments.unshift(alias);
    const arrayElements = isRoot ? pathSegments[0] : `${pathSegments[0]} -> ${formatJSONPathSegment(pathSegments[1])}`;
    return `EXISTS (
    SELECT 1
    FROM jsonb_array_elements(${arrayElements}) AS ${alias}
    WHERE ${createJSONQuery({
        operator,
        pathSegments: newPathSegments,
        treatAsArray,
        value
    })}
  )`;
};
const createConstraint = ({ operator, pathSegments, value })=>{
    const jsonQuery = convertPathToJSONTraversal(pathSegments);
    return `${pathSegments[0]}${jsonQuery} ${operatorMap[operator]} '${value}'`;
};
export const createJSONQuery = ({ operator, pathSegments, treatAsArray, treatRootAsArray, value })=>{
    if (treatRootAsArray) {
        return fromArray({
            isRoot: true,
            operator,
            pathSegments,
            treatAsArray,
            value
        });
    }
    if (treatAsArray.includes(pathSegments[1])) {
        return fromArray({
            operator,
            pathSegments,
            treatAsArray,
            value
        });
    }
    return createConstraint({
        operator,
        pathSegments,
        treatAsArray,
        value
    });
};

//# sourceMappingURL=index.js.map