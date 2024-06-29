import { commitTransaction } from '../../utilities/commitTransaction.js';
import { getEntityPolicies } from '../../utilities/getEntityPolicies.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
export const docAccessOperation = async (args)=>{
    const { globalConfig, req } = args;
    const globalOperations = [
        'read',
        'update'
    ];
    if (globalConfig.versions) {
        globalOperations.push('readVersions');
    }
    try {
        const shouldCommit = await initTransaction(req);
        const result = await getEntityPolicies({
            type: 'global',
            entity: globalConfig,
            operations: globalOperations,
            req
        });
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (e) {
        await killTransaction(req);
        throw e;
    }
};

//# sourceMappingURL=docAccess.js.map