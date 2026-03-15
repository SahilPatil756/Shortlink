import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Link2, Copy, BarChart2, ExternalLink } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const navigate = useNavigate();

  const fetchLinks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${API_URL}/api/links`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLinks(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${API_URL}/api/links`, 
        { originalUrl: url, customAlias: customAlias || undefined },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUrl('');
      setCustomAlias('');
      fetchLinks();
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Dashboard</h1>
      </div>

      <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
        <h2 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Create New Link</h2>
        <form onSubmit={handleCreate} className="flex gap-4" style={{ flexWrap: 'wrap' }}>
          <div style={{ flex: '2', minWidth: '300px', position: 'relative' }}>
            <Link2 size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="url" 
              className="input-glass" 
              placeholder="Destination URL (https://...)" 
              style={{ paddingLeft: '48px' }}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <input 
              type="text" 
              className="input-glass" 
              placeholder="Custom Alias (optional)" 
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading} style={{ minWidth: '150px' }}>
            {loading ? 'Creating...' : 'Create Link'}
          </button>
        </form>
      </div>

      <h2 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Your Links</h2>
      {fetchLoading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Loading links...</p>
      ) : links.length === 0 ? (
        <div className="glass-card text-center" style={{ padding: '64px 24px' }}>
          <Link2 size={48} style={{ color: 'var(--text-secondary)', marginBottom: '16px', opacity: 0.5 }} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No links created yet. Create your first short link above!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {links.map((link) => (
            <div key={link._id} className="glass-card flex justify-between items-center" style={{ padding: '24px' }}>
              <div style={{ overflow: 'hidden', flex: 1, paddingRight: '24px' }}>
                <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${link.shortCode}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>
                  {import.meta.env.VITE_API_URL || 'localhost:5000'}/{link.shortCode} <ExternalLink size={16} />
                </a>
                <p style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {link.originalUrl}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px' }}>
                  Created {new Date(link.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  className="btn-secondary flex items-center gap-4" 
                  onClick={() => { navigator.clipboard.writeText(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${link.shortCode}`); }}
                  title="Copy Link"
                >
                  <Copy size={18} />
                </button>
                <Link to={`/analytics/${link._id}`} className="btn-primary flex items-center gap-4">
                  <BarChart2 size={18} /> Analytics
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
