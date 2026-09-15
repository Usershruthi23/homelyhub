import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import { UserPlus, User, Mail, Lock, Phone, Shield } from 'lucide-react';

const Register = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') === 'OWNER' ? 'OWNER' : 'USER';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState(defaultRole);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setToast({ message: 'Name, email, and password are required', type: 'error' });
      return;
    }

    if (password.length < 6) {
      setToast({ message: 'Password must be at least 6 characters', type: 'error' });
      return;
    }

    const result = await register(name, email, password, phone, role);
    if (result.success) {
      setToast({ message: result.message, type: 'success' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  return (
    <div className="section-container" style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center' }}>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div className="form-card" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <UserPlus size={28} color="#4f46e5" />
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>Create your account</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Join HomelyHub as a guest renter or property owner</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><User size={14} style={{ display: 'inline', marginRight: '4px' }} /> Account Type</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                className={`btn ${role === 'USER' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setRole('USER')}
                style={{ padding: '10px' }}
              >
                User / Renter
              </button>
              <button
                type="button"
                className={`btn ${role === 'OWNER' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setRole('OWNER')}
                style={{ padding: '10px' }}
              >
                Property Owner
              </button>
            </div>
          </div>

          <div className="form-group">
            <label><User size={14} style={{ display: 'inline', marginRight: '4px' }} /> Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Rahul Sharma"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label><Mail size={14} style={{ display: 'inline', marginRight: '4px' }} /> Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label><Lock size={14} style={{ display: 'inline', marginRight: '4px' }} /> Password (Min. 6 chars)</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a strong password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label><Phone size={14} style={{ display: 'inline', marginRight: '4px' }} /> Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="e.g. 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          Already have an account? <Link to="/login" style={{ fontWeight: 600 }}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
