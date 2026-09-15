import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import Toast from '../components/Toast';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const response = await api.get('/owner/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching owner properties:', error);
      setToast({ message: 'Failed to load properties', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property listing?')) return;

    try {
      await api.delete(`/properties/${id}`);
      setToast({ message: 'Property deleted successfully', type: 'success' });
      fetchMyProperties();
    } catch (error) {
      setToast({ message: 'Failed to delete property', type: 'error' });
    }
  };

  return (
    <div className="section-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 className="section-title">My Properties</h1>
          <p style={{ color: '#64748b' }}>All property listings managed by your host account</p>
        </div>
        <Link to="/owner/properties/add" className="btn btn-primary">
          <PlusCircle size={18} />
          Add Property
        </Link>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading your properties...</p>
      ) : properties.length === 0 ? (
        <div style={{ background: '#ffffff', padding: '48px', borderRadius: '16px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginBottom: '8px' }}>No properties listed</h3>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Click below to create your first rental property listing.</p>
          <Link to="/owner/properties/add" className="btn btn-primary">Publish Property</Link>
        </div>
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
                <th>Status</th>
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
                    <span className={`badge ${p.available ? 'badge-success' : 'badge-danger'}`}>
                      {p.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/properties/${p.id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        <Eye size={14} /> View
                      </Link>
                      <Link to={`/owner/properties/edit/${p.id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        <Edit size={14} /> Edit
                      </Link>
                      <button onClick={() => handleDelete(p.id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        <Trash2 size={14} /> Delete
                      </button>
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

export default MyProperties;
