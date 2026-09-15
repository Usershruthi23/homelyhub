import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import api from '../api/api';

const Properties = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialFilters = {
    location: searchParams.get('location') || '',
    propertyType: searchParams.get('propertyType') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || ''
  };

  useEffect(() => {
    fetchFilteredProperties(initialFilters);
  }, [searchParams]);

  const fetchFilteredProperties = async (filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.location) params.append('location', filters.location);
      if (filters.propertyType) params.append('propertyType', filters.propertyType);
      if (filters.minPrice) params.append('minPrice', filters.minPrice);
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);

      const endpoint = params.toString() ? `/properties/search?${params.toString()}` : '/properties';
      const response = await api.get(endpoint);
      setProperties(response.data);
    } catch (error) {
      console.error('Error searching properties:', error);
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

    setSearchParams(params);
  };

  return (
    <div style={{ paddingTop: '20px' }}>
      <div className="section-container" style={{ paddingBottom: '10px' }}>
        <h1 className="section-title">Explore Properties</h1>
        <p style={{ color: '#64748b' }}>Browse all available apartments, houses, villas, and PGs</p>
      </div>

      <SearchBar onSearch={handleSearch} initialValues={initialFilters} />

      <section className="section-container">
        {loading ? (
          <p style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>Loading properties...</p>
        ) : properties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ marginBottom: '8px' }}>No properties found</h3>
            <p style={{ color: '#64748b' }}>Try broadening your search filter or clear inputs to see all listings.</p>
          </div>
        ) : (
          <div>
            <p style={{ marginBottom: '20px', color: '#64748b', fontSize: '0.9rem' }}>
              Showing <strong>{properties.length}</strong> matching properties
            </p>
            <div className="property-grid">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Properties;
