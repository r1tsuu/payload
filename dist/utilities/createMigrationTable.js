import { sql } from 'drizzle-orm';
export const createMigrationTable = async (adapter)=>{
    const prependSchema = adapter.schemaName ? `"${adapter.schemaName}".` : '';
    await adapter.drizzle.execute(sql.raw(`CREATE TABLE IF NOT EXISTS ${prependSchema}"payload_migrations" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar,
  "batch" numeric,
  "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);`));
};

//# sourceMappingURL=createMigrationTable.js.map