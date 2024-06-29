import Ajv from 'ajv';
import ObjectIdImport from 'bson-objectid';
const ObjectId = ObjectIdImport.default || ObjectIdImport;
import { isNumber } from '../utilities/isNumber.js';
import { isValidID } from '../utilities/isValidID.js';
export const text = (value, { hasMany, maxLength: fieldMaxLength, maxRows, minLength, minRows, req: { payload: { config }, t }, required })=>{
    let maxLength;
    if (!required) {
        if (!value) return true;
    }
    if (hasMany === true) {
        const lengthValidationResult = validateArrayLength(value, {
            maxRows,
            minRows,
            required,
            t
        });
        if (typeof lengthValidationResult === 'string') return lengthValidationResult;
    }
    if (typeof config?.defaultMaxTextLength === 'number') maxLength = config.defaultMaxTextLength;
    if (typeof fieldMaxLength === 'number') maxLength = fieldMaxLength;
    const stringsToValidate = Array.isArray(value) ? value : [
        value
    ];
    for (const stringValue of stringsToValidate){
        const length = stringValue?.length || 0;
        if (typeof maxLength === 'number' && length > maxLength) {
            return t('validation:shorterThanMax', {
                label: t('general:value'),
                maxLength,
                stringValue
            });
        }
        if (typeof minLength === 'number' && length < minLength) {
            return t('validation:longerThanMin', {
                label: t('general:value'),
                minLength,
                stringValue
            });
        }
    }
    if (required) {
        if (!(typeof value === 'string' || Array.isArray(value)) || value?.length === 0) {
            return t('validation:required');
        }
    }
    return true;
};
export const password = (value, { maxLength: fieldMaxLength, minLength, req: { payload: { config }, t }, required })=>{
    let maxLength;
    if (typeof config?.defaultMaxTextLength === 'number') maxLength = config.defaultMaxTextLength;
    if (typeof fieldMaxLength === 'number') maxLength = fieldMaxLength;
    if (value && maxLength && value.length > maxLength) {
        return t('validation:shorterThanMax', {
            maxLength
        });
    }
    if (value && minLength && value.length < minLength) {
        return t('validation:longerThanMin', {
            minLength
        });
    }
    if (required && !value) {
        return t('validation:required');
    }
    return true;
};
export const email = (value, { req: { t }, required })=>{
    if (value && !/\S[^\s@]*@\S+\.\S+/.test(value) || !value && required) {
        return t('validation:emailAddress');
    }
    return true;
};
export const textarea = (value, { maxLength: fieldMaxLength, minLength, req: { payload: { config }, t }, required })=>{
    let maxLength;
    if (typeof config?.defaultMaxTextLength === 'number') maxLength = config.defaultMaxTextLength;
    if (typeof fieldMaxLength === 'number') maxLength = fieldMaxLength;
    if (value && maxLength && value.length > maxLength) {
        return t('validation:shorterThanMax', {
            maxLength
        });
    }
    if (value && minLength && value.length < minLength) {
        return t('validation:longerThanMin', {
            minLength
        });
    }
    if (required && !value) {
        return t('validation:required');
    }
    return true;
};
export const code = (value, { req: { t }, required })=>{
    if (required && value === undefined) {
        return t('validation:required');
    }
    return true;
};
export const json = async (value, { jsonError, jsonSchema, req: { t }, required })=>{
    const isNotEmpty = (value)=>{
        if (value === undefined || value === null) {
            return false;
        }
        if (Array.isArray(value) && value.length === 0) {
            return false;
        }
        if (typeof value === 'object' && Object.keys(value).length === 0) {
            return false;
        }
        return true;
    };
    const fetchSchema = ({ schema, uri })=>{
        if (uri && schema) return schema;
        // @ts-expect-error
        return fetch(uri).then((response)=>{
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then((json)=>{
            const jsonSchemaSanitizations = {
                id: undefined,
                $id: json.id,
                $schema: 'http://json-schema.org/draft-07/schema#'
            };
            return Object.assign(json, jsonSchemaSanitizations);
        });
    };
    if (required && !value) {
        return t('validation:required');
    }
    if (jsonError !== undefined) {
        return t('validation:invalidInput');
    }
    if (jsonSchema && isNotEmpty(value)) {
        try {
            jsonSchema.schema = await fetchSchema(jsonSchema);
            const { schema } = jsonSchema;
            // @ts-expect-error
            const ajv = new Ajv();
            if (!ajv.validate(schema, value)) {
                return t(ajv.errorsText());
            }
        } catch (error) {
            return t(error.message);
        }
    }
    return true;
};
export const checkbox = (value, { req: { t }, required })=>{
    if (value && typeof value !== 'boolean' || required && typeof value !== 'boolean') {
        return t('validation:trueOrFalse');
    }
    return true;
};
export const date = (value, { req: { t }, required })=>{
    if (value && !isNaN(Date.parse(value.toString()))) {
        /* eslint-disable-line */ return true;
    }
    if (value) {
        return t('validation:notValidDate', {
            value
        });
    }
    if (required) {
        return t('validation:required');
    }
    return true;
};
export const richText = async (value, options)=>{
    if (!options?.editor) {
        throw new Error('richText field has no editor property.');
    }
    if (typeof options?.editor === 'function') {
        throw new Error('Attempted to access unsanitized rich text editor.');
    }
    const editor = options?.editor;
    return editor.validate(value, options);
};
const validateArrayLength = (value, options)=>{
    const { maxRows, minRows, required, t } = options;
    const arrayLength = Array.isArray(value) ? value.length : value || 0;
    if (!required && arrayLength === 0) return true;
    if (minRows && arrayLength < minRows) {
        return t('validation:requiresAtLeast', {
            count: minRows,
            label: t('general:rows')
        });
    }
    if (maxRows && arrayLength > maxRows) {
        return t('validation:requiresNoMoreThan', {
            count: maxRows,
            label: t('general:rows')
        });
    }
    if (required && !arrayLength) {
        return t('validation:requiresAtLeast', {
            count: 1,
            label: t('general:row')
        });
    }
    return true;
};
export const number = (value, { dbType, hasMany, max, maxRows, min, minRows, req: { t }, required })=>{
    if (hasMany === true) {
        const lengthValidationResult = validateArrayLength(value, {
            maxRows,
            minRows,
            required,
            t
        });
        if (typeof lengthValidationResult === 'string') return lengthValidationResult;
    }
    if (!value && !isNumber(value)) {
        // if no value is present, validate based on required
        if (required) return t('validation:required');
        if (!required) return true;
    }
    const numbersToValidate = Array.isArray(value) ? value : [
        value
    ];
    for (const number of numbersToValidate){
        if (!isNumber(number)) return t('validation:enterNumber');
        const numberValue = parseFloat(number);
        if (typeof max === 'number' && numberValue > max) {
            return t('validation:greaterThanMax', {
                label: t('general:value'),
                max,
                value
            });
        }
        if (typeof min === 'number' && numberValue < min) {
            return t('validation:lessThanMin', {
                label: t('general:value'),
                min,
                value
            });
        }
        if (typeof dbType === 'string' && [
            'bigint',
            'integer'
        ].includes(dbType) && !Number.isInteger(numberValue)) return t('validation:integerOnly');
    }
    return true;
};
export const array = (value, { maxRows, minRows, req: { t }, required })=>{
    return validateArrayLength(value, {
        maxRows,
        minRows,
        required,
        t
    });
};
export const blocks = (value, { maxRows, minRows, req: { t }, required })=>{
    return validateArrayLength(value, {
        maxRows,
        minRows,
        required,
        t
    });
};
const validateFilterOptions = async (value, { id, data, filterOptions, relationTo, req, req: { payload, t, user }, siblingData })=>{
    if (typeof filterOptions !== 'undefined' && value) {
        const options = {};
        const falseCollections = [];
        const collections = !Array.isArray(relationTo) ? [
            relationTo
        ] : relationTo;
        const values = Array.isArray(value) ? value : [
            value
        ];
        for (const collection of collections){
            try {
                let optionFilter = typeof filterOptions === 'function' ? await filterOptions({
                    id,
                    data,
                    relationTo: collection,
                    siblingData,
                    user
                }) : filterOptions;
                if (optionFilter === true) {
                    optionFilter = null;
                }
                const valueIDs = [];
                values.forEach((val)=>{
                    if (typeof val === 'object') {
                        if (val?.value) {
                            valueIDs.push(val.value);
                        } else if (ObjectId.isValid(val)) {
                            valueIDs.push(new ObjectId(val).toHexString());
                        }
                    }
                    if (typeof val === 'string' || typeof val === 'number') {
                        valueIDs.push(val);
                    }
                });
                if (valueIDs.length > 0) {
                    const findWhere = {
                        and: [
                            {
                                id: {
                                    in: valueIDs
                                }
                            }
                        ]
                    };
                    if (optionFilter && optionFilter !== true) findWhere.and.push(optionFilter);
                    if (optionFilter === false) {
                        falseCollections.push(collection);
                    }
                    const result = await payload.find({
                        collection,
                        depth: 0,
                        limit: 0,
                        pagination: false,
                        req,
                        where: findWhere
                    });
                    options[collection] = result.docs.map((doc)=>doc.id);
                } else {
                    options[collection] = [];
                }
            } catch (err) {
                req.payload.logger.error({
                    err,
                    msg: `Error validating filter options for collection ${collection}`
                });
                options[collection] = [];
            }
        }
        const invalidRelationships = values.filter((val)=>{
            let collection;
            let requestedID;
            if (typeof relationTo === 'string') {
                collection = relationTo;
                if (typeof val === 'string' || typeof val === 'number') {
                    requestedID = val;
                }
                if (typeof val === 'object' && ObjectId.isValid(val)) {
                    requestedID = new ObjectId(val).toHexString();
                }
            }
            if (Array.isArray(relationTo) && typeof val === 'object' && val?.relationTo) {
                collection = val.relationTo;
                requestedID = val.value;
            }
            if (falseCollections.find((slug)=>relationTo === slug)) {
                return true;
            }
            if (!options[collection]) return true;
            return options[collection].indexOf(requestedID) === -1;
        });
        if (invalidRelationships.length > 0) {
            return invalidRelationships.reduce((err, invalid, i)=>{
                return `${err} ${JSON.stringify(invalid)}${invalidRelationships.length === i + 1 ? ',' : ''} `;
            }, t('validation:invalidSelections'));
        }
        return true;
    }
    return true;
};
export const upload = (value, options)=>{
    if (!value && options.required) {
        return options?.req?.t('validation:required');
    }
    if (typeof value !== 'undefined' && value !== null) {
        const idType = options?.req?.payload?.collections[options.relationTo]?.customIDType || options?.req?.payload?.db?.defaultIDType;
        if (!isValidID(value, idType)) {
            return options.req?.t('validation:validUploadID');
        }
    }
    return validateFilterOptions(value, options);
};
export const relationship = async (value, options)=>{
    const { maxRows, minRows, relationTo, req: { payload, t }, required } = options;
    if ((!value && typeof value !== 'number' || Array.isArray(value) && value.length === 0) && required) {
        return t('validation:required');
    }
    if (Array.isArray(value) && value.length > 0) {
        if (minRows && value.length < minRows) {
            return t('validation:lessThanMin', {
                label: t('general:rows'),
                min: minRows,
                value: value.length
            });
        }
        if (maxRows && value.length > maxRows) {
            return t('validation:greaterThanMax', {
                label: t('general:rows'),
                max: maxRows,
                value: value.length
            });
        }
    }
    if (typeof value !== 'undefined' && value !== null) {
        const values = Array.isArray(value) ? value : [
            value
        ];
        const invalidRelationships = values.filter((val)=>{
            let collectionSlug;
            let requestedID;
            if (typeof relationTo === 'string') {
                collectionSlug = relationTo;
                // custom id
                if (val || typeof val === 'number') {
                    requestedID = val;
                }
            }
            if (Array.isArray(relationTo) && typeof val === 'object' && val?.relationTo) {
                collectionSlug = val.relationTo;
                requestedID = val.value;
            }
            if (requestedID === null) return false;
            const idType = payload.collections[collectionSlug]?.customIDType || payload?.db?.defaultIDType || 'text';
            return !isValidID(requestedID, idType);
        });
        if (invalidRelationships.length > 0) {
            return `This relationship field has the following invalid relationships: ${invalidRelationships.map((err, invalid)=>{
                return `${err} ${JSON.stringify(invalid)}`;
            }).join(', ')}`;
        }
    }
    return validateFilterOptions(value, options);
};
export const select = (value, { hasMany, options, req: { t }, required })=>{
    if (Array.isArray(value) && value.some((input)=>!options.some((option)=>option === input || typeof option !== 'string' && option?.value === input))) {
        return t('validation:invalidSelection');
    }
    if (typeof value === 'string' && !options.some((option)=>option === value || typeof option !== 'string' && option.value === value)) {
        return t('validation:invalidSelection');
    }
    if (required && (typeof value === 'undefined' || value === null || hasMany && Array.isArray(value) && value?.length === 0)) {
        return t('validation:required');
    }
    return true;
};
export const radio = (value, { options, req: { t }, required })=>{
    if (value) {
        const valueMatchesOption = options.some((option)=>option === value || typeof option !== 'string' && option.value === value);
        return valueMatchesOption || t('validation:invalidSelection');
    }
    return required ? t('validation:required') : true;
};
export const point = (value = [
    '',
    ''
], { req: { t }, required })=>{
    const lng = parseFloat(String(value[0]));
    const lat = parseFloat(String(value[1]));
    if (required && (value[0] && value[1] && typeof lng !== 'number' && typeof lat !== 'number' || Number.isNaN(lng) || Number.isNaN(lat) || Array.isArray(value) && value.length !== 2)) {
        return t('validation:requiresTwoNumbers');
    }
    if (value[1] && Number.isNaN(lng) || value[0] && Number.isNaN(lat)) {
        return t('validation:invalidInput');
    }
    return true;
};
export default {
    array,
    blocks,
    checkbox,
    code,
    date,
    email,
    json,
    number,
    password,
    point,
    radio,
    relationship,
    richText,
    select,
    text,
    textarea,
    upload
};

//# sourceMappingURL=validations.js.map