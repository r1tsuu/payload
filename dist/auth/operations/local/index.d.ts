import forgotPassword from './forgotPassword.js';
import login from './login.js';
import resetPassword from './resetPassword.js';
import unlock from './unlock.js';
import verifyEmail from './verifyEmail.js';
declare const _default: {
    auth: (payload: import("../../../index.js").Payload, options: import("../auth.js").AuthArgs) => Promise<import("../auth.js").AuthResult>;
    forgotPassword: typeof forgotPassword;
    login: typeof login;
    resetPassword: typeof resetPassword;
    unlock: typeof unlock;
    verifyEmail: typeof verifyEmail;
};
export default _default;
//# sourceMappingURL=index.d.ts.map