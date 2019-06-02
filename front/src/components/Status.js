import React from 'react';
import { connect } from 'react-redux';
import Node from './Node';

function Status({ clock, nodes }) {
    return (
        <>
            <h3>Status:</h3>
            <p>clock: {clock}</p>
            {
                nodes.map(function (node, i) {
                    return (
                        <Node key={i} id={`${node.id}`} />
                    );
                })
            }
        </>
    );
}

function mapStateToProps({ nodes, clock }) {
    return {
        nodes,
        clock,
    };
}

export default connect(mapStateToProps, null)(Status);