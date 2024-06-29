import httpStatus from 'http-status';
import { APIError } from '../../errors/index.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
export const verifyEmailOperation = async (args)=>{
    const { collection, req, token } = args;
    if (!Object.prototype.hasOwnProperty.call(args, 'token')) {
        throw new APIError('Missing required data.', httpStatus.BAD_REQUEST);
    }
    try {
        const shouldCommit = await initTransaction(req);
        const user = await req.payload.db.findOne({
            collection: collection.config.slug,
            req,
            where: {
                _verificationToken: {
                    equals: token
                }
            }
        });
        if (!user) throw new APIError('Verification token is invalid.', httpStatus.FORBIDDEN);
        if (user && user._verified === true) throw new APIError('This account has already been activated.', httpStatus.ACCEPTED);
        await req.payload.db.updateOne({
            id: user.id,
            collection: collection.config.slug,
            data: {
                ...user,
                _verificationToken: null,
                _verified: true
            },
            req
        });
        if (shouldCommit) await commitTransaction(req);
        return true;
    } catch (error) {
        await killTransaction(req);
        throw error;
    }
};
export default verifyEmailOperation;

//# sourceMappingURL=verifyEmail.js.map