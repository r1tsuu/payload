import type { Field } from 'payload';
type Args = {
    doc: Record<string, unknown>;
    fields: Field[];
    locale?: string;
    path: string;
    rows: Record<string, unknown>[];
};
export declare const traverseFields: ({ doc, fields, locale, path, rows }: Args) => void;
export {};
//# sourceMappingURL=traverseFields.d.ts.map