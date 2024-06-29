import type { IndexBuilder, PgColumnBuilder } from 'drizzle-orm/pg-core';
import type { Field, TabAsField } from 'payload';
import type { GenericColumns, PostgresAdapter } from '../types.js';
import type { RelationMap } from './build.js';
type Args = {
    adapter: PostgresAdapter;
    columnPrefix?: string;
    columns: Record<string, PgColumnBuilder>;
    disableNotNull: boolean;
    disableUnique?: boolean;
    fieldPrefix?: string;
    fields: (Field | TabAsField)[];
    forceLocalized?: boolean;
    indexes: Record<string, (cols: GenericColumns) => IndexBuilder>;
    localesColumns: Record<string, PgColumnBuilder>;
    localesIndexes: Record<string, (cols: GenericColumns) => IndexBuilder>;
    newTableName: string;
    parentTableName: string;
    relationsToBuild: RelationMap;
    relationships: Set<string>;
    rootRelationsToBuild?: RelationMap;
    rootTableIDColType: string;
    rootTableName: string;
    versions: boolean;
};
type Result = {
    hasLocalizedField: boolean;
    hasLocalizedManyNumberField: boolean;
    hasLocalizedManyTextField: boolean;
    hasLocalizedRelationshipField: boolean;
    hasManyNumberField: 'index' | boolean;
    hasManyTextField: 'index' | boolean;
};
export declare const traverseFields: ({ adapter, columnPrefix, columns, disableNotNull, disableUnique, fieldPrefix, fields, forceLocalized, indexes, localesColumns, localesIndexes, newTableName, parentTableName, relationsToBuild, relationships, rootRelationsToBuild, rootTableIDColType, rootTableName, versions, }: Args) => Result;
export {};
//# sourceMappingURL=traverseFields.d.ts.map