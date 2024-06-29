import { promise } from './promise.js';
export const traverseFields = async ({ id, collection, context, data, doc, fields, global, operation, overrideAccess, path, req, schemaPath, siblingData, siblingDoc })=>{
    const promises = [];
    fields.forEach((field)=>{
        promises.push(promise({
            id,
            collection,
            context,
            data,
            doc,
            field,
            global,
            operation,
            overrideAccess,
            parentPath: path,
            parentSchemaPath: schemaPath,
            req,
            siblingData,
            siblingDoc
        }));
    });
    await Promise.all(promises);
};

//# sourceMappingURL=traverseFields.js.map