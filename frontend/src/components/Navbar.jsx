import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">ShortLink<span style={{color: '#fff'}}>.</span></Link>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="btn-secondary" style={{marginLeft: '24px', padding: '8px 16px'}}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
