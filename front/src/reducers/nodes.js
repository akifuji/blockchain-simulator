import { statusIdToString, accountNameToId } from "../global.js";

const initialState = {
    nodes: [
        { 'name': 'node1', 'status': 'idle', 'blocks': 0, 'transactions': 0 },
        { 'name': 'node2', 'status': 'idle', 'blocks': 0, 'transactions': 0 },
        { 'name': 'node3', 'status': 'idle', 'blocks': 0, 'transactions': 0 },
    ],
    accounts: [
        { 'name': 'aki', 'balance': 0 },
        { 'name': 'so', 'balance': 0 },
        { 'name': 'satoshi', 'balance': 0 },
    ],
    port: 50082,
    clock: 0,
};


export default function nodesReducer(state = initialState, action) {
    console.info("nodesReducer: %O", action);
    let nodes;
    let status;
    let accounts;
    let accountId;

    switch (action.type) {
        case 'NUM_NODES_CHANGED':
            nodes = [];
            for (let i = 0; i < action.payload.numNodes; i++) {
                nodes.push({ 'name': `node${i + 1}`, 'status': 'idle' });
            }

            return {
                ...state,
                nodes: nodes
            }
        case 'PORT_CHANGED':
            return {
                ...state,
                port: action.payload.port
            }
        case 'START':
            return {
                ...state,
                clock: 0
            }
        case 'ALL_BLOCKS_FOR_BALANCE':
            console.info('allblocks: %O', action.payload.allblocks);
            // reset all balances to 0
            accounts = Array.from(state.accounts);
            accounts.forEach(function (item) {
                item.balance = 0;
            });

            // process all blocks
            action.payload.allblocks.forEach(function (block) {
                block.transaction.forEach(function (t) {
                    if (t.sender != null) {
                        accountId = accountNameToId(t.sender, accounts);
                        accounts[accountId].balance -= t.value;
                    }
                    if (t.recipient != null) {
                        accountId = accountNameToId(t.recipient, accounts);
                        accounts[accountId].balance += t.value;
                    }
                });
            });

            console.warn(accounts);
            return {
                ...state,
                accounts: accounts
            }
        case 'ALL_BLOCKS':
            // Update blocks per node
            nodes = Array.from(state.nodes);
            nodes[action.payload.nodeIndex].blocks = action.payload.allblocks.length;
            return {
                ...state,
                nodes: nodes
            }
        case 'ALL_TRANSACTIONS':
            // Update transactions per node
            nodes = Array.from(state.nodes);
            nodes[action.payload.nodeIndex].transactions = action.payload.alltransactions.length;
            return {
                ...state,
                nodes: nodes
            }
        case 'GET_NODE_STATUS':
            nodes = Array.from(state.nodes);
            status = statusIdToString(action.payload.status);
            nodes[action.payload.nodeIndex].status = status;
            return {
                ...state,
                nodes: nodes
            }
        case 'SET_CLOCK':
            // send new clcok to all nodes
            return {
                ...state,
                clock: action.payload.clock
            }
        default:
            return state;
    }
}
