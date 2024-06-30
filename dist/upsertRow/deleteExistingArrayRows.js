import { and, eq } from 'drizzle-orm';
export const deleteExistingArrayRows = async ({ adapter, db, parentID, tableName })=>{
    const table = adapter.tables[tableName];
    const whereConstraints = [
        eq(table._parentID, parentID)
    ];
    await db.delete(table).where(and(...whereConstraints));
};

//# sourceMappingURL=deleteExistingArrayRows.js.map