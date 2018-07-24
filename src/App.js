import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import PlayButton from './Tic/Tic';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <PlayButton sample="E808_RS-03.wav" title='Toc !' />
        <PlayButton sample="E808_CL-01.wav" title='Tic !' />
      </div>
    );
  }
}

export default App;
