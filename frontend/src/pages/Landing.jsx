import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Link2, Zap, BarChart3, Shield } from 'lucide-react';
import axios from 'axios';

const Landing = () => {
  const [url, setUrl] = useState('');
  const [shortened, setShortened] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/links`, { originalUrl: url });
      setShortened(`${API_URL}/${res.data.shortCode}`);
    } catch (error) {
      console.error(error);
      alert('Error shortening URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page animate-fade-in text-center mt-8">
      <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>
        Shorten Your Links.<br/>
        <span style={{ background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> Expand Your Reach.</span>
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
        A powerful, fast, and beautiful URL shortener. Track clicks, analyze audiences, and manage your links in a sleek dashboard.
      </p>

      <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', padding: '32px' }}>
        <form onSubmit={handleShorten} className="flex gap-4" style={{ flexDirection: 'column' }}>
          <div className="flex gap-4" style={{ alignItems: 'center' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Link2 size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
              <input 
                type="url" 
                className="input-glass" 
                placeholder="Paste your long URL here..." 
                style={{ paddingLeft: '48px' }}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary flex items-center gap-4" disabled={loading} style={{ height: '52px' }}>
              {loading ? 'Shortening...' : <><Zap size={18} /> Shorten</>}
            </button>
          </div>
        </form>
        
        {shortened && (
          <div className="mt-8 p-4 glass-card flex justify-between items-center animate-fade-in">
            <div style={{ textAlign: 'left' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '4px' }}>Your shortened link is ready:</p>
              <a href={shortened} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', fontWeight: '600', textDecoration: 'none', fontSize: '1.1rem' }}>
                {shortened}
              </a>
            </div>
            <button 
              className="btn-secondary" 
              onClick={() => { navigator.clipboard.writeText(shortened); alert('Copied!'); }}
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              Copy
            </button>
          </div>
        )}
      </div>

      <div className="features grid flex justify-center gap-8 mt-8" style={{ marginTop: '80px', flexWrap: 'wrap' }}>
        <div className="glass-card" style={{ flex: '1', minWidth: '250px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Zap size={24} color="#60a5fa" />
          </div>
          <h3 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>Lightning Fast</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Our optimized infrastructure ensures instant redirects for your users.</p>
        </div>
        <div className="glass-card" style={{ flex: '1', minWidth: '250px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(139, 92, 246, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <BarChart3 size={24} color="#c084fc" />
          </div>
          <h3 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>Deep Analytics</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Track clicks, locations, and referrers with our beautiful interactive charts.</p>
        </div>
        <div className="glass-card" style={{ flex: '1', minWidth: '250px', textAlign: 'left' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <Shield size={24} color="#34d399" />
          </div>
          <h3 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>Secure & Reliable</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Build trust with your audience using a reliable tracking and routing engine.</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
