import type { RelationshipField, UploadField } from 'payload';
type Args = {
    field: RelationshipField | UploadField;
    locale?: string;
    ref: Record<string, unknown>;
    relations: Record<string, unknown>[];
};
export declare const transformRelationship: ({ field, locale, ref, relations }: Args) => void;
export {};
//# sourceMappingURL=relationship.d.ts.map