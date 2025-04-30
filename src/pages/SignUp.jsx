import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // optional separate styling

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      setMessage('Please fill all fields');
      return;
    }
    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    setMessage('Account created! Redirecting...');
    setTimeout(() => navigate('/'), 1500); // redirect to sign in
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign Up</button>
        {message && <p className="message">{message}</p>}
      </form>
      <p>Already have an account? <span className="link" onClick={() => navigate('/')}>Sign In</span></p>
    </div>
  );
}

export default SignUp;
