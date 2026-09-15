import React, { useEffect, useState } from 'react';
import api from '../api/api';
import Toast from '../components/Toast';
import { Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get('/admin/properties');
      setProperties(response.data);
    } catch (error) {
      setToast({ message: 'Failed to load properties', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProperty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property listing?')) return;

    try {
      await api.delete(`/admin/properties/${id}`);
      setToast({ message: 'Property deleted by admin', type: 'success' });
      fetchProperties();
    } catch (error) {
      setToast({ message: 'Failed to delete property', type: 'error' });
    }
  };

  return (
    <div className="section-container">
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div style={{ marginBottom: '32px' }}>
        <h1 className="section-title">Manage All Properties</h1>
        <p style={{ color: '#64748b' }}>Audit and moderate property listings across the platform</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading properties...</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Host Owner</th>
                <th>Location</th>
                <th>Type</th>
                <th>Price / Night</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(p => (
                <tr key={p.id}>
                  <td>#{p.id}</td>
                  <td style={{ fontWeight: 600 }}>{p.title}</td>
                  <td>{p.owner?.name}<br/><span style={{ fontSize: '0.8rem', color: '#64748b' }}>{p.owner?.email}</span></td>
                  <td>{p.location}</td>
                  <td><span className="badge badge-primary">{p.propertyType}</span></td>
                  <td style={{ fontWeight: 700 }}>₹{p.price?.toLocaleString('en-IN')}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/properties/${p.id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                        <Eye size={14} /> View
                      </Link>
                      <button onClick={() => handleDeleteProperty(p.id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
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

export default ManageProperties;
