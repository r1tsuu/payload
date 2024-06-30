import type { Field, SanitizedConfig, TypeWithID } from 'payload';
import type { PostgresAdapter } from '../../types.js';
type TransformArgs = {
    adapter: PostgresAdapter;
    config: SanitizedConfig;
    data: Record<string, unknown>;
    fallbackLocale?: false | string;
    fields: Field[];
    locale?: string;
};
export declare const transform: <T extends Record<string, unknown> | TypeWithID>({ adapter, config, data, fields, }: TransformArgs) => T;
export {};
//# sourceMappingURL=index.d.ts.map