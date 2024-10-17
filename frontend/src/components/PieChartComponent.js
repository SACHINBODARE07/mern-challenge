import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const PieChartComponent = ({ month }) => {
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        const fetchPieData = async () => {
            const response = await axios.get(`http://localhost:7000/api/transactions/piechart`, {
                params: { month }
            });
            setPieData(response.data);
        };

        fetchPieData();
    }, [month]);

    return (
        <PieChart width={400} height={400}>
            <Pie data={pieData} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export default PieChartComponent;
