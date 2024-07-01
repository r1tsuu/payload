import { and, ilike, inArray, isNotNull, isNull, notInArray, or } from 'drizzle-orm';
export declare const operatorMap: {
    and: typeof and;
    contains: typeof ilike;
    equals: import("drizzle-orm").BinaryOperator;
    exists: typeof isNotNull;
    greater_than: import("drizzle-orm").BinaryOperator;
    greater_than_equal: import("drizzle-orm").BinaryOperator;
    in: typeof inArray;
    isNull: typeof isNull;
    less_than: import("drizzle-orm").BinaryOperator;
    less_than_equal: import("drizzle-orm").BinaryOperator;
    like: typeof ilike;
    not_equals: import("drizzle-orm").BinaryOperator;
    not_in: typeof notInArray;
    or: typeof or;
};
//# sourceMappingURL=operatorMap.d.ts.map