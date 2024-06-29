async function findOne(args) {
    const { key, req: { payload }, req, user } = args;
    if (!user) return null;
    const where = {
        and: [
            {
                key: {
                    equals: key
                }
            },
            {
                'user.value': {
                    equals: user.id
                }
            },
            {
                'user.relationTo': {
                    equals: user.collection
                }
            }
        ]
    };
    return await payload.db.findOne({
        collection: 'payload-preferences',
        req,
        where
    });
}
export default findOne;

//# sourceMappingURL=findOne.js.map