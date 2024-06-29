import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { adminInit as adminInitTelemetry } from '../../utilities/telemetry/events/adminInit.js';
import { getAccessResults } from '../getAccessResults.js';
export const accessOperation = async (args)=>{
    const { req } = args;
    adminInitTelemetry(req);
    try {
        const shouldCommit = await initTransaction(req);
        const results = getAccessResults({
            req
        });
        if (shouldCommit) await commitTransaction(req);
        return results;
    } catch (e) {
        await killTransaction(req);
        throw e;
    }
};

//# sourceMappingURL=access.js.map