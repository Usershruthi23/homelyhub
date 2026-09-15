import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';
import Toast from '../components/Toast';
import { Edit, Building } from 'lucide-react';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('APARTMENT');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [area, setArea] = useState(1000);
  const [imageUrl, setImageUrl] = useState('');
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await api.get(`/properties/${id}`);
      const p = response.data;
      setTitle(p.title || '');
      setDescription(p.description || '');
      setPrice(p.price || '');
      setLocation(p.location || '');
      setPropertyType(p.propertyType || 'APARTMENT');
      setBedrooms(p.bedrooms || 1);
      setBathrooms(p.bathrooms || 1);
      setArea(p.area || 1000);
      setImageUrl(p.imageUrl || '');
      setAvailable(p.available !== undefined ? p.available : true);
    } catch (error) {
      setToast({ message: 'Failed to load property details', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

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
        imageUrl,
        available
      };

      await api.put(`/properties/${id}`, payload);
      setToast({ message: 'Property updated successfully!', type: 'success' });
      setTimeout(() => {
        navigate('/owner');
      }, 1200);
    } catch (error) {
      setToast({ message: 'Failed to update property', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading property details...</p>;

  return (
    <div className="section-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div className="form-card" style={{ maxWidth: '720px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <Edit size={28} color="#4f46e5" />
          </div>
          <h2 style={{ fontSize: '1.8rem' }}>Edit Property Details</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Property Title</label>
            <input type="text" className="form-control" required value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label>Location / City</label>
              <input type="text" className="form-control" required value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Property Type</label>
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
              <label>Price (₹/night)</label>
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
            <input type="url" className="form-control" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Availability</label>
            <select className="form-control" value={available ? 'true' : 'false'} onChange={(e) => setAvailable(e.target.value === 'true')}>
              <option value="true">Available for Rent</option>
              <option value="false">Occupied / Unavailable</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" rows={4} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }} disabled={saving}>
            {saving ? 'Updating...' : 'Save Property Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
