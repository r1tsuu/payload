import { en } from '@payloadcms/translations/languages/en';
import httpStatus from 'http-status';
import { APIError } from './APIError.js';
export class AuthenticationError extends APIError {
    constructor(t){
        super(t ? t('error:emailOrPasswordIncorrect') : en.translations.error.emailOrPasswordIncorrect, httpStatus.UNAUTHORIZED);
    }
}

//# sourceMappingURL=AuthenticationError.js.map