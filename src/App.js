import './App.css';
import React from 'react';
import DropDown from './DropDown.js';
import LineChart from './LineChart.js';
import BarChartGraph from './BarChartGraph.js';
import Header from './Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <DropDown>
        <LineChart />
        <BarChartGraph />
      </DropDown>
    </div>
  );
}

export default App;
