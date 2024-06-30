import { parseParams } from './parseParams.js';
export async function buildAndOrConditions({ adapter, fields, joins, locale, selectFields, tableName, where }) {
    const completedConditions = [];
    // Loop over all AND / OR operations and add them to the AND / OR query param
    // Operations should come through as an array
    // eslint-disable-next-line no-restricted-syntax
    for (const condition of where){
        // If the operation is properly formatted as an object
        if (typeof condition === 'object') {
            // eslint-disable-next-line no-await-in-loop
            const result = await parseParams({
                adapter,
                fields,
                joins,
                locale,
                selectFields,
                tableName,
                where: condition
            });
            if (result && Object.keys(result).length > 0) {
                completedConditions.push(result);
            }
        }
    }
    return completedConditions;
}

//# sourceMappingURL=buildAndOrConditions.js.map