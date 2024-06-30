import type { Block } from 'payload';
import type { GenericTable } from '../types.js';
type Args = {
    block: Block;
    localized: boolean;
    rootTableName: string;
    table: GenericTable;
    tableLocales?: GenericTable;
};
export declare const validateExistingBlockIsIdentical: ({ block, localized, rootTableName, table, tableLocales, }: Args) => void;
export {};
//# sourceMappingURL=validateExistingBlockIsIdentical.d.ts.map