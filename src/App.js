// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Complaint from './pages/Complaint';
import PrivateRoute from './components/PrivateRoute';
import BillingList from './pages/BillingList';
import AddBilling from './pages/AddBilling';

function App() {
  const [bills, setBills] = useState([]);  // State to store bills

  // Function to add a new bill
  const addBill = (billData) => {
    setBills((prevBills) => [...prevBills, billData]);
    console.log('Bill added:', billData); // Log the bill data for debugging
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/complaint" element={<Complaint />} />
          {/* Pass addBill as a prop to AddBilling component */}
          <Route path="/add-billing" element={<AddBilling addBill={addBill} />} />
          <Route path="/billing-records" element={<BillingList bills={bills} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
