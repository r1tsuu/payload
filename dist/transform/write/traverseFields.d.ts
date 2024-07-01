import type { Field } from 'payload';
import type { PostgresAdapter } from '../../types.js';
import type { ArrayRowToInsert, BlockRowToInsert, RelationshipToDelete } from './types.js';
type Args = {
    adapter: PostgresAdapter;
    arrays: {
        [tableName: string]: ArrayRowToInsert[];
    };
    /**
     * This is the name of the base table
     */
    baseTableName: string;
    blocks: {
        [blockType: string]: BlockRowToInsert[];
    };
    blocksToDelete: Set<string>;
    /**
     * A snake-case field prefix, representing prior fields
     * Ex: my_group_my_named_tab_
     */
    columnPrefix: string;
    data: Record<string, unknown>;
    existingLocales?: Record<string, unknown>[];
    /**
     * A prefix that will retain camel-case formatting, representing prior fields
     * Ex: myGroup_myNamedTab_
     */
    fieldPrefix: string;
    fields: Field[];
    forcedLocale?: string;
    locales: {
        [locale: string]: Record<string, unknown>;
    };
    numbers: Record<string, unknown>[];
    /**
     * This is the name of the parent table
     */
    parentTableName: string;
    path: string;
    relationships: Record<string, unknown>[];
    relationshipsToDelete: RelationshipToDelete[];
    row: Record<string, unknown>;
    selects: {
        [tableName: string]: Record<string, unknown>[];
    };
    texts: Record<string, unknown>[];
};
export declare const traverseFields: ({ adapter, arrays, baseTableName, blocks, blocksToDelete, columnPrefix, data, existingLocales, fieldPrefix, fields, forcedLocale, locales, numbers, parentTableName, path, relationships, relationshipsToDelete, row, selects, texts, }: Args) => void;
export {};
//# sourceMappingURL=traverseFields.d.ts.map