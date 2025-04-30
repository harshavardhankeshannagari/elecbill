import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // optional styling

function SignIn() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    if (!storedUser) {
      setMessage('No account found! Please sign up first.');
      return;
    }

    if (storedUser.email === credentials.email && storedUser.password === credentials.password) {
      setMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500); // redirect to dashboard
    } else {
      setMessage('Invalid email or password.');
    }
  };

  return (
    <div className="container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign In</button>
        {message && <p className="message">{message}</p>}
      </form>
      <p>Don't have an account? <span className="link" onClick={() => navigate('/signup')}>Sign Up</span></p>
    </div>
  );
}

export default SignIn;
