import React, { useState } from 'react';
import Toast from '../components/Toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setToast({ message: 'Thank you for reaching out! Our team will contact you shortly.', type: 'success' });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="section-container" style={{ padding: '60px 24px' }}>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />

      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
        <h1 className="section-title">Get in Touch</h1>
        <p style={{ color: '#64748b' }}>Have a question or feedback? Drop us a message below.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        <div style={{ background: '#ffffff', padding: '36px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '24px' }}>Send Us a Message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea className="form-control" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
              <Send size={16} /> Send Message
            </button>
          </form>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={24} color="#4f46e5" />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Headquarters</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>HomelyHub Tech Park, HITECH City, Hyderabad, Telangana</p>
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={24} color="#0284c7" />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Phone</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>+91 98765 43210 (Mon-Sat, 9AM - 8PM)</p>
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={24} color="#059669" />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', marginBottom: '4px' }}>Email</h4>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>support@homelyhub.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
