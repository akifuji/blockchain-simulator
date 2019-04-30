import React from 'react';
import { connect } from 'react-redux';
import { List, ListItemText } from '@material-ui/core';

function States({ clock, nodes, port }) {
    return (
        <>
            <h3>States:</h3>
            <p>clock: {clock}</p>
            <p>TBD: (node animation here)</p>
            <List>
                {
                    nodes.map(function (item, i) {
                        return (
                            <List key={i}><ListItemText primary={`${item}) localhost:${i + port}`} />
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

export default connect(mapStateToProps, null)(States);