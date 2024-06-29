import { deepCopyObject } from '../../../utilities/deepCopyObject.js';
import { traverseFields } from './traverseFields.js';
/**
 * This function is responsible for the following actions, in order:
 * - Remove hidden fields from response
 * - Flatten locales into requested locale. If the input doc contains all locales, the output doc after this function will only contain the requested locale.
 * - Sanitize outgoing data (point field, etc.)
 * - Execute field hooks
 * - Execute read access control
 * - Populate relationships
 */ export async function afterRead(args) {
    const { collection, context, currentDepth: incomingCurrentDepth, depth: incomingDepth, doc: incomingDoc, draft, fallbackLocale, findMany, flattenLocales = true, global, locale, overrideAccess, req, showHiddenFields } = args;
    const doc = deepCopyObject(incomingDoc);
    const fieldPromises = [];
    const populationPromises = [];
    let depth = incomingDepth || incomingDepth === 0 ? parseInt(String(incomingDepth), 10) : req.payload.config.defaultDepth;
    if (depth > req.payload.config.maxDepth) depth = req.payload.config.maxDepth;
    const currentDepth = incomingCurrentDepth || 1;
    traverseFields({
        collection,
        context,
        currentDepth,
        depth,
        doc,
        draft,
        fallbackLocale,
        fieldPromises,
        fields: collection?.fields || global?.fields,
        findMany,
        flattenLocales,
        global,
        locale,
        overrideAccess,
        path: [],
        populationPromises,
        req,
        schemaPath: [],
        showHiddenFields,
        siblingDoc: doc
    });
    await Promise.all(fieldPromises);
    await Promise.all(populationPromises);
    return doc;
}

//# sourceMappingURL=index.js.map