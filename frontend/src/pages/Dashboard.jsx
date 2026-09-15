import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/api';
import { BookmarkCheck, Calendar, Clock, CheckCircle2, XCircle, Building, Users, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'USER') {
      fetchUserBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserBookings = async () => {
    try {
      const response = await api.get('/bookings/my');
      setUserBookings(response.data);
    } catch (error) {
      console.error('Failed to load user bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const pendingCount = userBookings.filter(b => b.status === 'PENDING').length;
  const confirmedCount = userBookings.filter(b => b.status === 'CONFIRMED').length;
  const cancelledCount = userBookings.filter(b => b.status === 'CANCELLED').length;

  return (
    <div className="section-container">
      {/* Welcome Card Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #312e81 100%)', color: 'white', padding: '36px', borderRadius: '20px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '8px' }}>{user?.role} DASHBOARD</span>
          <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '8px' }}>Welcome back, {user?.name}!</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Logged in as {user?.email}</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/profile" className="btn btn-secondary">
            View Profile
          </Link>
          {user?.role === 'OWNER' && (
            <Link to="/owner" className="btn btn-primary">
              Owner Management
              <ArrowRight size={16} />
            </Link>
          )}
          {user?.role === 'ADMIN' && (
            <Link to="/admin" className="btn btn-primary">
              Admin Control Center
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>

      {/* Renter Specific Stats & Summary */}
      {user?.role === 'USER' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookmarkCheck size={24} color="#4f46e5" />
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{userBookings.length}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Total Bookings</div>
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={24} color="#d97706" />
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{pendingCount}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Pending Approvals</div>
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={24} color="#059669" />
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{confirmedCount}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Confirmed Stays</div>
              </div>
            </div>

            <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <XCircle size={24} color="#dc2626" />
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{cancelledCount}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Cancelled</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 className="section-title">Recent Bookings</h2>
            <Link to="/bookings" className="btn btn-secondary">View All Bookings</Link>
          </div>

          {loading ? (
            <p style={{ color: '#64748b' }}>Loading bookings...</p>
          ) : userBookings.length === 0 ? (
            <div style={{ background: '#ffffff', padding: '40px', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
              <p style={{ color: '#64748b', marginBottom: '16px' }}>You have not booked any properties yet.</p>
              <Link to="/properties" className="btn btn-primary">Browse Properties</Link>
            </div>
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Dates</th>
                    <th>Guests</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userBookings.slice(0, 5).map(b => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 600 }}>{b.property?.title}</td>
                      <td>{b.checkIn} → {b.checkOut}</td>
                      <td>{b.guests} Guests</td>
                      <td style={{ fontWeight: 700 }}>₹{b.totalPrice?.toLocaleString('en-IN')}</td>
                      <td>
                        <span className={`badge ${
                          b.status === 'CONFIRMED' ? 'badge-success' :
                          b.status === 'PENDING' ? 'badge-warning' : 'badge-danger'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Owner Quick Dashboard Preview */}
      {user?.role === 'OWNER' && (
        <div style={{ background: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <Building size={48} color="#4f46e5" style={{ marginBottom: '16px' }} />
          <h2 style={{ marginBottom: '8px' }}>Host Hub</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Manage your property listings, approve incoming guest reservations, and track host revenue.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link to="/owner" className="btn btn-primary">Go to Owner Dashboard</Link>
            <Link to="/owner/properties/add" className="btn btn-secondary">+ Add New Property</Link>
          </div>
        </div>
      )}

      {/* Admin Quick Dashboard Preview */}
      {user?.role === 'ADMIN' && (
        <div style={{ background: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <Users size={48} color="#4f46e5" style={{ marginBottom: '16px' }} />
          <h2 style={{ marginBottom: '8px' }}>System Control Panel</h2>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Administer registered platform users, property listings, and site-wide bookings.</p>
          <Link to="/admin" className="btn btn-primary">Go to Admin Console</Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
