const initialState = {
    nodes: [
        { 'name': 'node1', 'status': 'idle' },
        { 'name': 'node2', 'status': 'idle' },
        { 'name': 'node3', 'status': 'idle' },
    ],
    port: 50082,
    clock: 0,
};


export default function nodesReducer(state = initialState, action) {
    console.info("nodesReducer: %O", action);
    let nodes;
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
            // TODO: Update accounts/balance
            return {
                ...state
            }
        case 'GET_NODE_STATUS':
            nodes = Array.from(state.nodes);
            nodes[action.payload.nodeIndex].status = action.payload.status;
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
