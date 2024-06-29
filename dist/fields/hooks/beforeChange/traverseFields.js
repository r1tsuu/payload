import { promise } from './promise.js';
/**
 * This function is responsible for the following actions, in order:
 * - Run condition
 * - Execute field hooks
 * - Validate data
 * - Transform data for storage
 * - Unflatten locales. The input `data` is the normal document for one locale. The output result will become the document with locales.
 */ export const traverseFields = async ({ id, collection, context, data, doc, docWithLocales, duplicate, errors, fields, global, mergeLocaleActions, operation, path, req, schemaPath, siblingData, siblingDoc, siblingDocWithLocales, skipValidation })=>{
    const promises = [];
    fields.forEach((field)=>{
        promises.push(promise({
            id,
            collection,
            context,
            data,
            doc,
            docWithLocales,
            duplicate,
            errors,
            field,
            global,
            mergeLocaleActions,
            operation,
            parentPath: path,
            parentSchemaPath: schemaPath,
            req,
            siblingData,
            siblingDoc,
            siblingDocWithLocales,
            skipValidation
        }));
    });
    await Promise.all(promises);
};

//# sourceMappingURL=traverseFields.js.map