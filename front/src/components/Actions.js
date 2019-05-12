import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { startAsync, getNodeStatusAsync, setClockAsync, addClockAsync, mineTargetChanged, txTargetChanged, txSenderChanged, txRecipientChanged, txAmountChanged, mine, addTx } from '../actions/nodes';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

function Actions({ nodes, port, clock, mineTarget, tx, start, getNodeStatus, setClock, addClock, mine, addTx, mineTargetChanged, txTargetChanged, txSenderChanged, txRecipientChanged, txAmountChanged }) {
    return (
        <>
            <h3>Actions:</h3>
            <Button variant="contained" color="primary" onClick={() => start()}>Start</Button>
            {' '}
            {/* <Button variant="contained" color="default" onClick={() => getNodeStatus()}>Get Status</Button>
            {' '} */}
            <Button variant="contained" color="default" onClick={() => addClock(1)} > Clock++</Button>
            {' '}
            <Button variant="contained" color="default" onClick={() => setClock(0)}>Reset Clock</Button>
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={() => mine()}>Mine</Button>
            {' '}
            <TextField label="Target Node" value={mineTarget} type="number" onChange={(e) => mineTargetChanged(e.target.value)} />
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={() => addTx()}>Add Transaction</Button>
            {' '}
            <TextField label="Target Node" value={tx.targetNode} type="number" onChange={(e) => txTargetChanged(e.target.value)} />
            {' '}
            <TextField label="Sender" value={tx.from} type="string" onChange={(e) => txSenderChanged(e.target.value)} />
            {' '}
            <TextField label="Recipient" value={tx.to} type="string" onChange={(e) => txRecipientChanged(e.target.value)} />
            {' '}
            <TextField label="Amount" value={tx.amount} type="number" onChange={(e) => txAmountChanged(e.target.value)} />
        </>
    );
}

function mapStateToProps({ nodes, port, clock, mineTarget, tx }) {
    return {
        nodes,
        port,
        clock,
        mineTarget,
        tx,
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
        },
        mineTargetChanged(mineTarget) {
            dispatch(mineTargetChanged(mineTarget));
        },
        txTargetChanged(target) {
            dispatch(txTargetChanged(target));
        },
        txSenderChanged(sender) {
            dispatch(txSenderChanged(sender));
        },
        txRecipientChanged(recepient) {
            dispatch(txRecipientChanged(recepient));
        },
        txAmountChanged(amount) {
            dispatch(txAmountChanged(amount));
        },
        mine() {
            dispatch(mine());
        },
        addTx() {
            dispatch(addTx());
        }
    };
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Actions);
