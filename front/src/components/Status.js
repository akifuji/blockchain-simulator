import React from 'react';
import { connect } from 'react-redux';
import { List, ListItemText } from '@material-ui/core';
import Node from './Node';

function Status({ clock, nodes, port }) {
    return (
        <>
            <h3>Status:</h3>
            <p>clock: {clock}</p>
            {
                nodes.map(function (node, i) {
                    return (
                        <Node name={`${node.name}`} status={`${node.status}`} />
                    );
                })
            }
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

export default connect(mapStateToProps, null)(Status);