import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: isSuccess ? '#ecfdf5' : '#fef2f2',
        color: isSuccess ? '#065f46' : '#991b1b',
        border: `1px solid ${isSuccess ? '#a7f3d0' : '#fecaca'}`,
        padding: '14px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
        fontSize: '0.95rem',
        fontWeight: 500,
        maxWidth: '400px'
      }}
    >
      {isSuccess ? <CheckCircle2 size={20} color="#10b981" /> : <AlertCircle size={20} color="#ef4444" />}
      <span style={{ flex: 1 }}>{message}</span>
      {onClose && (
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: 'inherit' }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Toast;
