import type { Field, FindArgs } from 'payload';
import type { PostgresAdapter } from '../types.js';
type Args = Omit<FindArgs, 'collection'> & {
    adapter: PostgresAdapter;
    fields: Field[];
    tableName: string;
};
export declare const findMany: ({ adapter, fields, limit: limitArg, locale, page, pagination, req, skip, sort, tableName, where: whereArg, }: Args) => Promise<{
    docs: any;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number;
    page: number;
    pagingCounter: number;
    prevPage: number;
    totalDocs: number;
    totalPages: number;
}>;
export {};
//# sourceMappingURL=findMany.d.ts.map