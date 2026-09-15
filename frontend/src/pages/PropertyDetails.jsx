import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import { MapPin, Bed, Bath, Maximize2, Calendar, Users, ShieldCheck, User as UserIcon } from 'lucide-react';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Booking Form State
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  const fetchPropertyDetails = async () => {
    try {
      const response = await api.get(`/properties/${id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property details:', error);
      setToast({ message: 'Failed to load property details', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Calculate Days & Total Price
  const calculateTotalDays = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const timeDiff = end.getTime() - start.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days > 0 ? days : 0;
  };

  const totalDays = calculateTotalDays();
  const totalPrice = property ? totalDays * property.price : 0;

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    if (totalDays <= 0) {
      setToast({ message: 'Check-out date must be after check-in date', type: 'error' });
      return;
    }

    if (guests < 1) {
      setToast({ message: 'Number of guests must be at least 1', type: 'error' });
      return;
    }

    setBookingLoading(true);
    try {
      const payload = {
        propertyId: Number(id),
        checkIn,
        checkOut,
        guests: Number(guests)
      };

      await api.post('/bookings', payload);
      setToast({ message: 'Booking submitted successfully! Check status in your Dashboard.', type: 'success' });

      setTimeout(() => {
        navigate('/bookings');
      }, 1500);
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data || 'Failed to submit booking';
      setToast({ message: typeof msg === 'string' ? msg : 'Booking failed', type: 'error' });
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>Loading property details...</p>;
  if (!property) return <p style={{ textAlign: 'center', padding: '80px', color: '#64748b' }}>Property not found.</p>;

  const defaultImage = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="section-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      {/* Title Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span className="badge badge-primary">{property.propertyType}</span>
          <span className={`badge ${property.available ? 'badge-success' : 'badge-danger'}`}>
            {property.available ? 'Available' : 'Booked / Unavailable'}
          </span>
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '8px' }}>{property.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b' }}>
          <MapPin size={18} color="#4f46e5" />
          <span>{property.location}</span>
        </div>
      </div>

      {/* Image Gallery Banner */}
      <div style={{ height: '420px', borderRadius: '20px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
        <img
          src={property.imageUrl && property.imageUrl.startsWith('http') ? property.imageUrl : defaultImage}
          alt={property.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.src = defaultImage; }}
        />
      </div>

      {/* Content Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        {/* Left Column: Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Key Specifications</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center' }}>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                <Bed size={24} color="#4f46e5" style={{ marginBottom: '6px' }} />
                <div style={{ fontWeight: 700 }}>{property.bedrooms || 1}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Bedrooms</div>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                <Bath size={24} color="#4f46e5" style={{ marginBottom: '6px' }} />
                <div style={{ fontWeight: 700 }}>{property.bathrooms || 1}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Bathrooms</div>
              </div>
              <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                <Maximize2 size={24} color="#4f46e5" style={{ marginBottom: '6px' }} />
                <div style={{ fontWeight: 700 }}>{property.area || 1000}</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>sq.ft Area</div>
              </div>
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>Description</h3>
            <p style={{ color: '#475569', lineHeight: '1.8' }}>
              {property.description || 'No description provided for this property.'}
            </p>
          </div>

          <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <UserIcon size={24} color="#4f46e5" />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Hosted by</div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{property.owner?.name || 'Verified Host'}</div>
              <div style={{ fontSize: '0.85rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} /> HomelyHub Verified Host
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Widget Form */}
        <div>
          <div style={{ background: '#ffffff', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08)', position: 'sticky', top: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>₹{property.price?.toLocaleString('en-IN')}</span>
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}> / night</span>
              </div>
              <span className="badge badge-primary">{property.propertyType}</span>
            </div>

            <form onSubmit={handleBooking}>
              <div className="form-group">
                <label><Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} /> Check-In Date</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label><Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} /> Check-Out Date</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  min={checkIn || new Date().toISOString().split('T')[0]}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label><Users size={14} style={{ display: 'inline', marginRight: '4px' }} /> Guests</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  className="form-control"
                  required
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>

              {totalDays > 0 && (
                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', margin: '20px 0', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: '#64748b' }}>
                    <span>₹{property.price} × {totalDays} nights</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}>
                    <span>Total Price</span>
                    <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
                disabled={bookingLoading || !property.available}
              >
                {bookingLoading ? 'Processing...' : user ? 'Book Property Now' : 'Login to Book'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
