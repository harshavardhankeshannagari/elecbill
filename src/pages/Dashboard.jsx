import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Load complaints from localStorage
    const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
    setComplaints(storedComplaints);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Dashboard</h2>
      <h3>Filed Complaints</h3>
      {complaints.length === 0 ? (
        <p>No complaints filed yet.</p>
      ) : (
        <ul>
          {complaints.map((complaint, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <strong>{complaint.text}</strong>
              <br />
              <small>{complaint.date}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
