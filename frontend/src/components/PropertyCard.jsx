import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize2, ArrowRight } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const { id, title, location, propertyType, price, bedrooms, bathrooms, area, imageUrl } = property;

  const defaultImage = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="property-card">
      <div className="card-image-wrapper">
        <img 
          src={imageUrl && imageUrl.startsWith('http') ? imageUrl : defaultImage} 
          alt={title} 
          className="card-image"
          onError={(e) => { e.target.src = defaultImage; }}
        />
        <span className="badge badge-primary card-type-badge">
          {propertyType}
        </span>
        <div className="card-price-badge">
          ₹{price?.toLocaleString('en-IN')} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>/ night</span>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title" title={title}>{title}</h3>
        <div className="card-location">
          <MapPin size={16} style={{ color: '#4f46e5', flexShrink: 0 }} />
          <span>{location}</span>
        </div>

        <div className="card-features">
          <div className="card-feature-item">
            <Bed size={16} style={{ color: '#64748b' }} />
            <span>{bedrooms || 1} Beds</span>
          </div>
          <div className="card-feature-item">
            <Bath size={16} style={{ color: '#64748b' }} />
            <span>{bathrooms || 1} Baths</span>
          </div>
          <div className="card-feature-item">
            <Maximize2 size={16} style={{ color: '#64748b' }} />
            <span>{area || 1000} sq.ft</span>
          </div>
        </div>

        <Link to={`/properties/${id}`} className="btn btn-primary" style={{ width: '100%' }}>
          View Details
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
