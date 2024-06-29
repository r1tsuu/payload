import type { Field, TabAsField } from 'payload';
import type { SanitizedConfig } from 'payload';
import type { PostgresAdapter } from '../../types.js';
import type { BlocksMap } from '../../utilities/createBlocksMap.js';
type TraverseFieldsArgs = {
    /**
     * The DB adapter
     */
    adapter: PostgresAdapter;
    /**
     * Pre-formatted blocks map
     */
    blocks: BlocksMap;
    /**
     * The full Payload config
     */
    config: SanitizedConfig;
    /**
     * The data reference to be mutated within this recursive function
     */
    dataRef: Record<string, unknown>;
    /**
     * Data that needs to be removed from the result after all fields have populated
     */
    deletions: (() => void)[];
    /**
     * Column prefix can be built up by group and named tab fields
     */
    fieldPrefix: string;
    /**
     * An array of Payload fields to traverse
     */
    fields: (Field | TabAsField)[];
    /**
     * All hasMany number fields, as returned by Drizzle, keyed on an object by field path
     */
    numbers: Record<string, Record<string, unknown>[]>;
    /**
     * The current field path (in dot notation), used to merge in relationships
     */
    path: string;
    /**
     * All related documents, as returned by Drizzle, keyed on an object by field path
     */
    relationships: Record<string, Record<string, unknown>[]>;
    /**
     * Data structure representing the nearest table from db
     */
    table: Record<string, unknown>;
    /**
     * All hasMany text fields, as returned by Drizzle, keyed on an object by field path
     */
    texts: Record<string, Record<string, unknown>[]>;
};
export declare const traverseFields: <T extends Record<string, unknown>>({ adapter, blocks, config, dataRef, deletions, fieldPrefix, fields, numbers, path, relationships, table, texts, }: TraverseFieldsArgs) => T;
export {};
//# sourceMappingURL=traverseFields.d.ts.map