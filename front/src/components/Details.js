import React from 'react';
import { connect } from 'react-redux';
import Node from './Node';

function Details({ details }) {
    return (
        <>
            <h3>Details:</h3>
            {/* <p>Node ID: {details.id}</p> */}
            <p>Node Name: {details.name}</p>
            <p> Blocks:
            <div><pre>{JSON.stringify(details.blocks, null, 2)}</pre></div>
            </p>
            <p>Transactions:
            <div><pre>{JSON.stringify(details.transactions, null, 2)}</pre></div>
            </p>
            <br />
        </>
    );
}

function mapStateToProps({ details }) {
    return {
        details,
    };
}

export default connect(mapStateToProps, null)(Details);