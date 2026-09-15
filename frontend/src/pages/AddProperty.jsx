import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import Toast from '../components/Toast';
import { PlusCircle, Building, MapPin, DollarSign, Image } from 'lucide-react';

const AddProperty = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('APARTMENT');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [area, setArea] = useState(1000);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !location) {
      setToast({ message: 'Title, price, and location are required', type: 'error' });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        description,
        price: Number(price),
        location,
        propertyType,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: Number(area),
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
        available: true
      };

      await api.post('/properties', payload);
      setToast({ message: 'Property added successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/owner');
      }, 1200);
    } catch (error) {
      const msg = error.response?.data?.message || error.response?.data || 'Failed to add property';
      setToast({ message: typeof msg === 'string' ? msg : 'Error adding property', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div className="form-card" style={{ maxWidth: '720px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <PlusCircle size={28} color="#4f46e5" />
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>Add New Property</h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Fill in details to list your rental property on HomelyHub</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Property Title *</label>
            <input type="text" className="form-control" placeholder="e.g. Modern Sunset Apartment" required value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Location / City *</label>
              <input type="text" className="form-control" placeholder="e.g. Hyderabad" required value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Property Type *</label>
              <select className="form-control" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                <option value="APARTMENT">Apartment</option>
                <option value="HOUSE">House</option>
                <option value="VILLA">Villa</option>
                <option value="PG">PG / Hostel</option>
                <option value="STUDIO">Studio</option>
                <option value="ROOM">Room</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Price (₹/night) *</label>
              <input type="number" className="form-control" required min="1" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Bedrooms</label>
              <input type="number" className="form-control" min="0" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Bathrooms</label>
              <input type="number" className="form-control" min="0" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Area (sq.ft)</label>
              <input type="number" className="form-control" min="0" value={area} onChange={(e) => setArea(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input type="url" className="form-control" placeholder="https://images.unsplash.com/..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" rows={4} placeholder="Describe the property amenities, view, and rules..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={loading}>
            {loading ? 'Publishing Listing...' : 'Publish Property Listing'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
