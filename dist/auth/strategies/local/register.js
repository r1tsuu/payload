import { ValidationError } from '../../../errors/index.js';
import { generatePasswordSaltHash } from './generatePasswordSaltHash.js';
export const registerLocalStrategy = async ({ collection, doc, password, payload, req })=>{
    const existingUser = await payload.find({
        collection: collection.slug,
        depth: 0,
        limit: 1,
        pagination: false,
        req,
        where: {
            email: {
                equals: doc.email
            }
        }
    });
    if (existingUser.docs.length > 0) {
        throw new ValidationError({
            collection: collection.slug,
            errors: [
                {
                    field: 'email',
                    message: req.t('error:userEmailAlreadyRegistered')
                }
            ]
        });
    }
    const { hash, salt } = await generatePasswordSaltHash({
        collection,
        password
    });
    const sanitizedDoc = {
        ...doc
    };
    if (sanitizedDoc.password) delete sanitizedDoc.password;
    return payload.db.create({
        collection: collection.slug,
        data: {
            ...sanitizedDoc,
            hash,
            salt
        },
        req
    });
};

//# sourceMappingURL=register.js.map