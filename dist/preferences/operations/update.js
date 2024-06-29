import defaultAccess from '../../auth/defaultAccess.js';
import executeAccess from '../../auth/executeAccess.js';
import { UnauthorizedError } from '../../errors/UnathorizedError.js';
async function update(args) {
    const { key, overrideAccess, req: { payload }, req, user, value } = args;
    if (!user) {
        throw new UnauthorizedError(req.t);
    }
    const collection = 'payload-preferences';
    const filter = {
        key: {
            equals: key
        },
        'user.relationTo': {
            equals: user.collection
        },
        'user.value': {
            equals: user.id
        }
    };
    const preference = {
        key,
        user: {
            relationTo: user.collection,
            value: user.id
        },
        value
    };
    if (!overrideAccess) {
        await executeAccess({
            req
        }, defaultAccess);
    }
    try {
        // try/catch because we attempt to update without first reading to check if it exists first to save on db calls
        await payload.db.updateOne({
            collection,
            data: preference,
            req,
            where: filter
        });
    } catch (err) {
        await payload.db.create({
            collection,
            data: preference,
            req
        });
    }
    return preference;
}
export default update;

//# sourceMappingURL=update.js.map