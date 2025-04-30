import './Navbar.css'; 
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Electricity Billing System</h2>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          {user ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/complaint">Complaint</Link></li>
              <li><Link to="/add-billing">Add Billing</Link></li>
              <li><Link to="/billing-records">Billing Records</Link></li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
