import type { QueryPromise } from 'drizzle-orm';
export type ChainedMethods = {
    args: unknown[];
    method: string;
}[];
/**
 * Call and returning methods that would normally be chained together but cannot be because of control logic
 * @param methods
 * @param query
 */
declare const chainMethods: <T>({ methods, query }: {
    methods: any;
    query: any;
}) => QueryPromise<T>;
export { chainMethods };
//# sourceMappingURL=chainMethods.d.ts.map