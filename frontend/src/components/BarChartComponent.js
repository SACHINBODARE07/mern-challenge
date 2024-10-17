// src/components/BarChartComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const BarChartComponent = ({ month }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    fetchBarData();
  }, [month]);

  const fetchBarData = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/transactions/barchart`, {
        params: { month }
      });
      setBarData(response.data);
    } catch (error) {
      console.error("Error fetching bar chart data", error);
    }
  };

  return (
    <BarChart width={600} height={300} data={barData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChartComponent;
