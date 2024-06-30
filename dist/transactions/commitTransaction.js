export const commitTransaction = async function commitTransaction(id) {
    // if the session was deleted it has already been aborted
    if (!this.sessions[id]) {
        return;
    }
    try {
        await this.sessions[id].resolve();
    } catch (err) {
        await this.sessions[id].reject();
    }
    delete this.sessions[id];
};

//# sourceMappingURL=commitTransaction.js.map