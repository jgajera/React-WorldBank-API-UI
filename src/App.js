import logo from './logo.svg';
import './App.css';
import React from 'react';
import DropDown from './DropDown.js';
// import Chart from './Chart.js';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <header className="App-header">
        <h1>
          Country Explorer
        </h1>
        <p>
          WorldBank API UI
        </p>
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <DropDown>
      </DropDown>
    </div>
  );
}

export default App;
