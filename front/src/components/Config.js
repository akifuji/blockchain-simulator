import React from 'react';
import { TextField } from '@material-ui/core';
import { nodesChanged, portChanged } from '../actions/nodes';
import { connect } from 'react-redux';

function Config({ nodes, port, nodesChanged, portChanged }) {
    return (
        <>
            <h3>Config:</h3>
            <TextField label="#Nodes" value={nodes.length} type="number" onChange={(e) => nodesChanged(e.target.value)} />
            <TextField label="First Port" value={port} type="number" onChange={(e) => portChanged(e.target.value)} />
        </>
    );
}

function mapStateToProps({ nodes, port }) {
    return {
        nodes,
        port,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        nodesChanged(numNodes) {
            dispatch(nodesChanged(numNodes));
        },
        portChanged(port) {
            dispatch(portChanged(port));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Config);
