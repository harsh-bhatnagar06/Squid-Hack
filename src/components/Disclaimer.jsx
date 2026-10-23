import React, { useState, useEffect } from 'react';
import { AlertCircle, X, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';

export default function Disclaimer({ forceOpen, onCloseForceOpen }) {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      setDismissed(false);
      setExpanded(true);
    }
  }, [forceOpen]);

  if (dismissed && !forceOpen) {
    return null;
  }

  const handleClose = () => {
    setDismissed(true);
    if (onCloseForceOpen) onCloseForceOpen();
  };

  return (
    <div
      style={{
        background: 'rgba(23, 14, 28, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(251, 191, 36, 0.25)',
        borderRadius: '16px',
        padding: '10px 16px',
        marginBottom: '16px',
        fontSize: '12.5px',
        color: '#fef3c7',
        display: 'flex',
        alignItems: expanded ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div style={{ display: 'flex', gap: '10px', alignItems: expanded ? 'flex-start' : 'center', flex: 1 }}>
        <AlertCircle size={16} style={{ color: '#fbbf24', flexShrink: 0, marginTop: expanded ? '2px' : '0' }} />
        <div style={{ lineHeight: 1.45, color: '#fde68a' }}>
          <strong>Medical Notice:</strong> Wellness Pulse is for personal mindfulness and self-reflection only, not medical diagnosis or clinical healthcare.
          {expanded && (
            <div style={{ marginTop: '6px', fontSize: '11.5px', color: '#e4d8e5', lineHeight: 1.5 }}>
              If you or someone you know is experiencing acute psychological distress or a medical emergency, please reach out immediately to licensed professionals or contact free, confidential crisis hotlines such as dialing 988 (US/Canada) or your local emergency service.
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fbbf24',
            cursor: 'pointer',
            fontSize: '11.5px',
            textDecoration: 'underline',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            padding: '2px 4px'
          }}
        >
          <span>{expanded ? 'Less' : 'Learn More'}</span>
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>

        <button
          onClick={handleClose}
          title="Dismiss notice"
          aria-label="Dismiss notice"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#a395a8',
            cursor: 'pointer',
            borderRadius: '6px',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#a395a8')}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
