const initialState = {
    nodes: ['node1', 'node2', 'node3'],
    port: 10001,
    clock: 0,
};

export default function nodesReducer(state = initialState, action) {
    console.info("nodesReducer: %O", action);
    switch (action.type) {
        case 'NUM_NODES_CHANGED':
            let nodes = [];
            for (let i = 0; i < action.payload.numNodes; i++) {
                nodes.push(`node${i + 1}`);
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
        case 'GET_NODE_STATES':
            // TODO: update node states
            return state;
        case 'SET_CLOCK':
            // TODO: send new clcok to all nodes
            return {
                ...state,
                clock: action.payload.clock
            }
        case 'ADD_CLOCK':
            // TODO: send new clcok to all nodes
            let diff = action.payload.diff
            let newClock = state.clock + diff
            return {
                ...state,
                clock: newClock
            }
        default:
            return state;
    }
}
