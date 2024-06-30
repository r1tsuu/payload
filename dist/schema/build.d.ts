import type { ForeignKeyBuilder, IndexBuilder, PgColumnBuilder, UniqueConstraintBuilder } from 'drizzle-orm/pg-core';
import type { Field } from 'payload';
import type { GenericColumns, PostgresAdapter } from '../types.js';
export type BaseExtraConfig = Record<string, (cols: GenericColumns) => ForeignKeyBuilder | IndexBuilder | UniqueConstraintBuilder>;
export type RelationMap = Map<string, {
    localized: boolean;
    target: string;
    type: 'many' | 'one';
}>;
type Args = {
    adapter: PostgresAdapter;
    baseColumns?: Record<string, PgColumnBuilder>;
    baseExtraConfig?: BaseExtraConfig;
    buildNumbers?: boolean;
    buildRelationships?: boolean;
    disableNotNull: boolean;
    disableUnique: boolean;
    fields: Field[];
    rootRelationsToBuild?: RelationMap;
    rootRelationships?: Set<string>;
    rootTableIDColType?: string;
    rootTableName?: string;
    tableName: string;
    timestamps?: boolean;
    versions: boolean;
};
type Result = {
    hasManyNumberField: 'index' | boolean;
    hasManyTextField: 'index' | boolean;
    relationsToBuild: RelationMap;
};
export declare const buildTable: ({ adapter, baseColumns, baseExtraConfig, disableNotNull, disableUnique, fields, rootRelationsToBuild, rootRelationships, rootTableIDColType, rootTableName: incomingRootTableName, tableName, timestamps, versions, }: Args) => Result;
export {};
//# sourceMappingURL=build.d.ts.map