import { integer, numeric, uuid, varchar } from 'drizzle-orm/pg-core';
import type { IDType } from '../types.js';
export declare const parentIDColumnMap: Record<IDType, typeof integer<string> | typeof numeric<string> | typeof uuid<string> | typeof varchar>;
//# sourceMappingURL=parentIDColumnMap.d.ts.map