import React from 'react';
import { Activity, Smile, BookOpen, BarChart3, Sparkles, RotateCcw, Trash2 } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export default function Navbar({ activeTab, setActiveTab }) {
  const { todayMood, resetToSampleData, clearAllData } = useWellness();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'mood', label: 'Mood Check-in', icon: Smile },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'selfcare', label: 'Self-Care', icon: Sparkles }
  ];

  const handleReset = () => {
    if (window.confirm('Reset app data to sample data? (Your existing data will be replaced by initial demo data)')) {
      resetToSampleData();
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear all data to test empty states? You can restore demo data at any time.')) {
      clearAllData();
    }
  };

  return (
    <header style={{
      background: 'rgba(12, 9, 18, 0.78)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
    }}>
      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Brand */}
        <div
          onClick={() => setActiveTab('dashboard')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #ff2e93 0%, #f59e0b 100%)',
            color: '#ffffff',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(255, 46, 147, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.25)'
          }}>
            <Activity size={22} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{
              fontSize: '19px',
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: '-0.4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>Wellness</span>
              <span style={{
                background: 'linear-gradient(135deg, #ff2e93 0%, #ff70ba 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Pulse
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 500, letterSpacing: '0.2px' }}>
              Mind & Mood Companion
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '4px',
          borderRadius: '12px',
          overflowX: 'auto'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '9px',
                  border: isActive ? '1px solid rgba(255, 46, 147, 0.4)' : '1px solid transparent',
                  background: isActive ? 'linear-gradient(135deg, rgba(255, 46, 147, 0.25) 0%, rgba(217, 27, 117, 0.2) 100%)' : 'transparent',
                  color: isActive ? '#ffffff' : '#d4d4d8',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '13px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 0 16px rgba(255, 46, 147, 0.25)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} color={isActive ? '#ff2e93' : '#a1a1aa'} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Status / Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {todayMood ? (
            <div
              onClick={() => setActiveTab('mood')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 46, 147, 0.12)',
                border: '1px solid rgba(255, 46, 147, 0.35)',
                padding: '6px 14px',
                borderRadius: '24px',
                fontSize: '12px',
                color: '#ff70ba',
                cursor: 'pointer',
                fontWeight: 600,
                boxShadow: '0 0 12px rgba(255, 46, 147, 0.2)',
                transition: 'all 0.2s ease'
              }}
              title="Click to view or update today's mood"
            >
              <span style={{ fontSize: '15px' }}>{todayMood.emoji}</span>
              <span>Today: {todayMood.mood.toUpperCase()}</span>
              <span style={{
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                padding: '1px 6px',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                ⚡ {todayMood.energy}
              </span>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab('mood')}
              className="pink-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '20px',
                fontSize: '12px'
              }}
            >
              <Smile size={14} />
              <span>Check In Today</span>
            </button>
          )}

          {/* Sample Data Controls */}
          <div style={{ display: 'flex', gap: '6px', borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '10px' }}>
            <button
              onClick={handleReset}
              title="Reset to sample demo data"
              className="glass-btn"
              style={{
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <RotateCcw size={13} color="#f59e0b" />
              <span>Demo</span>
            </button>
            <button
              onClick={handleClear}
              title="Clear all data to test empty states"
              className="glass-btn"
              style={{
                padding: '6px 8px',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <Trash2 size={13} color="#a1a1aa" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
