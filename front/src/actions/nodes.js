import fetch from 'isomorphic-unfetch'

export const nodesChanged = (numNodes) => ({
    type: 'NUM_NODES_CHANGED',
    payload: {
        numNodes: parseInt(numNodes, 10)
    }
});


export const portChanged = (port) => ({
    type: 'PORT_CHANGED',
    payload: {
        port: parseInt(port, 10)
    }
})

const getNodeStatus = (nodeIndex, status) => ({
    type: 'GET_NODE_STATUS',
    payload: {
        nodeIndex: nodeIndex,
        status: status
    }
})

function updateNodeStatus(state, dispatch) {
    let p = 0;

    state.nodes.forEach(node => {
        let fullurl = `http://localhost:${state.port + p}/status`;
        console.info(`calling ${fullurl}`);
        updateNodeStatusPerNode(state, dispatch, fullurl, p);
        p++;
    });
}

function updateNodeStatusPerNode(state, dispatch, fullurl, nodeIndex) {
    fetch(fullurl).then(response => response.json())
        .then((responseJson) => {
            console.info('nodeIndex: %d, status: %s', nodeIndex, responseJson.status);
            dispatch(getNodeStatus(nodeIndex, responseJson.status));
        });
}

export function getNodeStatusAsync() {
    return (dispatch, getState) => {
        updateNodeStatus(getState(), dispatch);
    };
}

const setClockSub = (clock) => ({
    type: 'SET_CLOCK',
    payload: {
        clock: clock
    }
})

function setClock(state, dispatch, clk) {
    let p = 0;

    state.nodes.forEach(node => {
        let fullurl = `http://localhost:${state.port + p}/clock/${clk}`;
        console.info(`calling ${fullurl}`);
        let getStatusUrl = `http://localhost:${state.port + p}/status`;
        let getStatusNodeIndex = p;

        fetch(fullurl).then((response) => response.json())
            .then((responseJson) => {
                console.info(responseJson);
                updateNodeStatusPerNode(state, dispatch, getStatusUrl, getStatusNodeIndex);
                dispatch(setClockSub(clk));
            });
        p++;
    });
}

export function addClockAsync(diff) {

    return (dispatch, getState) => {
        let clk = getState().clock + diff;
        setClock(getState(), dispatch, clk);
    };
}

export function setClockAsync(clk) {
    return (dispatch, getState) => {
        setClock(getState(), dispatch, clk);
    };
}