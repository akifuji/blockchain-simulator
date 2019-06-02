import React from 'react';
import { connect } from 'react-redux';
import Node from './Node';

function Details({ details }) {
    return (
        <>
            <h3>Details:</h3>
            <p>Node ID: {details.id}</p>
            <p>Node Name: {details.name}</p>
            <p>Blocks: {details.blocks}</p>
            <p>Transactions: {details.transactions}</p>
        </>
    );
}

function mapStateToProps({ details }) {
    return {
        details,
    };
}

export default connect(mapStateToProps, null)(Details);