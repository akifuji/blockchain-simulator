import fetch from 'isomorphic-unfetch'

const initialState = {
    nodes: [
        { 'name': 'node1', 'status': 'idle' },
        { 'name': 'node2', 'status': 'idle' },
        { 'name': 'node3', 'status': 'idle' },
    ],
    port: 10001,
    clock: 0,
};

function updateClock(state, clk) {
    let p = 0;
    state.nodes.forEach(node => {
        let fullurl = `http://localhost:${state.port + p}/clock/${clk}`;
        console.info(`calling ${fullurl}`);

        fetch(fullurl).then((response) => response.json())
            .then((responseJson) => console.info(responseJson));
        p++;
    });
}

function updateNodeStatus(state) {
    let p = 0;

    state.nodes.forEach(node => {
        let fullurl = `http://localhost:${state.port + p}/status`;
        console.info(`calling ${fullurl}`);
        updateNodeStatusPerNode(state, fullurl, p);
        p++;
    });
}

function updateNodeStatusPerNode(state, fullurl, nodeIndex) {
    fetch(fullurl).then(response => response.json())
        .then((responseJson) => {
            console.info('nodeIndex: %d, status: %s', nodeIndex, responseJson.status);
            state.nodes[nodeIndex].status = responseJson.status;
        });
}

export default function nodesReducer(state = initialState, action) {
    console.info("nodesReducer: %O", action);
    switch (action.type) {
        case 'NUM_NODES_CHANGED':
            let nodes = [];
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
        case 'GET_NODE_STATUS':
            // TODO: update node status. This doesn't work because updateNodeStatus is async.
            updateNodeStatus(state);
            return state;
        case 'SET_CLOCK':
            // send new clcok to all nodes
            updateClock(state, action.payload.clock);
            return {
                ...state,
                clock: action.payload.clock
            }
        case 'ADD_CLOCK':
            let diff = action.payload.diff
            let newClock = state.clock + diff
            // send new clcok to all nodes
            updateClock(state, newClock);
            return {
                ...state,
                clock: newClock
            }
        default:
            return state;
    }
}
