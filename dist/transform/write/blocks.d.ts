import type { BlockField } from 'payload';
import type { PostgresAdapter } from '../../types.js';
import type { BlockRowToInsert, RelationshipToDelete } from './types.js';
type Args = {
    adapter: PostgresAdapter;
    baseTableName: string;
    blocks: {
        [blockType: string]: BlockRowToInsert[];
    };
    blocksToDelete: Set<string>;
    data: Record<string, unknown>[];
    field: BlockField;
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
export declare const transformBlocks: ({ adapter, baseTableName, blocks, blocksToDelete, data, field, locale, numbers, path, relationships, relationshipsToDelete, selects, texts, }: Args) => void;
export {};
//# sourceMappingURL=blocks.d.ts.map