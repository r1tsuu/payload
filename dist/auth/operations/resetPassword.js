import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { APIError } from '../../errors/index.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { getFieldsToSign } from '../getFieldsToSign.js';
import { authenticateLocalStrategy } from '../strategies/local/authenticate.js';
import { generatePasswordSaltHash } from '../strategies/local/generatePasswordSaltHash.js';
export const resetPasswordOperation = async (args)=>{
    if (!Object.prototype.hasOwnProperty.call(args.data, 'token') || !Object.prototype.hasOwnProperty.call(args.data, 'password')) {
        throw new APIError('Missing required data.', httpStatus.BAD_REQUEST);
    }
    const { collection: { config: collectionConfig }, data, depth, overrideAccess, req: { payload: { secret }, payload }, req } = args;
    try {
        const shouldCommit = await initTransaction(req);
        // /////////////////////////////////////
        // Reset Password
        // /////////////////////////////////////
        const user = await payload.db.findOne({
            collection: collectionConfig.slug,
            req,
            where: {
                resetPasswordExpiration: {
                    greater_than: new Date()
                },
                resetPasswordToken: {
                    equals: data.token
                }
            }
        });
        if (!user) throw new APIError('Token is either invalid or has expired.', httpStatus.FORBIDDEN);
        // TODO: replace this method
        const { hash, salt } = await generatePasswordSaltHash({
            collection: collectionConfig,
            password: data.password
        });
        user.salt = salt;
        user.hash = hash;
        user.resetPasswordExpiration = new Date().toISOString();
        if (collectionConfig.auth.verify) {
            user._verified = true;
        }
        const doc = await payload.db.updateOne({
            id: user.id,
            collection: collectionConfig.slug,
            data: user,
            req
        });
        await authenticateLocalStrategy({
            doc,
            password: data.password
        });
        const fieldsToSign = getFieldsToSign({
            collectionConfig,
            email: user.email,
            user
        });
        const token = jwt.sign(fieldsToSign, secret, {
            expiresIn: collectionConfig.auth.tokenExpiration
        });
        const fullUser = await payload.findByID({
            id: user.id,
            collection: collectionConfig.slug,
            depth,
            overrideAccess,
            req
        });
        if (shouldCommit) await commitTransaction(req);
        const result = {
            token,
            user: fullUser
        };
        return result;
    } catch (error) {
        await killTransaction(req);
        throw error;
    }
};
export default resetPasswordOperation;

//# sourceMappingURL=resetPassword.js.map