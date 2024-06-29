/* eslint-disable no-param-reassign */ export const transformRelationship = ({ field, locale, ref, relations })=>{
    let result;
    if (!('hasMany' in field) || field.hasMany === false) {
        const relation = relations[0];
        if (relation) {
            // Handle hasOne Poly
            if (Array.isArray(field.relationTo)) {
                const matchedRelation = Object.entries(relation).find(([key, val])=>val !== null && ![
                        'id',
                        'locale',
                        'order',
                        'parent',
                        'path'
                    ].includes(key));
                if (matchedRelation) {
                    const relationTo = matchedRelation[0].replace('ID', '');
                    result = {
                        relationTo,
                        value: matchedRelation[1]
                    };
                }
            }
        }
    } else {
        const transformedRelations = [];
        relations.forEach((relation)=>{
            // Handle hasMany
            if (!Array.isArray(field.relationTo)) {
                const relatedData = relation[`${field.relationTo}ID`];
                if (relatedData) {
                    transformedRelations.push(relatedData);
                }
            } else {
                // Handle hasMany Poly
                const matchedRelation = Object.entries(relation).find(([key, val])=>val !== null && ![
                        'id',
                        'locale',
                        'order',
                        'parent',
                        'path'
                    ].includes(key));
                if (matchedRelation) {
                    const relationTo = matchedRelation[0].replace('ID', '');
                    transformedRelations.push({
                        relationTo,
                        value: matchedRelation[1]
                    });
                }
            }
        });
        result = transformedRelations;
    }
    if (locale) {
        ref[field.name][locale] = result;
    } else {
        ref[field.name] = result;
    }
};

//# sourceMappingURL=relationship.js.map