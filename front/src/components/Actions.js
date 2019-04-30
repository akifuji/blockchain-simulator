import React from 'react';
import { connect } from 'react-redux';
import { getNodeStates, setClock, addClock } from '../actions/nodes';
import { Button, TextField, List, ListItemText } from '@material-ui/core';

function Actions({ nodes, port, clock, getNodeStates, setClock, addClock }) {
    return (
        <>
            <h3>Actions:</h3>
            <Button variant="contained" color="primary" onClick={() => getNodeStates()}>Get States</Button>
            <Button variant="contained" color="default" onClick={() => addClock(1)} > Clock++</Button>
            <Button variant="contained" color="default" onClick={() => addClock(-1)}> Clock--</Button >
            <Button variant="contained" color="default" onClick={() => setClock(0)}>Reset Clock</Button>
        </>
    );
}

function mapStateToProps({ nodes, port, clock }) {
    return {
        nodes,
        port,
        clock,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getNodeStates() {
            dispatch(getNodeStates());
        },
        setClock(clock) {
            dispatch(setClock(clock));
        },
        addClock(diff) {
            dispatch(addClock(diff));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions);