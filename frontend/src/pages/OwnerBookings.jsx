import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Toast from '../components/Toast';

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/owner/bookings');
      setBookings(response.data);
    } catch (error) {
      setToast({ message: 'Failed to load bookings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/owner/bookings/${id}/approve`);
      setToast({ message: 'Booking approved successfully!', type: 'success' });
      fetchBookings();
    } catch (error) {
      setToast({ message: 'Failed to approve booking', type: 'error' });
    }
  };

  const handleReject = async (id) => {
    try {
      await api.put(`/owner/bookings/${id}/reject`);
      setToast({ message: 'Booking rejected', type: 'success' });
      fetchBookings();
    } catch (error) {
      setToast({ message: 'Failed to reject booking', type: 'error' });
    }
  };

  return (
    <div className="section-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div style={{ marginBottom: '32px' }}>
        <h1 className="section-title">Property Bookings Received</h1>
        <p style={{ color: '#64748b' }}>Approve or reject reservation requests submitted by guests</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading booking requests...</p>
      ) : bookings.length === 0 ? (
        <div style={{ background: '#ffffff', padding: '48px', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#64748b' }}>No booking requests received for your properties yet.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Property</th>
                <th>Guest</th>
                <th>Dates</th>
                <th>Guests</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td style={{ fontWeight: 600 }}>{b.property?.title}</td>
                  <td>{b.user?.name}<br/><span style={{ fontSize: '0.8rem', color: '#64748b' }}>{b.user?.email}</span></td>
                  <td style={{ fontSize: '0.85rem' }}>{b.checkIn} → {b.checkOut}</td>
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
                      <span style={{ color: '#64748b', fontSize: '0.85rem' }}>No action required</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OwnerBookings;
