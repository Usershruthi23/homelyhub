import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Toast from '../components/Toast';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/admin/bookings');
      setBookings(response.data);
    } catch (error) {
      setToast({ message: 'Failed to load platform bookings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div style={{ marginBottom: '32px' }}>
        <h1 className="section-title">All System Bookings</h1>
        <p style={{ color: '#64748b' }}>Complete system audit log of all guest reservations</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading bookings log...</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Property</th>
                <th>Guest</th>
                <th>Host Owner</th>
                <th>Dates</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td style={{ fontWeight: 600 }}>{b.property?.title}</td>
                  <td>{b.user?.name}<br/><span style={{ fontSize: '0.8rem', color: '#64748b' }}>{b.user?.email}</span></td>
                  <td>{b.property?.owner?.name}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
