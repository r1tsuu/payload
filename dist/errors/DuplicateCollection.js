import { APIError } from './APIError.js';
export class DuplicateCollection extends APIError {
    constructor(propertyName, duplicates){
        super(`Collection ${propertyName} already in use: "${duplicates.join(', ')}"`);
    }
}

//# sourceMappingURL=DuplicateCollection.js.map