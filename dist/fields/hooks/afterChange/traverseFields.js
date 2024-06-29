import { promise } from './promise.js';
export const traverseFields = async ({ collection, context, data, doc, fields, global, operation, path, previousDoc, previousSiblingDoc, req, schemaPath, siblingData, siblingDoc })=>{
    const promises = [];
    fields.forEach((field)=>{
        promises.push(promise({
            collection,
            context,
            data,
            doc,
            field,
            global,
            operation,
            parentPath: path,
            parentSchemaPath: schemaPath,
            previousDoc,
            previousSiblingDoc,
            req,
            siblingData,
            siblingDoc
        }));
    });
    await Promise.all(promises);
};

//# sourceMappingURL=traverseFields.js.map