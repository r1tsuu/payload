import type { DBIdentifierName } from 'payload';
import type { PostgresAdapter } from '../types.js';
type Args = {
    adapter: PostgresAdapter;
    /** The collection, global or field config **/
    config: {
        dbName?: DBIdentifierName;
        enumName?: DBIdentifierName;
        name?: string;
        slug?: string;
    };
    /** For nested tables passed for the user custom dbName functions to handle their own iterations */
    parentTableName?: string;
    /** For sub tables (array for example) this needs to include the parentTableName */
    prefix?: string;
    /** For tables based on fields that could have both enumName and dbName (ie: select with hasMany), default: 'dbName' */
    target?: 'dbName' | 'enumName';
    throwValidationError?: boolean;
    /** Adds the versions suffix to the default table name - should only be used on the base collection to avoid duplicate suffixing */
    versions?: boolean;
    /** Adds the versions suffix to custom dbName only - this is used while creating blocks / selects / arrays / etc */
    versionsCustomName?: boolean;
};
/**
 * Used to name database enums and tables
 * Returns the table or enum name for a given entity
 */
export declare const createTableName: ({ adapter, config: { name, slug }, config, parentTableName, prefix, target, throwValidationError, versions, versionsCustomName, }: Args) => string;
export {};
//# sourceMappingURL=createTableName.d.ts.map