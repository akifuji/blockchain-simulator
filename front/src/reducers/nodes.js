import fetch from 'isomorphic-unfetch'

const initialState = {
    nodes: ['node1', 'node2', 'node3'],
    port: 10001,
    clock: 0,
};

function httpget(host, port, url) {
    //let fullurl = `http://${host}:${port}${url}`;
    let fullurl = `http://localhost:${port}${url}`;
    console.info(`calling ${fullurl}`);

    fetch(fullurl).then((response) => response.json())
        .then((responseJson) => console.info(responseJson));
}

function updateClock(state, clk) {
    let p = 0;
    state.nodes.forEach(node => {
        httpget(node, state.port + p, '/clock/' + clk);
        p++;
    });
}

export default function nodesReducer(state = initialState, action) {
    console.info("nodesReducer: %O", action);
    switch (action.type) {
        case 'NUM_NODES_CHANGED':
            let nodes = [];
            for (let i = 0; i < action.payload.numNodes; i++) {
                nodes.push(`node${i + 1} `);
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
