import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import Toast from '../components/Toast';
import { Building, BookmarkCheck, Clock, CheckCircle2, DollarSign, PlusCircle } from 'lucide-react';

const OwnerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchOwnerData();
  }, []);

  const fetchOwnerData = async () => {
    try {
      const [statsRes, propsRes, bookingsRes] = await Promise.all([
        api.get('/owner/stats'),
        api.get('/owner/properties'),
        api.get('/owner/bookings')
      ]);

      setStats(statsRes.data);
      setProperties(propsRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error('Failed to load owner data:', error);
      setToast({ message: 'Failed to load owner dashboard statistics', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/owner/bookings/${id}/approve`);
      setToast({ message: 'Booking approved successfully!', type: 'success' });
      fetchOwnerData();
    } catch (error) {
      setToast({ message: 'Failed to approve booking', type: 'error' });
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/owner/bookings/${id}/reject`);
      setToast({ message: 'Booking rejected', type: 'success' });
      fetchOwnerData();
    } catch (error) {
      setToast({ message: 'Failed to reject booking', type: 'error' });
    }
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading owner hub...</p>;

  return (
    <div className="section-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="section-title">Owner Management Hub</h1>
          <p style={{ color: '#64748b' }}>Manage your property portfolio and incoming guest bookings</p>
        </div>
        <Link to="/owner/properties/add" className="btn btn-primary">
          <PlusCircle size={18} />
          Add New Property
        </Link>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building size={24} color="#4f46e5" />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{stats?.totalProperties || 0}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>My Properties</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookmarkCheck size={24} color="#0284c7" />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{stats?.totalBookings || 0}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Total Bookings</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={24} color="#d97706" />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{stats?.pendingBookings || 0}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Pending Requests</div>
          </div>
        </div>

        <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={24} color="#059669" />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>₹{stats?.estimatedRevenue?.toLocaleString('en-IN') || 0}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Confirmed Earnings</div>
          </div>
        </div>
      </div>

      {/* Bookings Requests Table */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>Received Booking Requests</h2>
        {bookings.length === 0 ? (
          <p style={{ color: '#64748b', background: '#fff', padding: '24px', borderRadius: '12px' }}>No booking requests received yet.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Property</th>
                  <th>Guest Name</th>
                  <th>Dates</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(b => (
                  <tr key={b.id}>
                    <td>#{b.id}</td>
                    <td style={{ fontWeight: 600 }}>{b.property?.title}</td>
                    <td>{b.user?.name} ({b.user?.email})</td>
                    <td style={{ fontSize: '0.85rem' }}>{b.checkIn} → {b.checkOut}</td>
                    <td style={{ fontWeight: 700 }}>₹{b.totalPrice?.toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`badge ${
                        b.status === 'CONFIRMED' ? 'badge-success' :
                        b.status === 'PENDING' ? 'badge-warning' : 'badge-danger'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      {b.status === 'PENDING' ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleApprove(b.id)} className="btn btn-success" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                            Approve
                          </button>
                          <button onClick={() => handleReject(b.id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* My Properties List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.4rem' }}>My Listed Properties</h2>
          <Link to="/owner/properties" className="btn btn-secondary">Manage Properties</Link>
        </div>
        {properties.length === 0 ? (
          <p style={{ color: '#64748b', background: '#fff', padding: '24px', borderRadius: '12px' }}>You have not added any property listings yet.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Price / Night</th>
                  <th>Beds/Baths</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.title}</td>
                    <td>{p.location}</td>
                    <td><span className="badge badge-primary">{p.propertyType}</span></td>
                    <td style={{ fontWeight: 700 }}>₹{p.price?.toLocaleString('en-IN')}</td>
                    <td>{p.bedrooms} Beds / {p.bathrooms} Baths</td>
                    <td>
                      <Link to={`/owner/properties/edit/${p.id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
