import React from 'react';
import { connect } from 'react-redux';
import { List, ListItemText } from '@material-ui/core';

function Status({ clock, nodes, port }) {
    return (
        <>
            <h3>Status:</h3>
            <p>clock: {clock}</p>
            <p>TBD: (node animation here)</p>
            <List>
                {
                    nodes.map(function (node, i) {
                        return (
                            <List key={i}><ListItemText primary={`${node.name}) localhost:${i + port}, status:${node.status}`} />
                            </List>
                        );
                    })
                }
            </List>
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