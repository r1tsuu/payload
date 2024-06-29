export const deleteUserPreferences = async ({ collectionConfig, ids, payload, req })=>{
    if (collectionConfig.auth) {
        await payload.db.deleteMany({
            collection: 'payload-preferences',
            req,
            where: {
                and: [
                    {
                        'user.value': {
                            in: ids
                        }
                    },
                    {
                        'user.relationTo': {
                            equals: collectionConfig.slug
                        }
                    }
                ]
            }
        });
    }
    await payload.db.deleteMany({
        collection: 'payload-preferences',
        req,
        where: {
            key: {
                in: ids.map((id)=>`collection-${collectionConfig.slug}-${id}`)
            }
        }
    });
};

//# sourceMappingURL=deleteUserPreferences.js.map