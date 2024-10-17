// src/components/Statistics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({ totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/transactions/statistics`, {
        params: { month }
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching statistics", error);
    }
  };

  return (
    <div>
      <h2>Statistics for Selected Month</h2>
      <p>Total Sale Amount: {stats.totalSaleAmount}</p>
      <p>Total Sold Items: {stats.totalSoldItems}</p>
      <p>Total Not Sold Items: {stats.totalNotSoldItems}</p>
    </div>
  );
};

export default Statistics;
