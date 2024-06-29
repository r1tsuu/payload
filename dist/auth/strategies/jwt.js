import jwt from 'jsonwebtoken';
import { extractJWT } from '../extractJWT.js';
export const JWTAuthentication = async ({ headers, isGraphQL = false, payload })=>{
    try {
        const token = extractJWT({
            headers,
            payload
        });
        const decodedPayload = jwt.verify(token, payload.secret);
        const collection = payload.collections[decodedPayload.collection];
        const user = await payload.findByID({
            id: decodedPayload.id,
            collection: decodedPayload.collection,
            depth: isGraphQL ? 0 : collection.config.auth.depth
        });
        if (user && (!collection.config.auth.verify || user._verified)) {
            user.collection = collection.config.slug;
            user._strategy = 'local-jwt';
            return {
                user: user
            };
        } else {
            return {
                user: null
            };
        }
    } catch (error) {
        return {
            user: null
        };
    }
};

//# sourceMappingURL=jwt.js.map