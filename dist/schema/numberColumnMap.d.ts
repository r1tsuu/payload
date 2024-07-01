import type { PgColumnBuilder } from 'drizzle-orm/pg-core';
import type { NumberField } from 'payload';
type NumberFieldDbType = NonNullable<NumberField['dbType']>;
export declare const numberColumnMap: Record<NumberFieldDbType, (name: string) => PgColumnBuilder>;
export {};
//# sourceMappingURL=numberColumnMap.d.ts.map