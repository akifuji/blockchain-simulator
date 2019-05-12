import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { connect } from 'react-redux';
import Config from './Config';
import Actions from './Actions';
import Accounts from './Accounts';
import Status from './Status';

function App({ nodes, port, clock }) {
  return (
    <div className="App">
      <CssBaseline />
      <h2>Blockchain Simulator</h2>

      <div className="TwoSections" >
        <div className="SectionLeft" >
          <Config />
        </div>
        <div className="SectionRight" >
          <Accounts />
        </div>
      </div>
      <div className="Section" >
        <Actions />
      </div>
      <div className="Section" >
        <Status />
      </div>
    </div >
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
