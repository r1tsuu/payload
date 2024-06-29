import type { SQL } from 'drizzle-orm';
import type { PgTableWithColumns } from 'drizzle-orm/pg-core';
import type { Field, FieldAffectingData, TabAsField } from 'payload';
import type { GenericColumn, GenericTable, PostgresAdapter } from '../types.js';
import type { BuildQueryJoinAliases } from './buildQuery.js';
type Constraint = {
    columnName: string;
    table: GenericTable | PgTableWithColumns<any>;
    value: unknown;
};
type TableColumn = {
    columnName?: string;
    constraints: Constraint[];
    field: FieldAffectingData;
    getNotNullColumnByValue?: (val: unknown) => string;
    pathSegments?: string[];
    rawColumn?: SQL;
    table: GenericTable | PgTableWithColumns<any>;
};
type Args = {
    adapter: PostgresAdapter;
    aliasTable?: GenericTable | PgTableWithColumns<any>;
    collectionPath: string;
    columnPrefix?: string;
    constraintPath?: string;
    constraints?: Constraint[];
    fields: (Field | TabAsField)[];
    joins: BuildQueryJoinAliases;
    locale?: string;
    pathSegments: string[];
    rootTableName?: string;
    selectFields: Record<string, GenericColumn>;
    tableName: string;
    /**
     * If creating a new table name for arrays and blocks, this suffix should be appended to the table name
     */
    tableNameSuffix?: string;
    /**
     * The raw value of the query before sanitization
     */
    value: unknown;
};
/**
 * Transforms path to table and column name
 * Adds tables to `join`
 * @returns TableColumn
 */
export declare const getTableColumnFromPath: ({ adapter, aliasTable, collectionPath, columnPrefix, constraintPath: incomingConstraintPath, constraints, fields, joins, locale: incomingLocale, pathSegments: incomingSegments, rootTableName: incomingRootTableName, selectFields, tableName, tableNameSuffix, value, }: Args) => TableColumn;
export {};
//# sourceMappingURL=getTableColumnFromPath.d.ts.map