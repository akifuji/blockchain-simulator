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

const start = (nodeIndex, responseText) => ({
    type: 'START',
    payload: {
        nodeIndex: nodeIndex,
        response: responseText
    }
})

const updateBalance = (responseJson) => ({
    type: 'ALL_BLOCKS_FOR_BALANCE',
    payload: {
        allblocks: responseJson
    }
})

const updateBlockchain = (nodeIndex, responseJson) => ({
    type: 'ALL_BLOCKS',
    payload: {
        nodeIndex: nodeIndex,
        allblocks: responseJson
    }
})

const updateTxPool = (nodeIndex, responseJson) => ({
    type: 'ALL_TRANSACTIONS',
    payload: {
        nodeIndex: nodeIndex,
        alltransactions: responseJson
    }
})
function sendMessage(state, dispatch, message) {
    let p = 0;
    state.nodes.forEach(node => {
        let fullurl = `http://localhost:${state.port + p}/${message}`;
        console.info(`calling ${fullurl}`);
        sendMessagePerNode(state, dispatch, fullurl, p);
        p++;
    });
}

function sendMessagePerNode(state, dispatch, fullurl, nodeIndex) {
    fetch(fullurl).then(response => response.text())
        .then((responseText) => {
            console.info('nodeIndex: %d, response: %s', nodeIndex, responseText);
            dispatch(start(nodeIndex, responseText));
        })
        .then(() => {
            // only the first node update balances
            if (nodeIndex === 0) {
                let fullurl = `http://localhost:${state.port + nodeIndex}/block/all`;
                console.info('calling %s', fullurl);
                fetch(fullurl).then(response => response.json())
                    .then((responseJson) => {
                        dispatch(updateBalance(responseJson));
                    })
            }
        });
}

export function startAsync() {
    return (dispatch, getState) => {
        sendMessage(getState(), dispatch, "start");
    };
}

export function resetAsync() {
    return (dispatch, getState) => {
        sendMessage(getState(), dispatch, "reset");
    };
}

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
        })
        .then(() => {
            let fullurl = `http://localhost:${state.port + nodeIndex}/block/all`;
            console.info('calling %s', fullurl);
            fetch(fullurl).then(response => response.json())
                .then((responseJson) => {
                    // only the first node updates balances
                    if (nodeIndex === 0) {
                        dispatch(updateBalance(responseJson));
                    }
                    // all nodes update their blockchain length
                    dispatch(updateBlockchain(nodeIndex, responseJson))
                });
            fullurl = `http://localhost:${state.port + nodeIndex}/txPool/all`;
            console.info('calling %s', fullurl);
            fetch(fullurl).then(response => response.json())
                .then((responseJson) => {

                    // all nodes update their txPool length
                    dispatch(updateTxPool(nodeIndex, responseJson))
                })
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

        fetch(fullurl).then((response) => response.text())
            .then((responseText) => {
                console.info(responseText);
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

export const mineTargetChanged = (mineTarget) => ({
    type: 'MINETARGET_CHANGED',
    payload: {
        mineTarget: parseInt(mineTarget, 10)
    }
});

export const txTargetChanged = (target) => ({
    type: 'TX_CHANGED',
    payload: {
        tx: { targetNode: parseInt(target, 10) }
    }
});

export const txSenderChanged = (from) => ({
    type: 'TX_CHANGED',
    payload: {
        tx: { from: from }
    }
});

export const txRecipientChanged = (to) => ({
    type: 'TX_CHANGED',
    payload: {
        tx: { to: to }
    }
});

export const txAmountChanged = (amount) => ({
    type: 'TX_CHANGED',
    payload: {
        tx: { amount: amount }
    }
});

export function mine() {
    return (dispatch, getState) => {
        let targetNode = getState().mineTarget - 1;
        let port = getState().port;

        let fullurl = `http://localhost:${port + targetNode}/mine`;
        console.info(`calling ${fullurl}`);

        fetch(fullurl).then((response) => response.text())
            .then((responseText) => {
                console.info(responseText);
                // mine() doesn't dispatch -> fire & forget
            });
    };
}

export function addTx() {
    return (dispatch, getState) => {
        let targetNode = getState().tx.targetNode - 1;
        let port = getState().port;

        let fullurl = `http://localhost:${port + targetNode}/tx/add`;
        const obj = { sender: getState().tx.from, recipient: getState().tx.to, value: getState().tx.amount };
        const method = "POST";
        const body = JSON.stringify(obj);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };

        console.info(`calling ${fullurl}`);
        console.info("with post data %O", obj);

        fetch(fullurl, { method, headers, body }).then((response) => response.text())
            .then((responseText) => {
                console.info(responseText);
                // addTx() doesn't dispatch -> fire & forget
            });
    };
}
