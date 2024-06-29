import type { Config, SanitizedConfig } from '../../config/types.js';
import type { Field } from './types.js';
type Args = {
    config: Config;
    existingFieldNames?: Set<string>;
    fields: Field[];
    /**
     * If true, a richText field will require an editor property to be set, as the sanitizeFields function will not add it from the payload config if not present.
     *
     * @default false
     */
    requireFieldLevelRichTextEditor?: boolean;
    /**
     * If this property is set, RichText fields won't be sanitized immediately. Instead, they will be added to this array as promises
     * so that you can sanitize them together, after the config has been sanitized.
     */
    richTextSanitizationPromises?: Array<(config: SanitizedConfig) => Promise<void>>;
    /**
     * If not null, will validate that upload and relationship fields do not relate to a collection that is not in this array.
     * This validation will be skipped if validRelationships is null.
     */
    validRelationships: null | string[];
};
export declare const sanitizeFields: ({ config, existingFieldNames, fields, requireFieldLevelRichTextEditor, richTextSanitizationPromises, validRelationships, }: Args) => Promise<Field[]>;
export {};
//# sourceMappingURL=sanitize.d.ts.map