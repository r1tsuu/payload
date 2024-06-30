import { bigint, integer, numeric, real } from 'drizzle-orm/pg-core';
export const numberColumnMap = {
    bigint: (name)=>{
        return bigint(name, {
            mode: 'number'
        });
    },
    integer,
    numeric,
    real
};

//# sourceMappingURL=numberColumnMap.js.map