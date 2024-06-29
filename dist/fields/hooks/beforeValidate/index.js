import { deepCopyObject } from '../../../utilities/deepCopyObject.js';
import { traverseFields } from './traverseFields.js';
/**
 * This function is responsible for the following actions, in order:
 * - Sanitize incoming data
 * - Execute field hooks
 * - Execute field access control
 * - Merge original document data into incoming data
 * - Compute default values for undefined fields
 */ export const beforeValidate = async ({ id, collection, context, data: incomingData, doc, global, operation, overrideAccess, req })=>{
    const data = deepCopyObject(incomingData);
    await traverseFields({
        id,
        collection,
        context,
        data,
        doc,
        fields: collection?.fields || global?.fields,
        global,
        operation,
        overrideAccess,
        path: [],
        req,
        schemaPath: [],
        siblingData: data,
        siblingDoc: doc
    });
    return data;
};

//# sourceMappingURL=index.js.map