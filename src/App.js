import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <span className="logo">Real Life</span>
          <div className="header-info-box">
            <div className="info-box-row">
              <span className="info-box-title">character</span>
              <span className="info-box-data">Fey</span>
            </div>
            <div className="info-box-row">
              <span className="info-box-title">player</span>
              <span className="info-box-data">Federica Recanatini</span>
            </div>
            <div className="info-box-row">
              <span className="info-box-title">notes</span>
              <span className="info-box-data">Hates spicy food</span>
            </div>
          </div>
        </div>

        <div className="App-body">
          <div className="body-column-left">
            BU
            <span></span>
          </div>

          <div className="body-column-right">
            BU
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
