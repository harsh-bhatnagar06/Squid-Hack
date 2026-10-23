import React from 'react';
import { Sun, Calendar, Menu, Sparkles, User } from 'lucide-react';

export default function TopHeader({ onToggleMobileMenu, onOpenSettings }) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning, Friend 💖';
    if (hour < 18) return 'Good Afternoon, Friend 💖';
    return 'Good Evening, Friend 💖';
  };

  const todayStrFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 24px',
        background: 'rgba(23, 14, 28, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 112, 186, 0.14)',
        borderRadius: '20px',
        marginBottom: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
      }}
    >
      {/* Left: Greeting & Welcome text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Mobile menu button */}
        <button
          onClick={onToggleMobileMenu}
          className="mobile-menu-btn"
          aria-label="Toggle Navigation Menu"
          style={{
            display: 'none',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 112, 186, 0.25)',
            color: '#ffffff',
            borderRadius: '10px',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          <Menu size={20} />
        </button>

        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(255, 46, 147, 0.2) 100%)',
            border: '1px solid rgba(251, 191, 36, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbbf24',
            boxShadow: '0 0 16px rgba(251, 191, 36, 0.25)'
          }}
        >
          <Sun size={20} />
        </div>

        <div>
          <h2
            style={{
              fontSize: '17px',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 3px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {getGreeting()}
          </h2>
          <p style={{ margin: 0, fontSize: '12.5px', color: '#a395a8', fontWeight: 400 }}>
            Take a moment. How are you feeling today?
          </p>
        </div>
      </div>

      {/* Right: Date badge & User profile initial */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 16px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 112, 186, 0.16)',
            fontSize: '12.5px',
            color: '#e4d8e5',
            fontWeight: 500
          }}
        >
          <Calendar size={14} color="#fda4af" />
          <span>Today · {todayStrFormatted}</span>
        </div>

        {/* User Avatar Circle "H" */}
        <div
          onClick={onOpenSettings}
          title="Harsh · Account & Preferences"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255, 46, 147, 0.3) 0%, rgba(168, 85, 247, 0.3) 100%)',
            border: '1.5px solid rgba(255, 112, 186, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 0 16px rgba(255, 46, 147, 0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 0 22px rgba(255, 46, 147, 0.55)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 16px rgba(255, 46, 147, 0.3)';
          }}
        >
          H
        </div>
      </div>
    </header>
  );
}
