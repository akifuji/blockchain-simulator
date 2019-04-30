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

export const getNodeStatus = () => ({
    type: 'GET_NODE_STATUS',
    payload: {}
})

export const setClock = (clock) => ({
    type: 'SET_CLOCK',
    payload: {
        clock: clock
    }
})

export const addClock = (diff) => ({
    type: 'ADD_CLOCK',
    payload: {
        diff: diff
    }
})