import { deepCopyObject } from '../../../utilities/deepCopyObject.js';
import { traverseFields } from './traverseFields.js';
/**
 * This function is responsible for the following actions, in order:
 * - Execute field hooks
 */ export const afterChange = async ({ collection, context, data, doc: incomingDoc, global, operation, previousDoc, req })=>{
    const doc = deepCopyObject(incomingDoc);
    await traverseFields({
        collection,
        context,
        data,
        doc,
        fields: collection?.fields || global?.fields,
        global,
        operation,
        path: [],
        previousDoc,
        previousSiblingDoc: previousDoc,
        req,
        schemaPath: [],
        siblingData: data,
        siblingDoc: doc
    });
    return doc;
};

//# sourceMappingURL=index.js.map