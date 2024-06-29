import { ValidationError } from '../../../errors/index.js';
import { deepCopyObject } from '../../../utilities/deepCopyObject.js';
import { traverseFields } from './traverseFields.js';
/**
 * This function is responsible for the following actions, in order:
 * - Run condition
 * - Execute field hooks
 * - Validate data
 * - Transform data for storage
 * - beforeDuplicate hooks (if duplicate)
 * - Unflatten locales. The input `data` is the normal document for one locale. The output result will become the document with locales.
 */ export const beforeChange = async ({ id, collection, context, data: incomingData, doc, docWithLocales, duplicate = false, global, operation, req, skipValidation })=>{
    const data = deepCopyObject(incomingData);
    const mergeLocaleActions = [];
    const errors = [];
    await traverseFields({
        id,
        collection,
        context,
        data,
        doc,
        docWithLocales,
        duplicate,
        errors,
        fields: collection?.fields || global?.fields,
        global,
        mergeLocaleActions,
        operation,
        path: [],
        req,
        schemaPath: [],
        siblingData: data,
        siblingDoc: doc,
        siblingDocWithLocales: docWithLocales,
        skipValidation
    });
    if (errors.length > 0) {
        throw new ValidationError({
            collection: collection?.slug,
            errors,
            global: global?.slug
        }, req.t);
    }
    await mergeLocaleActions.reduce(async (priorAction, action)=>{
        await priorAction;
        await action();
    }, Promise.resolve());
    return data;
};

//# sourceMappingURL=index.js.map