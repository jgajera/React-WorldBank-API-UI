import './App.css';
import React from 'react';
import DropDown from './DropDown.js';
import Chart from './Chart.js';
import Header from './Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <DropDown>
        <Chart />
      </DropDown>
    </div>
  );
}

export default App;
