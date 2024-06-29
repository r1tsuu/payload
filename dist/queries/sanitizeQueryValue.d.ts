import { type Field, type TabAsField } from 'payload';
import type { PostgresAdapter } from '../types.js';
type SanitizeQueryValueArgs = {
    adapter: PostgresAdapter;
    field: Field | TabAsField;
    operator: string;
    relationOrPath: string;
    val: any;
};
export declare const sanitizeQueryValue: ({ adapter, field, operator: operatorArg, relationOrPath, val, }: SanitizeQueryValueArgs) => {
    operator: string;
    value: unknown;
};
export {};
//# sourceMappingURL=sanitizeQueryValue.d.ts.map