import { en } from '@payloadcms/translations/languages/en';
import httpStatus from 'http-status';
import { APIError } from './APIError.js';
export class UnauthorizedError extends APIError {
    constructor(t){
        super(t ? t('error:unauthorized') : en.translations.error.unauthorized, httpStatus.UNAUTHORIZED);
    }
}

//# sourceMappingURL=UnathorizedError.js.map