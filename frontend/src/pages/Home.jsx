import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import api from '../api/api';
import { ShieldCheck, HeartHandshake, Sparkles, MapPin } from 'lucide-react';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get('/properties');
      setProperties(response.data.slice(0, 6)); // Display top 6 featured
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    const params = new URLSearchParams();
    if (filters.location) params.append('location', filters.location);
    if (filters.propertyType) params.append('propertyType', filters.propertyType);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="hero-section">
        <div className="hero-content">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: '9999px', fontSize: '0.85rem', marginBottom: '20px' }}>
            <Sparkles size={16} color="#818cf8" />
            <span>Discover Top Rental Properties Across India</span>
          </div>
          <h1 className="hero-title">Find a place you'll love to call home</h1>
          <p className="hero-subtitle">
            Explore verified apartments, villas, family houses, and co-living spaces at guaranteed best rates.
          </p>
        </div>
      </section>

      {/* Floating Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Featured Properties */}
      <section className="section-container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Properties</h2>
            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Handpicked staycations, homes, and executive suites</p>
          </div>
          <button className="btn btn-secondary" onClick={() => navigate('/properties')}>
            View All Properties
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading featured properties...</p>
        ) : properties.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No properties available at the moment.</p>
        ) : (
          <div className="property-grid">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose HomelyHub */}
      <section style={{ backgroundColor: '#ffffff', padding: '60px 24px', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="section-container" style={{ padding: 0 }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
            <h2 className="section-title">Why Choose HomelyHub</h2>
            <p style={{ color: '#64748b' }}>Designed to offer seamless booking for guests and maximum yield for hosts</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            <div style={{ padding: '24px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={24} color="#4f46e5" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Verified Properties</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Every listing is verified for accurate pricing, real images, and owner details.</p>
            </div>

            <div style={{ padding: '24px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <HeartHandshake size={24} color="#0284c7" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Instant Booking & Approval</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Select dates, review dynamic prices, and receive instant confirmation status.</p>
            </div>

            <div style={{ padding: '24px', borderRadius: '16px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <MapPin size={24} color="#059669" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Prime Locations</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Properties situated near business parks, beaches, hill stations, and metro nodes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
