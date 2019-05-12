import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { startAsync, getNodeStatusAsync, setClockAsync, addClockAsync } from '../actions/nodes';
import { Button } from '@material-ui/core';

function Actions({ nodes, port, clock, start, getNodeStatus, setClock, addClock }) {
    return (
        <>
            <h3>Actions:</h3>
            <Button variant="contained" color="primary" onClick={() => start()}>Start</Button>
            <Button variant="contained" color="default" onClick={() => getNodeStatus()}>Get Status</Button>
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
        start() {
            dispatch(startAsync());
        },
        getNodeStatus() {
            dispatch(getNodeStatusAsync());
        },
        setClock(clock) {
            dispatch(setClockAsync(clock));
        },
        addClock(diff) {
            dispatch(addClockAsync(diff));
        }
    };
}

//export default connect(mapStateToProps, mapDispatchToProps)(Actions);
export default compose(
    //    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Actions);
