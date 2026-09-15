import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import Toast from '../components/Toast';
import { Users, Building, BookmarkCheck, ShieldAlert, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Failed to load admin stats:', error);
      setToast({ message: 'Failed to load system statistics', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading Admin Console...</p>;

  return (
    <div className="section-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div style={{ marginBottom: '32px' }}>
        <span className="badge badge-danger" style={{ marginBottom: '8px' }}>ADMINISTRATION CENTER</span>
        <h1 className="section-title">Platform Operations Overview</h1>
        <p style={{ color: '#64748b' }}>System analytics and administration controls for HomelyHub</p>
      </div>

      {/* Metrics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} color="#4f46e5" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stats?.totalUsers || 0}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Registered Users</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={24} color="#0284c7" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stats?.totalOwners || 0}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Property Owners</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building size={24} color="#059669" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stats?.totalProperties || 0}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Active Properties</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookmarkCheck size={24} color="#d97706" />
          </div>
          <div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stats?.totalBookings || 0}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Platform Bookings</div>
          </div>
        </div>
      </div>

      {/* Admin Action Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ background: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <Users size={32} color="#4f46e5" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>User Account Management</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>View all accounts across roles (USER, OWNER, ADMIN) and remove unauthorized profiles.</p>
          <Link to="/admin/users" className="btn btn-primary" style={{ width: '100%' }}>
            Manage Users
            <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ background: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <Building size={32} color="#059669" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Property Moderation</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Audit listed rental properties and purge inappropriate or fake listings.</p>
          <Link to="/admin/properties" className="btn btn-primary" style={{ width: '100%' }}>
            Manage Properties
            <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ background: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <BookmarkCheck size={32} color="#0284c7" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Global Bookings Audit</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Inspect all booking transactions across the platform in real time.</p>
          <Link to="/admin/bookings" className="btn btn-primary" style={{ width: '100%' }}>
            Manage Bookings
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
