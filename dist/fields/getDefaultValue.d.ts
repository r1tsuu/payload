import type { PayloadRequestWithData } from '../types/index.js';
type Args = {
    defaultValue: unknown;
    locale: string | undefined;
    user: PayloadRequestWithData['user'];
    value?: unknown;
};
declare const getValueWithDefault: ({ defaultValue, locale, user, value }: Args) => unknown;
export default getValueWithDefault;
//# sourceMappingURL=getDefaultValue.d.ts.map