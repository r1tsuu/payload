import collectionSchema from '../collections/config/schema.js';
import fieldSchema, { idField } from '../fields/config/schema.js';
import { fieldAffectsData } from '../fields/config/types.js';
import globalSchema from '../globals/config/schema.js';
import schema from './schema.js';
const validateFields = (context, entity)=>{
    const errors = [];
    entity.fields.forEach((field)=>{
        let idResult = {
            error: null
        };
        if (fieldAffectsData(field) && field.name === 'id') {
            idResult = idField.validate(field, {
                abortEarly: false
            });
        }
        const result = fieldSchema.validate(field, {
            abortEarly: false
        });
        if (idResult.error) {
            idResult.error.details.forEach(({ message })=>{
                errors.push(`${context} "${entity.slug}" > Field${fieldAffectsData(field) ? ` "${field.name}" >` : ''} ${message}`);
            });
        }
        if (result.error) {
            result.error.details.forEach(({ message })=>{
                errors.push(`${context} "${entity.slug}" > Field${fieldAffectsData(field) ? ` "${field.name}" >` : ''} ${message}`);
            });
        }
    });
    return errors;
};
const validateCollections = (collections)=>{
    const errors = [];
    collections.forEach((collection)=>{
        const result = collectionSchema.validate(collection, {
            abortEarly: false
        });
        if (result.error) {
            result.error.details.forEach(({ message })=>{
                errors.push(`Collection "${collection.slug}" > ${message}`);
            });
        }
        errors.push(...validateFields('Collection', collection));
    });
    return errors;
};
const validateGlobals = (globals)=>{
    const errors = [];
    globals.forEach((global)=>{
        const result = globalSchema.validate(global, {
            abortEarly: false
        });
        if (result.error) {
            result.error.details.forEach(({ message })=>{
                errors.push(`Globals "${global.slug}" > ${message}`);
            });
        }
        errors.push(...validateFields('Global', global));
    });
    return errors;
};
export const validateSchema = (config, logger)=>{
    const result = schema.validate(config, {
        abortEarly: false
    });
    const nestedErrors = [
        ...validateCollections(config.collections),
        ...validateGlobals(config.globals)
    ];
    if (result.error || nestedErrors.length > 0) {
        logger.error(`There were ${(result.error?.details?.length || 0) + nestedErrors.length} errors validating your Payload config`);
        let i = 0;
        if (result.error) {
            result.error.details.forEach(({ message })=>{
                i += 1;
                logger.error(`${i}: ${message}`);
            });
        }
        nestedErrors.forEach((message)=>{
            i += 1;
            logger.error(`${i}: ${message}`);
        });
        process.exit(1);
    }
    return result.value;
};

//# sourceMappingURL=validate.js.map