import { commitTransaction } from '../../utilities/commitTransaction.js';
import { getEntityPolicies } from '../../utilities/getEntityPolicies.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
const allOperations = [
    'create',
    'read',
    'update',
    'delete'
];
export async function docAccessOperation(args) {
    const { id, collection: { config }, req } = args;
    const collectionOperations = [
        ...allOperations
    ];
    if (config.auth && typeof config.auth.maxLoginAttempts !== 'undefined' && config.auth.maxLoginAttempts !== 0) {
        collectionOperations.push('unlock');
    }
    if (config.versions) {
        collectionOperations.push('readVersions');
    }
    try {
        const shouldCommit = await initTransaction(req);
        const result = await getEntityPolicies({
            id,
            type: 'collection',
            entity: config,
            operations: collectionOperations,
            req
        });
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (e) {
        await killTransaction(req);
        throw e;
    }
}

//# sourceMappingURL=docAccess.js.map