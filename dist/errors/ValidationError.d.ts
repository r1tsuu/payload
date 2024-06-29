import type { TFunction } from '@payloadcms/translations';
import { APIError } from './APIError.js';
export declare class ValidationError extends APIError<{
    collection?: string;
    errors: {
        field: string;
        message: string;
    }[];
    global?: string;
}> {
    constructor(results: {
        collection?: string;
        errors: {
            field: string;
            message: string;
        }[];
        global?: string;
    }, t?: TFunction);
}
//# sourceMappingURL=ValidationError.d.ts.map