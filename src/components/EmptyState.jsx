import React from 'react';

export default function EmptyState({ icon: Icon, title, description, actionText, onAction }) {
  return (
    <div style={{
      padding: '48px 24px',
      textAlign: 'center',
      background: 'rgba(22, 17, 28, 0.65)',
      backdropFilter: 'blur(16px)',
      borderRadius: '16px',
      border: '1px dashed rgba(255, 46, 147, 0.25)',
      margin: '20px 0'
    }}>
      {Icon && (
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(255, 46, 147, 0.1)',
          border: '1px solid rgba(255, 46, 147, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          color: '#ff2e93',
          boxShadow: '0 0 20px rgba(255, 46, 147, 0.2)'
        }}>
          <Icon size={28} />
        </div>
      )}
      <h3 style={{ margin: '0 0 8px 0', color: '#ffffff', fontSize: '18px', fontWeight: 600 }}>{title}</h3>
      <p style={{ margin: '0 0 22px 0', color: '#a1a1aa', fontSize: '14px', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="pink-btn"
          style={{
            padding: '10px 20px',
            fontSize: '14px'
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
