import ObjectIdImport from 'bson-objectid';
const ObjectId = ObjectIdImport.default || ObjectIdImport;
export const baseIDField = {
    name: 'id',
    type: 'text',
    admin: {
        hidden: true
    },
    defaultValue: ()=>new ObjectId().toHexString(),
    hooks: {
        beforeChange: [
            ({ operation, value })=>{
                // If creating new doc, need to disregard any
                // ids that have been passed in because they will cause
                // primary key unique conflicts in relational DBs
                if (!value || operation === 'create' && value) {
                    return new ObjectId().toHexString();
                }
                return value;
            }
        ]
    },
    label: 'ID'
};

//# sourceMappingURL=baseIDField.js.map