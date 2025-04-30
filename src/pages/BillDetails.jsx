import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BillDetails.css'; // Optional styling

function BillDetails() {
  const navigate = useNavigate();

  const billDetails = {
    month: 'April',
    units: 320,
    rate: 0.15, // per kWh
    totalAmount: 45.75,
    dueDate: '2025-05-01',
    status: 'Pending',
    breakdown: [
      { description: 'Basic Usage', amount: 30 },
      { description: 'Taxes and Fees', amount: 10 },
      { description: 'Late Fee', amount: 5 }
    ]
  };

  const handleDownload = () => {
    // Mock PDF download logic
    alert('Download PDF feature coming soon!');
  };

  return (
    <div className="container bill-details-container">
      <h2>Bill Details - {billDetails.month}</h2>
      <div className="bill-summary">
        <p><strong>Units Consumed:</strong> {billDetails.units} kWh</p>
        <p><strong>Rate per kWh:</strong> ${billDetails.rate}</p>
        <p><strong>Total Amount:</strong> ${billDetails.totalAmount}</p>
        <p><strong>Due Date:</strong> {billDetails.dueDate}</p>
        <p><strong>Status:</strong> {billDetails.status}</p>
      </div>

      <h3>Breakdown</h3>
      <ul>
        {billDetails.breakdown.map((item, index) => (
          <li key={index}>
            <strong>{item.description}:</strong> ${item.amount}
          </li>
        ))}
      </ul>

      <div className="buttons">
        <button onClick={handleDownload}>Download PDF</button>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  );
}

export default BillDetails;
