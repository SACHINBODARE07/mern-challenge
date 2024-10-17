import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import Statistics from './components/Statistics';
import BarChartComponent from './components/BarChartComponent';
import './App.css';

function App() {
  const [month, setMonth] = useState('03'); // Default to March

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div className="App">
      <h1>MERN Coding Challenge Dashboard</h1>
      <select value={month} onChange={handleMonthChange}>
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <TransactionsTable />
      <Statistics month={month} />
      <BarChartComponent month={month} />
    </div>
  );
}

export default App;
