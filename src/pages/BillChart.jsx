import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

function BillChart({ records }) {
  const months = [...new Set(records.map(r => r.month))];

  const data = months.map(month => {
    const monthlyRecords = records.filter(r => r.month === month);
    const totalUnits = monthlyRecords.reduce((acc, curr) => acc + Number(curr.units), 0);
    const totalAmount = monthlyRecords.reduce((acc, curr) => acc + Number(curr.amount), 0);
    return { month, totalUnits, totalAmount };
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Total Units',
        data: data.map(d => d.totalUnits),
        backgroundColor: '#4caf50',
      },
      {
        label: 'Total Amount',
        data: data.map(d => d.totalAmount),
        backgroundColor: '#ff5722',
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>📊 Monthly Usage & Amount</h3>
      <Bar data={chartData} />
    </div>
  );
}

export default BillChart;
