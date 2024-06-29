import count from './count.js';
import create from './create.js';
import deleteLocal from './delete.js';
import { duplicate } from './duplicate.js';
import { findLocal } from './find.js';
import findByID from './findByID.js';
import findVersionByID from './findVersionByID.js';
import findVersions from './findVersions.js';
import restoreVersion from './restoreVersion.js';
import update from './update.js';
declare const _default: {
    auth: {
        auth: (payload: import("../../../index.js").Payload, options: import("../../../auth/operations/auth.js").AuthArgs) => Promise<import("../../../auth/operations/auth.js").AuthResult>;
        forgotPassword: typeof import("../../../auth/operations/local/forgotPassword.js").default;
        login: typeof import("../../../auth/operations/local/login.js").default;
        resetPassword: typeof import("../../../auth/operations/local/resetPassword.js").default;
        unlock: typeof import("../../../auth/operations/local/unlock.js").default;
        verifyEmail: typeof import("../../../auth/operations/local/verifyEmail.js").default;
    };
    count: typeof count;
    create: typeof create;
    deleteLocal: typeof deleteLocal;
    duplicate: typeof duplicate;
    find: typeof findLocal;
    findByID: typeof findByID;
    findVersionByID: typeof findVersionByID;
    findVersions: typeof findVersions;
    restoreVersion: typeof restoreVersion;
    update: typeof update;
};
export default _default;
//# sourceMappingURL=index.d.ts.map