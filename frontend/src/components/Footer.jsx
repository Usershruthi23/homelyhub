import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <div className="logo" style={{ marginBottom: '16px' }}>
            <Building2 size={24} style={{ color: '#6366f1' }} />
            <span>HomelyHub</span>
          </div>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#94a3b8' }}>
            Your premier platform for discovering, listing, and booking premium properties across top cities.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '16px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><Link to="/properties" style={{ color: '#94a3b8' }}>Explore Properties</Link></li>
            <li><Link to="/about" style={{ color: '#94a3b8' }}>About Us</Link></li>
            <li><Link to="/contact" style={{ color: '#94a3b8' }}>Contact Support</Link></li>
            <li><Link to="/register?role=OWNER" style={{ color: '#94a3b8' }}>List Your Property</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '16px' }}>Property Types</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><Link to="/properties?type=APARTMENT" style={{ color: '#94a3b8' }}>Luxury Apartments</Link></li>
            <li><Link to="/properties?type=VILLA" style={{ color: '#94a3b8' }}>Private Villas</Link></li>
            <li><Link to="/properties?type=HOUSE" style={{ color: '#94a3b8' }}>Family Houses</Link></li>
            <li><Link to="/properties?type=PG" style={{ color: '#94a3b8' }}>Co-Living PGs</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '16px' }}>Contact Info</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: '#94a3b8' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} style={{ color: '#6366f1' }} />
              Hyderabad & Pan-India
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Phone size={16} style={{ color: '#6366f1' }} />
              +91 98765 43210
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={16} style={{ color: '#6366f1' }} />
              support@homelyhub.com
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HomelyHub Real Estate Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
