import React, { useState } from 'react';
import { AlertCircle, X, ShieldAlert } from 'lucide-react';

export default function Disclaimer() {
  const [minimized, setMinimized] = useState(false);

  if (minimized) {
    return (
      <div style={{
        background: 'rgba(25, 18, 12, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
        padding: '7px 20px',
        fontSize: '12px',
        color: '#fbbf24',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50,
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={14} color="#f59e0b" />
          <span><strong>Medical Disclaimer:</strong> Wellness Pulse is for self-reflection and personal tracking only, not medical diagnosis.</span>
        </div>
        <button
          onClick={() => setMinimized(false)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fbbf24',
            cursor: 'pointer',
            fontSize: '12px',
            textDecoration: 'underline',
            fontWeight: 500
          }}
        >
          Read Full Notice
        </button>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(23, 16, 20, 0.88)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
      padding: '10px 20px',
      fontSize: '13px',
      color: '#fef3c7',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '14px',
      zIndex: 50,
      position: 'relative'
    }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <AlertCircle size={18} style={{ color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
        <div style={{ lineHeight: 1.5, color: '#fde68a' }}>
          <strong style={{ color: '#ffffff' }}>Wellness & Mental Health Disclaimer:</strong> Wellness Pulse is designed as an informational and mindfulness companion. <strong style={{ color: '#fbbf24' }}>This application is not a clinical or medical diagnostic tool</strong> and does not provide medical, psychological, or healthcare advice. If you are feeling overwhelmed or experiencing mental distress, please consult a licensed medical professional or contact national crisis resources (such as dialing 988 in the US/Canada, or your local emergency health service).
        </div>
      </div>
      <button
        onClick={() => setMinimized(true)}
        title="Minimize disclaimer"
        aria-label="Minimize disclaimer"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          cursor: 'pointer',
          color: '#fbbf24',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.15s ease'
        }}
      >
        <X size={15} />
      </button>
    </div>
  );
}
