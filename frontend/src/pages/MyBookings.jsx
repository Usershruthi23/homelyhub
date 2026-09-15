import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Toast from '../components/Toast';
import { Calendar, MapPin, XCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings/my');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setToast({ message: 'Failed to load bookings', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await api.put(`/bookings/${id}/cancel`);
      setToast({ message: 'Booking cancelled successfully', type: 'success' });
      fetchBookings();
    } catch (error) {
      setToast({ message: 'Failed to cancel booking', type: 'error' });
    }
  };

  return (
    <div className="section-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div style={{ marginBottom: '32px' }}>
        <h1 className="section-title">My Bookings History</h1>
        <p style={{ color: '#64748b' }}>Track status of all your property reservations</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading your bookings...</p>
      ) : bookings.length === 0 ? (
        <div style={{ background: '#ffffff', padding: '48px', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginBottom: '8px' }}>No bookings found</h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>You haven't reserved any property yet.</p>
          <Link to="/properties" className="btn btn-primary">Browse & Book Properties</Link>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Property</th>
                <th>Location</th>
                <th>Dates</th>
                <th>Guests</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td style={{ fontWeight: 700 }}>#{booking.id}</td>
                  <td>
                    <Link to={`/properties/${booking.property?.id}`} style={{ fontWeight: 600 }}>
                      {booking.property?.title}
                    </Link>
                  </td>
                  <td style={{ color: '#64748b' }}>{booking.property?.location}</td>
                  <td style={{ fontSize: '0.85rem' }}>
                    <Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    {booking.checkIn} → {booking.checkOut}
                  </td>
                  <td>{booking.guests} Guests</td>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>₹{booking.totalPrice?.toLocaleString('en-IN')}</td>
                  <td>
                    <span className={`badge ${
                      booking.status === 'CONFIRMED' ? 'badge-success' :
                      booking.status === 'PENDING' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/properties/${booking.property?.id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        <Eye size={14} /> View
                      </Link>
                      {booking.status !== 'CANCELLED' && booking.status !== 'REJECTED' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="btn btn-danger"
                          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          <XCircle size={14} /> Cancel
                        </button>
                      )}
                    </div>
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

export default MyBookings;
