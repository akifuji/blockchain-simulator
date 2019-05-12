export function statusIdToString(id) {
    let statuses = ["", "idle", "mining", "broadcasting-block", "broadcasting-tx", "receiving-block", "receiving-tx"];
    return statuses[id];
}

export function accountNameToId(accountName, accounts) {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].name === accountName) {
            return i;
        }
    }
    return -1;
}