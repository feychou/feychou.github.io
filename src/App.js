import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <span className="logo">Real Life</span>
          <span className="logo-2">Real Life</span>
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

            <div className="stats-box">
              <div className="stats-box-header">
                <span>Personal Data</span>
              </div>
              <div className="stats-box-entries">
                <div className="stats-box-entry">
                  <span className="stats-box-tag">Name/Primary Alias</span>
                  <span>Fey</span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Metatype</span>
                  <span>Twee Princess</span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Primary Lifestyle</span>
                  <span>Software Developer</span>
                </div>
              </div>
            </div>

            <div className="stats-box">
              <div className="stats-box-header">
                <span>IDS / CONTACTS</span>
              </div>
              <div className="stats-box-entries">
                <div className="stats-box-entry">
                  <span className="stats-box-tag">Github</span>
                  <span>
                    <a target="_blank" href="https://github.com/feychou">feychou</a>
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Stackoverflow</span>
                  <span>
                    <a target="_blank" href="http://stackoverflow.com/users/story/2255082">feychou</a>
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Steam</span>
                  <span>
                    <a target="_blank" href="http://steamcommunity.com/id/feychou/">feychou</a>
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Facebook</span>
                  <span>
                    <a target="_blank" href="https://www.facebook.com/federica.recanatini">federica.recanatini</a>
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Kleiderkreisel</span>
                  <span>
                    <a target="_blank" href="https://www.kleiderkreisel.at/mitglieder/1518602-ashlotte">ashlotte</a>
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">email</span>
                  <span>federica.recanatini@gmail.com</span>
                </div>

              </div>
            </div>
          </div>

          <div className="body-column-right">

            <div className="stats-box">
              <div className="stats-box-header">
                <span>Skills</span>
              </div>
              <div className="stats-box-entries">
                <div className="stats-box-entry">
                  <span>Javascript  ES6  ReactJS  Redux</span>
                </div>

                <div className="stats-box-entry">
                  <span>Jest</span>
                </div>

                <div className="stats-box-entry">
                  <span>Node  Express  Webpack</span>
                </div>

                <div className="stats-box-entry">
                  <span>HTML  CSS  XSLT  JSON</span>
                </div>

                <div className="stats-box-entry">
                  <span>AWS  S3  Heroku</span>
                </div>

                <div className="stats-box-entry">
                  <span>MySQL  DynamoDB </span>
                </div>

                <div className="stats-box-entry">
                  <span>Linux  MacOS</span>
                </div>

                <div className="stats-box-entry">
                  <span>Git  Github  Jenkins  TravisCI</span>
                </div>

                <div className="stats-box-entry">
                  <span>Python  Clojure  Haskell</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
