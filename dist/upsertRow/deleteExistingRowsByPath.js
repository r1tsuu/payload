import { and, eq, inArray } from 'drizzle-orm';
export const deleteExistingRowsByPath = async ({ adapter, db, localeColumnName = '_locale', parentColumnName = '_parentID', parentID, pathColumnName = '_path', rows, tableName })=>{
    const localizedPathsToDelete = new Set();
    const pathsToDelete = new Set();
    const table = adapter.tables[tableName];
    rows.forEach((row)=>{
        const path = row[pathColumnName];
        const localeData = row[localeColumnName];
        if (typeof path === 'string') {
            if (typeof localeData === 'string') {
                localizedPathsToDelete.add(path);
            } else {
                pathsToDelete.add(path);
            }
        }
    });
    if (localizedPathsToDelete.size > 0) {
        const whereConstraints = [
            eq(table[parentColumnName], parentID)
        ];
        if (pathColumnName) whereConstraints.push(inArray(table[pathColumnName], Array.from(localizedPathsToDelete)));
        await db.delete(table).where(and(...whereConstraints));
    }
    if (pathsToDelete.size > 0) {
        const whereConstraints = [
            eq(table[parentColumnName], parentID)
        ];
        if (pathColumnName) whereConstraints.push(inArray(table[pathColumnName], Array.from(pathsToDelete)));
        await db.delete(table).where(and(...whereConstraints));
    }
};

//# sourceMappingURL=deleteExistingRowsByPath.js.map