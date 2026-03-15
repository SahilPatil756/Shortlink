import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container flex justify-center items-center animate-fade-in" style={{ minHeight: '80vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 className="text-center mb-8" style={{ fontSize: '2rem' }}>Welcome Back</h2>
        {error && <div style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email</label>
            <input type="email" className="input-glass" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Password</label>
            <input type="password" className="input-glass" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary mt-4" style={{ width: '100%' }}>Log In</button>
        </form>
        <p className="text-center mt-8" style={{ color: 'var(--text-secondary)' }}>
          Don't have an account? <Link to="/register" style={{ color: '#60a5fa', textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
