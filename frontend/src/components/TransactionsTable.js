// src/components/TransactionsTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState('03'); // Default to March
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/transactions`, {
        params: { month, search, page, perPage: 10 }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    setPage(1); // Reset page when month changes
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1); // Reset page when search changes
  };

  const handleNextPage = () => setPage(page + 1);
  const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);

  return (
    <div>
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
      <input 
        type="text" 
        placeholder="Search transactions..." 
        value={search} 
        onChange={handleSearchChange} 
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default TransactionsTable;
