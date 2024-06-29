import crypto from 'crypto';
import { ValidationError } from '../../../errors/index.js';
const defaultPasswordValidator = (password)=>{
    if (!password) return 'No password was given';
    if (password.length < 3) return 'Password must be at least 3 characters';
    return true;
};
function randomBytes() {
    return new Promise((resolve, reject)=>crypto.randomBytes(32, (err, saltBuffer)=>err ? reject(err) : resolve(saltBuffer)));
}
function pbkdf2Promisified(password, salt) {
    return new Promise((resolve, reject)=>crypto.pbkdf2(password, salt, 25000, 512, 'sha256', (err, hashRaw)=>err ? reject(err) : resolve(hashRaw)));
}
export const generatePasswordSaltHash = async ({ collection, password })=>{
    const validationResult = defaultPasswordValidator(password);
    if (typeof validationResult === 'string') {
        throw new ValidationError({
            collection: collection?.slug,
            errors: [
                {
                    field: 'password',
                    message: validationResult
                }
            ]
        });
    }
    const saltBuffer = await randomBytes();
    const salt = saltBuffer.toString('hex');
    const hashRaw = await pbkdf2Promisified(password, salt);
    const hash = hashRaw.toString('hex');
    return {
        hash,
        salt
    };
};

//# sourceMappingURL=generatePasswordSaltHash.js.map