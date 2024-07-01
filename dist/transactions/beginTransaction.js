import { v4 as uuid } from 'uuid';
export const beginTransaction = async function beginTransaction() {
    let id;
    try {
        id = uuid();
        let reject;
        let resolve;
        let transaction;
        let transactionReady;
        // Await initialization here
        // Prevent race conditions where the adapter may be
        // re-initializing, and `this.drizzle` is potentially undefined
        await this.initializing;
        // Drizzle only exposes a transactions API that is sufficient if you
        // can directly pass around the `tx` argument. But our operations are spread
        // over many files and we don't want to pass the `tx` around like that,
        // so instead, we "lift" up the `resolve` and `reject` methods
        // and will call them in our respective transaction methods
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        const done = this.drizzle.transaction(async (tx)=>{
            transaction = tx;
            await new Promise((res, rej)=>{
                resolve = ()=>{
                    res();
                    return done;
                };
                reject = ()=>{
                    rej();
                    return done;
                };
                transactionReady();
            });
        }).catch(()=>{
        // swallow
        });
        // Need to wait until the transaction is ready
        // before binding its `resolve` and `reject` methods below
        await new Promise((resolve)=>transactionReady = resolve);
        this.sessions[id] = {
            db: transaction,
            reject,
            resolve
        };
    } catch (err) {
        this.payload.logger.error(`Error: cannot begin transaction: ${err.message}`, err);
        process.exit(1);
    }
    return id;
};

//# sourceMappingURL=beginTransaction.js.map