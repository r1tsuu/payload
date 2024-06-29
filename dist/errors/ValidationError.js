import { en } from '@payloadcms/translations/languages/en';
import httpStatus from 'http-status';
import { APIError } from './APIError.js';
export class ValidationError extends APIError {
    constructor(results, t){
        const message = t ? t('error:followingFieldsInvalid', {
            count: results.errors.length
        }) : results.errors.length === 1 ? en.translations.error.followingFieldsInvalid_one : en.translations.error.followingFieldsInvalid_other;
        super(`${message} ${results.errors.map((f)=>f.field).join(', ')}`, httpStatus.BAD_REQUEST, results);
    }
}

//# sourceMappingURL=ValidationError.js.map