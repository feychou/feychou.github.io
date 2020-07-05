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
              <span className="info-box-data">Wears anything that's weird enough</span>
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
                  <span className="stats-box-tag">Goodreads</span>
                  <span>
                    <a target="_blank" href="https://www.goodreads.com/feyfeyfey">Fey</a>
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Coursera</span>
                  <span>
                    <a target="_blank" href="https://www.coursera.org/user/91390a08d1d625f59a626ac7070a6fd3">alisa</a>
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Duolingo</span>
                  <span>
                    <a target="_blank" href="https://www.duolingo.com/feychou">feychou</a>
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Memrise</span>
                  <span>
                    <a target="_blank" href="https://www.memrise.com/user/feychoo/courses/learning/">feychoo</a>
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Medium</span>
                  <span>
                    <a target="_blank" href="https://medium.com/@fey.chu">@fey.chu</a>
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Spotify</span>
                  <span>
                    <a target="_blank" href="https://open.spotify.com/user/11175069450">Fey</a>
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">email</span>
                  <span>federica.recanatini@gmail.com</span>
                </div>

              </div>
            </div>

            <div className="stats-box">
              <div className="stats-box-header">
                <span>Projects</span>
              </div>
              <div className="stats-box-entries">

                <div className="stats-box-entry">
                  <span className="stats-box-tag">The Incredible True Story of</span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Antifragility</span>
                  <span>Antifragility in the form of</span>
                </div>

                <div className="stats-box-entry">
                  <span>children story [<a target="_blank" href="https://feychou.github.io/the-incredible-true-story-of-antifragility/">link</a>]</span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Chibo</span>
                  <span>An app to test your ひらがな and</span>
                </div>

                <div className="stats-box-entry">カタカナ knowledge [
                  <a target="_blank" href="https://feychou.github.io/chibo/">link</a>
                ]</div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Javascript: how do I even lib?</span>
                  <span>Slides to my</span>
                </div>

                <div className="stats-box-entry">
                  <span>talk about creating and consuming libs in</span>
                </div>

                <div className="stats-box-entry">Javascript [
                  <a target="_blank" href="https://feychou.github.io/how-do-i-lib/">link</a>
                ]</div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Tsuki 月</span>
                  <span>A Messenger bot that sends you</span>
                </div>

                <div className="stats-box-entry">snapshots from space [
                  <a target="_blank" href="https://www.facebook.com/satounotsuki">link</a>
                ]</div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Nukleus</span>
                  <span>Collection of React UI components</span>
                </div>

                <div className="stats-box-entry">
                  <span>for kununu [
                    <a target="_blank" href="https://kununu.github.io/nukleus/">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Ouija</span>
                  <span>A gridfont editor [
                    <a target="_blank" href="https://baphomet-berlin.github.io/ouija/">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">nocker</span>
                  <span>Dockerized Node app skeleton for</span>
                </div>

                <div className="stats-box-entry">
                  <span>development and production [
                    <a target="_blank" href="https://github.com/feychou/nocker">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span className="stats-box-tag">Brainjig</span>
                  <span>Browser puzzle game featuring</span>
                </div>

                <div className="stats-box-entry">
                  <span>Jigglipuffs and Pikachus [
                    <a target="_blank" href="http://feychou.github.io/brainjig/">link</a>
                  ]</span>
                </div>
              </div>
            </div>

            <div className="stats-box">
              <div className="stats-box-header">
                <span>Cyberdeck</span>
              </div>
              <div className="stats-box-entries">
                <div className="stats-box-entry">
                  <span className="stats-box-tag">TUXEDO Book XC1407 v2</span>
                </div>

                <div className="stats-box-entry">
                  <span>14&quot; matt Full-HD IPS-Display</span>
                </div>

                <div className="stats-box-entry">
                  <span>Aluminium-Cover</span>
                </div>

                <div className="stats-box-entry">
                  <span>NVIDIA Geforce GTX 1050 Ti Grafik</span>
                </div>

                <div className="stats-box-entry">
                  <span>500 GB HDD (HGST/WD / 7.200 rpm / 2,5&quot;)</span>
                </div>

                <div className="stats-box-entry">
                  <span>250 GB Samsung 850 EVO</span>
                </div>

                <div className="stats-box-entry">
                  <span>Intel Core i7 Quad-Core</span>
                </div>

                <div className="stats-box-entry">
                  <span>16GB RAM</span>
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
                  <span>Clojure ClojureScript Reagent re-frame</span>
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
                  <span>Python Haskell</span>
                </div>
              </div>
            </div>

            <div className="stats-box">
              <div className="stats-box-header">
                <span>Adept Powers or Other Abilities</span>
              </div>

              <div className="stats-box-entries">

                <div className="stats-box-entry">
                  <span>Blockchain Basics</span>
                  <span>[
                    <a target="_blank" href="https://www.coursera.org/account/accomplishments/certificate/22878BJVAKV6">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span>Smart Contracts</span>
                  <span>[
                    <a target="_blank" href="https://www.coursera.org/account/accomplishments/certificate/8G2RWJAKYQU6">link</a>
                  ]</span>                
                </div>

                <div className="stats-box-entry">
                  <span>International Cyber Conflicts [
                    <a target="_blank" href="https://www.coursera.org/account/accomplishments/certificate/9UEBEB2SGPNW">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span>
                    [<a target="_blank" href="https://www.coursera.org/learn/cyber-conflicts">link</a>]
                  </span>
                </div>

                <div className="stats-box-entry">
                  <span>Hacking web applications – case studies of</span>
                </div>

                <div className="stats-box-entry">
                  <span>award-winning bugs in Google, Yahoo,</span>
                </div>

                <div className="stats-box-entry">
                  <span> Mozilla and more </span>
                  <span> [
                    <a target="_blank" href="http://blog.deepsec.net/deepsec-2016-workshop-hacking-web-applications-case-studies-of-award-winning-bugs-in-google-yahoo-mozilla-and-more-dawid-czagan/">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span>Lemmings - Incubator focused on AI and</span>
                </div>

                <div className="stats-box-entry">
                  <span>chatbots </span>
                  <span>[
                    <a target="_blank" href="https://lemmings.io/">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span>Bitcoin and Cryptocurrency Technologies </span>
                </div>

                <div className="stats-box-entry">
                  <span>[
                    <a target="_blank" href="https://www.coursera.org/learn/cryptocurrency">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span>Internet History, Technology, and Security</span>
                </div>

                <div className="stats-box-entry">
                  <span>[
                    <a target="_blank" href="https://www.coursera.org/learn/internet-history">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span>Introduction to Game Design </span>
                  <span>[
                    <a target="_blank" href="https://www.coursera.org/learn/game-design">link</a>
                  ] </span>
                  <span>[
                    <a target="_blank" href="http://i.imgur.com/XsPIM3P.jpg">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span>Dino 101: Dinosaur Paleobiology </span>
                  <span>[
                    <a target="_blank" href="https://www.coursera.org/learn/dino101">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span>Paleontology: Theropod Dinosaurs and the</span>
                </div>

                <div className="stats-box-entry">
                  <span>Origin of Birds </span>
                  <span>[
                    <a target="_blank" href="https://www.coursera.org/learn/theropods-birds/">link</a>
                  ]</span>
                </div>

                <div className="stats-box-entry">
                  <span>Philosophy and the Sciences: Introduction</span>
                </div>

                <div className="stats-box-entry">
                  <span>to the Philosophy of Cognitive Sciences </span>
                </div>

                <div className="stats-box-entry">
                  <span>[
                    <a target="_blank" href="https://www.coursera.org/learn/philosophy-cognitive-sciences/">link</a>
                  ]</span>
                </div>
              </div>
            </div>

            <div className="stats-box">
              <div className="stats-box-header">
                <span>Augmentations</span>
              </div>
              <div className="stats-box-entries">
                <div className="stats-box-entry">
                  <span>Neural implant for German, French, Italian</span>
                </div>

                <div className="stats-box-entry">
                  <span>and Japanese insta-translations</span>
                </div>
              </div>
            </div>

            <div className="stats-box">
              <div className="stats-box-header">
                <span>Gear</span>
              </div>
              <div className="stats-box-entries">
                <div className="stats-box-entry">
                  <span>Clunky cybersneakers</span>
                </div>

                <div className="stats-box-entry">
                  <span>Kawaii bandaids</span>
                </div>

                <div className="stats-box-entry">
                  <span>Vitamin D and sunscreen</span>
                </div>

                <div className="stats-box-entry">
                  <span>Pink Nintendo DS</span>
                </div>

                <div className="stats-box-entry">
                  <span>Obligatory Nekomimi</span>
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
