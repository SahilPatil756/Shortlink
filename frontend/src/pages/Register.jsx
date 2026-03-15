import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/auth/register`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="container flex justify-center items-center animate-fade-in" style={{ minHeight: '80vh' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 className="text-center mb-8" style={{ fontSize: '2rem' }}>Create Account</h2>
        {error && <div style={{ color: '#ef4444', marginBottom: '16px', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Email</label>
            <input type="email" className="input-glass" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Password</label>
            <input type="password" className="input-glass" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Confirm Password</label>
            <input type="password" className="input-glass" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary mt-4" style={{ width: '100%' }}>Sign Up</button>
        </form>
        <p className="text-center mt-8" style={{ color: 'var(--text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: '#60a5fa', textDecoration: 'none' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
