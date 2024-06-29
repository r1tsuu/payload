import type { ClientFieldConfig } from '../fields/config/client.js';
import type { Field, FieldAffectingData, FieldPresentationalOnly } from '../fields/config/types.js';
/**
 * Flattens a collection's fields into a single array of fields, as long
 * as the fields do not affect data.
 *
 * @param fields
 * @param keepPresentationalFields if true, will skip flattening fields that are presentational only
 */
declare const flattenFields: (fields: (ClientFieldConfig | Field)[], keepPresentationalFields?: boolean) => (FieldAffectingData | FieldPresentationalOnly)[];
export default flattenFields;
//# sourceMappingURL=flattenTopLevelFields.d.ts.map