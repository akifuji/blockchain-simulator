import React from 'react';
import './App.css';
import { CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import Config from './Config';
import Actions from './Actions';
import States from './States';

function App({ nodes, port, clock }) {
  return (
    <div className="App">
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit">
            Blockchain Simulator
            </Typography>
        </Toolbar>
      </AppBar>

      <Config />
      <Actions />
      <States />
    </div>
  );
}

function mapStateToProps({ nodes, port, clock }) {
  return {
    nodes,
    port,
    clock,
  };
}

export default connect(mapStateToProps, null)(App);
