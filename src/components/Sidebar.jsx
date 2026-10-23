import React, { useState } from 'react';
import {
  LayoutDashboard,
  Smile,
  BookOpen,
  BarChart3,
  Sparkles,
  Heart,
  Sun,
  Settings,
  RotateCcw,
  Trash2,
  X,
  Activity,
  ShieldAlert
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, setMobileOpen, onOpenDisclaimer }) {
  const { resetToSampleData, clearAllData } = useWellness();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'mood', label: 'Mood Check-in', icon: Smile },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'selfcare', label: 'Self-Care', icon: Sparkles }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (setMobileOpen) setMobileOpen(false);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all data back to default demo entries?')) {
      resetToSampleData();
      setShowSettingsModal(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Clear all entries to test empty states? You can restore demo data at any time.')) {
      clearAllData();
      setShowSettingsModal(false);
    }
  };

  const todayStrFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <>
      <aside
        style={{
          width: '260px',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 18px',
          background: 'rgba(17, 11, 23, 0.72)',
          backdropFilter: 'blur(28px) saturate(170%)',
          WebkitBackdropFilter: 'blur(28px) saturate(170%)',
          borderRight: '1px solid rgba(255, 112, 186, 0.15)',
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.45)',
          minHeight: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          boxSizing: 'border-box'
        }}
        className={`app-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
      >
        {/* Top: Logo & Nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Logo Brand Header */}
          <div
            onClick={() => handleNavClick('dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              userSelect: 'none',
              padding: '4px 6px'
            }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '13px',
                background: 'linear-gradient(135deg, #ff2e93 0%, #db2777 50%, #9333ea 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(255, 46, 147, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <Activity size={22} color="#ffffff" strokeWidth={2.4} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#ffffff',
                  letterSpacing: '-0.3px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>Wellness</span>
                <span
                  style={{
                    background: 'linear-gradient(135deg, #ff2e93 0%, #fda4af 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Pulse
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#a395a8', fontWeight: 500, letterSpacing: '0.1px' }}>
                Mind & Mood Companion
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2.3 : 1.9}
                    style={{
                      color: isActive ? '#ff2e93' : '#a395a8',
                      transition: 'color 0.2s ease',
                      filter: isActive ? 'drop-shadow(0 0 8px rgba(255, 46, 147, 0.5))' : 'none'
                    }}
                  />
                  <span style={{ fontWeight: isActive ? 600 : 500 }}>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Area: Inspirational Card & Footer Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: 'auto', paddingTop: '20px' }}>
          {/* Small Inspirational Card */}
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(255, 46, 147, 0.08) 0%, rgba(192, 132, 252, 0.06) 100%)',
              border: '1px solid rgba(255, 112, 186, 0.18)',
              borderRadius: '16px',
              padding: '16px 14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'rgba(255, 46, 147, 0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#ff70ba'
              }}
            >
              <Heart size={16} fill="#ff70ba" />
            </div>
            <div style={{ fontSize: '12px', color: '#e4d8e5', lineHeight: 1.45, fontWeight: 500 }}>
              Small steps every day lead to big changes.
            </div>
          </div>

          {/* Sidebar Footer Bar: Today's Date & Settings Gear */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#d48ba3' }}>
              <Sun size={15} color="#fda4af" />
              <span>Today · {todayStrFormatted}</span>
            </div>

            <button
              onClick={() => setShowSettingsModal(true)}
              title="Preferences & Demo Options"
              aria-label="Settings"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#a395a8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ff70ba';
                e.currentTarget.style.transform = 'rotate(30deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#a395a8';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              <Settings size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(8, 6, 13, 0.75)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '440px',
              padding: '26px',
              background: 'rgba(23, 14, 28, 0.94)',
              border: '1px solid rgba(255, 112, 186, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 46, 147, 0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Settings size={20} color="#ff70ba" />
                <h3 style={{ margin: 0, fontSize: '18px', color: '#ffffff' }}>Preferences & Demo Data</h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#a395a8',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: '#a395a8', margin: '0 0 20px 0', lineHeight: 1.5 }}>
              Manage your local storage data or review application health and disclaimer guidelines.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleResetData}
                className="glass-btn"
                style={{ justifyContent: 'flex-start', padding: '12px 16px', fontSize: '13px' }}
              >
                <RotateCcw size={16} color="#fda4af" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, color: '#ffffff' }}>Reset to Demo Data</div>
                  <div style={{ fontSize: '11px', color: '#a395a8' }}>Restore initial sample moods & journal entries</div>
                </div>
              </button>

              <button
                onClick={handleClearData}
                className="glass-btn"
                style={{ justifyContent: 'flex-start', padding: '12px 16px', fontSize: '13px' }}
              >
                <Trash2 size={16} color="#f43f5e" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600, color: '#f43f5e' }}>Clear All Local Data</div>
                  <div style={{ fontSize: '11px', color: '#a395a8' }}>Test zero / empty states for all views</div>
                </div>
              </button>

              {onOpenDisclaimer && (
                <button
                  onClick={() => {
                    setShowSettingsModal(false);
                    onOpenDisclaimer();
                  }}
                  className="glass-btn"
                  style={{ justifyContent: 'flex-start', padding: '12px 16px', fontSize: '13px' }}
                >
                  <ShieldAlert size={16} color="#fbbf24" />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 600, color: '#fbbf24' }}>Medical & Mental Health Notice</div>
                    <div style={{ fontSize: '11px', color: '#a395a8' }}>Review safety boundaries & crisis resources</div>
                  </div>
                </button>
              )}
            </div>

            <div style={{ marginTop: '22px', textAlign: 'right' }}>
              <button onClick={() => setShowSettingsModal(false)} className="pink-btn" style={{ padding: '8px 18px', fontSize: '13px' }}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
