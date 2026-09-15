import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import Toast from '../components/Toast';
import { User, Mail, Phone, Shield } from 'lucide-react';

const Profile = () => {
  const { user, updateProfileState } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put('/users/profile', { name, phone });
      updateProfileState(response.data);
      setToast({ message: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to update profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div className="form-card" style={{ maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <User size={32} color="#4f46e5" />
          </div>
          <h2 style={{ fontSize: '1.6rem' }}>Account Profile</h2>
          <span className="badge badge-primary" style={{ marginTop: '6px' }}>{user?.role} ROLE</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><Mail size={14} style={{ display: 'inline', marginRight: '4px' }} /> Email Address (Read-only)</label>
            <input type="email" className="form-control" value={user?.email || ''} disabled style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }} />
          </div>

          <div className="form-group">
            <label><User size={14} style={{ display: 'inline', marginRight: '4px' }} /> Full Name</label>
            <input type="text" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label><Phone size={14} style={{ display: 'inline', marginRight: '4px' }} /> Phone Number</label>
            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Saving Changes...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
