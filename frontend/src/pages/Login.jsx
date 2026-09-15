import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToast({ message: 'Please enter both email and password', type: 'error' });
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      setToast({ message: result.message, type: 'success' });
      setTimeout(() => {
        navigate(redirectUrl);
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
            <LogIn size={28} color="#4f46e5" />
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>Welcome Back</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Log into your HomelyHub account to manage bookings & listings</p>
        </div>

        <form onSubmit={handleSubmit}>
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
            <label><Lock size={14} style={{ display: 'inline', marginRight: '4px' }} /> Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
          <div style={{ fontWeight: 700, marginBottom: '6px', color: '#334155' }}>Demo Login Credentials:</div>
          <div style={{ color: '#64748b' }}>User: <code>user@homelyhub.com</code> / <code>user123</code></div>
          <div style={{ color: '#64748b' }}>Owner: <code>owner@homelyhub.com</code> / <code>owner123</code></div>
          <div style={{ color: '#64748b' }}>Admin: <code>admin@homelyhub.com</code> / <code>admin123</code></div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: '#64748b' }}>
          Don't have an account? <Link to="/register" style={{ fontWeight: 600 }}>Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
