import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ArrowLeft, ExternalLink, Link2, MapPin, Globe } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#6b7280'];

const Analytics = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/links/analytics/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id, navigate]);

  if (loading) {
    return <div className="container mt-8 text-center" style={{ color: 'var(--text-secondary)' }}>Loading analytics...</div>;
  }

  if (!data || !data.link) {
    return <div className="container mt-8 text-center" style={{ color: 'var(--text-secondary)' }}>Failed to load analytics.</div>;
  }

  // Formatting data for Recharts
  const dateData = Object.keys(data.clicksByDate).map(date => ({
    date,
    clicks: data.clicksByDate[date]
  }));

  const countryData = Object.keys(data.clicksByCountry).map(country => ({
    name: country,
    value: data.clicksByCountry[country]
  }));

  const referrerData = Object.keys(data.clicksByReferrer).map(ref => ({
    name: ref,
    value: data.clicksByReferrer[ref]
  }));

  const { link, totalClicks } = data;

  return (
    <div className="container mt-8 animate-fade-in mb-8">
      <div className="flex items-center mb-8 gap-4">
        <Link to="/dashboard" className="btn-secondary flex items-center gap-4" style={{ padding: '8px 16px' }}>
          <ArrowLeft size={18} /> Back
        </Link>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Analytics</h1>
      </div>

      <div className="glass-panel text-center mb-8" style={{ padding: '40px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '8px' }}>Total Clicks</p>
        <p style={{ fontSize: '4rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>{totalClicks}</p>
        <div className="flex justify-center mt-4 gap-4 flex-wrap">
          <a href={`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/${link.shortCode}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', textDecoration: 'none' }}>
            <Link2 size={16} /> {import.meta.env.VITE_API_URL || 'localhost:5000'}/{link.shortCode} <ExternalLink size={14} />
          </a>
          <span style={{ color: 'var(--text-secondary)' }}>|</span>
          <span style={{ color: 'var(--text-secondary)' }}>{link.originalUrl}</span>
        </div>
      </div>

      <div className="grid flex gap-8 mb-8" style={{ flexWrap: 'wrap' }}>
        <div className="glass-card" style={{ flex: '2', minWidth: '400px' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px' }}>Clicks Over Time</h2>
          {dateData.length > 0 ? (
            <div style={{ width: '100%', height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="date" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                  <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                  <Line type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex justify-center items-center" style={{ height: '300px', color: 'var(--text-secondary)' }}>No click data yet.</div>
          )}
        </div>

        <div className="glass-card" style={{ flex: '1', minWidth: '300px' }}>
          <div className="flex items-center gap-4 mb-4">
            <Globe size={20} color="#60a5fa" />
            <h2 style={{ fontSize: '1.2rem' }}>Top Countries</h2>
          </div>
          {countryData.length > 0 ? (
            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#f8fafc' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex justify-center items-center" style={{ height: '200px', color: 'var(--text-secondary)' }}>No data</div>
          )}
        </div>

        <div className="glass-card" style={{ flex: '1', minWidth: '300px' }}>
          <div className="flex items-center gap-4 mb-4">
            <Link2 size={20} color="#34d399" />
            <h2 style={{ fontSize: '1.2rem' }}>Referrers</h2>
          </div>
          {referrerData.length > 0 ? (
            <div style={{ width: '100%', height: '240px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={referrerData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
                  <XAxis type="number" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} allowDecimals={false} />
                  <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} width={80} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                    {referrerData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex justify-center items-center" style={{ height: '200px', color: 'var(--text-secondary)' }}>No data</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
