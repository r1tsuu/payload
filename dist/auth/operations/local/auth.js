import { createLocalReq } from '../../../utilities/createLocalReq.js';
import { auth as authOperation } from '../auth.js';
export const auth = async (payload, options)=>{
    const { headers } = options;
    return await authOperation({
        headers,
        req: await createLocalReq({
            req: options.req
        }, payload)
    });
};

//# sourceMappingURL=auth.js.map