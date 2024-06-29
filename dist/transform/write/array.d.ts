import type { ArrayField } from 'payload';
import type { PostgresAdapter } from '../../types.js';
import type { ArrayRowToInsert, BlockRowToInsert, RelationshipToDelete } from './types.js';
type Args = {
    adapter: PostgresAdapter;
    arrayTableName: string;
    baseTableName: string;
    blocks: {
        [blockType: string]: BlockRowToInsert[];
    };
    blocksToDelete: Set<string>;
    data: unknown;
    field: ArrayField;
    locale?: string;
    numbers: Record<string, unknown>[];
    path: string;
    relationships: Record<string, unknown>[];
    relationshipsToDelete: RelationshipToDelete[];
    selects: {
        [tableName: string]: Record<string, unknown>[];
    };
    texts: Record<string, unknown>[];
};
export declare const transformArray: ({ adapter, arrayTableName, baseTableName, blocks, blocksToDelete, data, field, locale, numbers, path, relationships, relationshipsToDelete, selects, texts, }: Args) => ArrayRowToInsert[];
export {};
//# sourceMappingURL=array.d.ts.map