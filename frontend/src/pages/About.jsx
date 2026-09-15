import React from 'react';
import { Building2, Shield, Heart, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="section-container" style={{ padding: '60px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
        <span className="badge badge-primary" style={{ marginBottom: '12px' }}>About HomelyHub</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Connecting Guests & Hosts Seamlessly</h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.7' }}>
          HomelyHub is India's leading online property rental and booking ecosystem. We empower guests to discover verified living spaces and enable hosts to effortlessly showcase their apartments, villas, houses, and PGs.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px', marginBottom: '60px' }}>
        <div style={{ background: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <Building2 size={36} color="#4f46e5" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>1,000+ Listings</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Curated catalog of luxury villas, budget rooms, and executive suites.</p>
        </div>

        <div style={{ background: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <Shield size={36} color="#10b981" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>100% Security</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Encrypted JWT authentication and role-based access for guest peace of mind.</p>
        </div>

        <div style={{ background: '#ffffff', padding: '32px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <Award size={36} color="#0284c7" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Top Rated Support</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Dedicated 24/7 resolution team for guests and property hosts.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
