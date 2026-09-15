import React, { useState } from 'react';
import { Search, MapPin, Building, DollarSign, Bed } from 'lucide-react';

const SearchBar = ({ onSearch, initialValues = {} }) => {
  const [location, setLocation] = useState(initialValues.location || '');
  const [propertyType, setPropertyType] = useState(initialValues.propertyType || '');
  const [minPrice, setMinPrice] = useState(initialValues.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(initialValues.maxPrice || '');
  const [bedrooms, setBedrooms] = useState(initialValues.bedrooms || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, propertyType, minPrice, maxPrice, bedrooms });
  };

  const handleReset = () => {
    setLocation('');
    setPropertyType('');
    setMinPrice('');
    setMaxPrice('');
    setBedrooms('');
    onSearch({});
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-box">
        <div className="search-field">
          <label><MapPin size={14} style={{ display: 'inline', marginRight: '4px' }} /> Location</label>
          <input
            type="text"
            placeholder="e.g. Hyderabad, Goa"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label><Building size={14} style={{ display: 'inline', marginRight: '4px' }} /> Property Type</label>
          <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
            <option value="">All Types</option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
            <option value="VILLA">Villa</option>
            <option value="PG">PG / Hostel</option>
            <option value="STUDIO">Studio</option>
            <option value="ROOM">Room</option>
          </select>
        </div>

        <div className="search-field">
          <label><DollarSign size={14} style={{ display: 'inline', marginRight: '4px' }} /> Min Price (₹)</label>
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label><DollarSign size={14} style={{ display: 'inline', marginRight: '4px' }} /> Max Price (₹)</label>
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label><Bed size={14} style={{ display: 'inline', marginRight: '4px' }} /> Min Bedrooms</label>
          <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
            <option value="">Any</option>
            <option value="1">1+ BHK</option>
            <option value="2">2+ BHK</option>
            <option value="3">3+ BHK</option>
            <option value="4">4+ BHK</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', flex: 1 }}>
            <Search size={18} />
            Search
          </button>
          {(location || propertyType || minPrice || maxPrice || bedrooms) && (
            <button type="button" onClick={handleReset} className="btn btn-secondary">
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
