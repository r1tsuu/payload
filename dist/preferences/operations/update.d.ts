import type { PreferenceUpdateRequest } from '../types.js';
declare function update(args: PreferenceUpdateRequest): Promise<{
    key: string;
    user: {
        relationTo: string;
        value: string | number;
    };
    value: unknown;
}>;
export default update;
//# sourceMappingURL=update.d.ts.map