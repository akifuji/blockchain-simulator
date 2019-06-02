import { statusIdToString, accountNameToId } from "../global.js";

const initialState = {
    nodes: [
        { 'id': 0, 'name': 'node1', 'status': 'idle', 'blocks': [], 'transactions': [] },
        { 'id': 1, 'name': 'node2', 'status': 'idle', 'blocks': [], 'transactions': [] },
        { 'id': 2, 'name': 'node3', 'status': 'idle', 'blocks': [], 'transactions': [] },
    ],
    accounts: [
        { 'name': 'aki', 'balance': 0 },
        { 'name': 'so', 'balance': 0 },
        { 'name': 'satoshi', 'balance': 0 },
    ],
    port: 50082,
    clock: 0,
    mineTarget: 1,
    tx: { targetNode: 1, 'from': 'so', 'to': 'aki', amount: 1 },
    details: {
        'id': -1,
        'name': '',
        'blocks': '',
        'transactions': '',
    }
};


export default function nodesReducer(state = initialState, action) {
    console.info("nodesReducer: %O", action);
    let nodes;
    let status;
    let accounts;
    let accountId;
    let details;

    switch (action.type) {
        case 'NUM_NODES_CHANGED':
            nodes = [];
            for (let i = 0; i < action.payload.numNodes; i++) {
                nodes.push({ 'id': i, 'name': `node${i + 1}`, 'status': 'idle' });
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
        case 'DETAILS_CHANGED':
            details = {
                id: action.payload.id,
                name: action.payload.name,
                blocks: JSON.stringify(action.payload.blocks),
                transactions: JSON.stringify(action.payload.transactions)
            }
            return {
                ...state,
                details: details
            }
        case 'START':
            return {
                ...state,
                clock: 0
            }
        case 'ALL_BLOCKS_FOR_BALANCE':
            console.info('ALL_BLOCKS_FOR_BALANCE allblocks: %O', action.payload.allblocks);
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
                        accounts[accountId].balance -= parseInt(t.value, 10);
                    }
                    if (t.recipient != null) {
                        accountId = accountNameToId(t.recipient, accounts);
                        accounts[accountId].balance += parseInt(t.value, 10);
                    }
                });
            });

            console.info('accounts: %O', accounts);
            return {
                ...state,
                accounts: accounts
            }
        case 'ALL_BLOCKS':
            // Update blocks per node
            nodes = Array.from(state.nodes);
            nodes[action.payload.nodeIndex].blocks = action.payload.allblocks;
            return {
                ...state,
                nodes: nodes
            }
        case 'ALL_TRANSACTIONS':
            // Update transactions per node
            nodes = Array.from(state.nodes);
            nodes[action.payload.nodeIndex].transactions = action.payload.alltransactions;
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
        case 'MINETARGET_CHANGED':
            return {
                ...state,
                mineTarget: action.payload.mineTarget
            }
        case 'TX_CHANGED':
            let tx = {};
            Object.assign(tx, state.tx);
            if (action.payload.tx.targetNode != null) (
                tx.targetNode = action.payload.tx.targetNode
            )
            if (action.payload.tx.from != null) (
                tx.from = action.payload.tx.from
            )
            if (action.payload.tx.to != null) (
                tx.to = action.payload.tx.to
            )
            if (action.payload.tx.amount != null) (
                tx.amount = action.payload.tx.amount
            )
            return {
                ...state,
                tx: tx
            }
        default:
            return state;
    }
}
