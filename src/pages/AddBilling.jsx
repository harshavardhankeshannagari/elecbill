import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddBilling.css';

function AddBilling() {
  const [name, setName] = useState('');
  const [meter, setMeter] = useState('');
  const [month, setMonth] = useState('');
  const [units, setUnits] = useState('');
  const [amount, setAmount] = useState('');

  const navigate = useNavigate();

  // Save the new billing record
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !meter || !month || !units || !amount) {
      alert('Please fill out all fields');
      return;
    }

    const newRecord = {
      id: Date.now(),
      name,
      meter,
      month,
      units,
      amount,
    };

    const storedRecords = JSON.parse(localStorage.getItem('billings')) || [];
    storedRecords.push(newRecord);
    localStorage.setItem('billings', JSON.stringify(storedRecords));

    // Redirect to billing list page after successful add
    navigate('/billing-records');
  };

  return (
    <div className="add-billing-container">
      <h2>Add Billing Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Meter Number</label>
          <input
            type="text"
            value={meter}
            onChange={(e) => setMeter(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option value="">Select Month</option>
            {['January', 'February', 'March', 'April', 'May'].map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Units</label>
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Billing</button>
      </form>
    </div>
  );
}

export default AddBilling;
