import { createDataloaderCacheKey } from '../../../collections/dataloader.js';
import { fieldHasMaxDepth, fieldSupportsMany } from '../../config/types.js';
const populate = async ({ currentDepth, data, dataReference, depth, draft, fallbackLocale, field, index, key, locale, overrideAccess, req, showHiddenFields })=>{
    const dataToUpdate = dataReference;
    const relation = Array.isArray(field.relationTo) ? data.relationTo : field.relationTo;
    const relatedCollection = req.payload.collections[relation];
    if (relatedCollection) {
        let id = Array.isArray(field.relationTo) ? data.value : data;
        let relationshipValue;
        const shouldPopulate = depth && currentDepth <= depth;
        if (typeof id !== 'string' && typeof id !== 'number' && typeof id?.toString === 'function' && typeof id !== 'object') {
            id = id.toString();
        }
        if (shouldPopulate) {
            relationshipValue = await req.payloadDataLoader.load(createDataloaderCacheKey({
                collectionSlug: relatedCollection.config.slug,
                currentDepth: currentDepth + 1,
                depth,
                docID: id,
                draft,
                fallbackLocale,
                locale,
                overrideAccess,
                showHiddenFields,
                transactionID: req.transactionID
            }));
        }
        if (!relationshipValue) {
            // ids are visible regardless of access controls
            relationshipValue = id;
        }
        if (typeof index === 'number' && typeof key === 'string') {
            if (Array.isArray(field.relationTo)) {
                dataToUpdate[field.name][key][index].value = relationshipValue;
            } else {
                dataToUpdate[field.name][key][index] = relationshipValue;
            }
        } else if (typeof index === 'number' || typeof key === 'string') {
            if (Array.isArray(field.relationTo)) {
                dataToUpdate[field.name][index ?? key].value = relationshipValue;
            } else {
                dataToUpdate[field.name][index ?? key] = relationshipValue;
            }
        } else if (Array.isArray(field.relationTo)) {
            dataToUpdate[field.name].value = relationshipValue;
        } else {
            dataToUpdate[field.name] = relationshipValue;
        }
    }
};
export const relationshipPopulationPromise = async ({ currentDepth, depth, draft, fallbackLocale, field, locale, overrideAccess, req, showHiddenFields, siblingDoc })=>{
    const resultingDoc = siblingDoc;
    const populateDepth = fieldHasMaxDepth(field) && field.maxDepth < depth ? field.maxDepth : depth;
    const rowPromises = [];
    if (fieldSupportsMany(field) && field.hasMany) {
        if (locale === 'all' && typeof siblingDoc[field.name] === 'object' && siblingDoc[field.name] !== null) {
            Object.keys(siblingDoc[field.name]).forEach((key)=>{
                if (Array.isArray(siblingDoc[field.name][key])) {
                    siblingDoc[field.name][key].forEach((relatedDoc, index)=>{
                        const rowPromise = async ()=>{
                            await populate({
                                currentDepth,
                                data: siblingDoc[field.name][key][index],
                                dataReference: resultingDoc,
                                depth: populateDepth,
                                draft,
                                fallbackLocale,
                                field,
                                index,
                                key,
                                locale,
                                overrideAccess,
                                req,
                                showHiddenFields
                            });
                        };
                        rowPromises.push(rowPromise());
                    });
                }
            });
        } else if (Array.isArray(siblingDoc[field.name])) {
            siblingDoc[field.name].forEach((relatedDoc, index)=>{
                const rowPromise = async ()=>{
                    if (relatedDoc) {
                        await populate({
                            currentDepth,
                            data: relatedDoc,
                            dataReference: resultingDoc,
                            depth: populateDepth,
                            draft,
                            fallbackLocale,
                            field,
                            index,
                            locale,
                            overrideAccess,
                            req,
                            showHiddenFields
                        });
                    }
                };
                rowPromises.push(rowPromise());
            });
        }
    } else if (typeof siblingDoc[field.name] === 'object' && siblingDoc[field.name] !== null && locale === 'all') {
        Object.keys(siblingDoc[field.name]).forEach((key)=>{
            const rowPromise = async ()=>{
                await populate({
                    currentDepth,
                    data: siblingDoc[field.name][key],
                    dataReference: resultingDoc,
                    depth: populateDepth,
                    draft,
                    fallbackLocale,
                    field,
                    key,
                    locale,
                    overrideAccess,
                    req,
                    showHiddenFields
                });
            };
            rowPromises.push(rowPromise());
        });
        await Promise.all(rowPromises);
    } else if (siblingDoc[field.name]) {
        await populate({
            currentDepth,
            data: siblingDoc[field.name],
            dataReference: resultingDoc,
            depth: populateDepth,
            draft,
            fallbackLocale,
            field,
            locale,
            overrideAccess,
            req,
            showHiddenFields
        });
    }
    await Promise.all(rowPromises);
};

//# sourceMappingURL=relationshipPopulationPromise.js.map