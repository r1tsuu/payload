import { promise } from './promise.js';
export const traverseFields = ({ collection, context, currentDepth, depth, doc, draft, fallbackLocale, fieldPromises, fields, findMany, flattenLocales, global, locale, overrideAccess, path, populationPromises, req, schemaPath, showHiddenFields, siblingDoc, triggerAccessControl = true, triggerHooks = true })=>{
    fields.forEach((field)=>{
        fieldPromises.push(promise({
            collection,
            context,
            currentDepth,
            depth,
            doc,
            draft,
            fallbackLocale,
            field,
            fieldPromises,
            findMany,
            flattenLocales,
            global,
            locale,
            overrideAccess,
            parentPath: path,
            parentSchemaPath: schemaPath,
            populationPromises,
            req,
            showHiddenFields,
            siblingDoc,
            triggerAccessControl,
            triggerHooks
        }));
    });
};

//# sourceMappingURL=traverseFields.js.map