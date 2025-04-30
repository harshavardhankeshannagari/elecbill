import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Complaint() {
  const [complaint, setComplaint] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setComplaint(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaint.trim()) {
      setMessage('Please enter a complaint!');
      return;
    }

    // Save complaint as an object with text and date
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];

    const newComplaint = {
      text: complaint,
      date: new Date().toLocaleString(),
    };

    complaints.push(newComplaint);
    localStorage.setItem('complaints', JSON.stringify(complaints));

    setMessage('Complaint filed successfully!');
    setComplaint('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>File a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={complaint}
          onChange={handleChange}
          placeholder="Describe your complaint here..."
          rows="5"
          style={{ width: '100%', padding: '10px' }}
        />
        <br />
        <button type="submit" style={{ marginTop: '10px' }}>Submit Complaint</button>
        {message && <p style={{ color: 'green' }}>{message}</p>}
      </form>
    </div>
  );
}

export default Complaint;
