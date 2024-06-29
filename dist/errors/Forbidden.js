import { en } from '@payloadcms/translations/languages/en';
import httpStatus from 'http-status';
import { APIError } from './APIError.js';
export class Forbidden extends APIError {
    constructor(t){
        super(t ? t('error:notAllowedToPerformAction') : en.translations.error.notAllowedToPerformAction, httpStatus.FORBIDDEN);
    }
}

//# sourceMappingURL=Forbidden.js.map