import React, { useState } from 'react';
import { WellnessProvider } from './context/WellnessContext';
import MoonlitPetals from './components/MoonlitPetals';
import Disclaimer from './components/Disclaimer';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import Dashboard from './components/Dashboard';
import MoodCheckIn from './components/MoodCheckIn';
import Journal from './components/Journal';
import Analytics from './components/Analytics';
import SelfCare from './components/SelfCare';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDisclaimerNotice, setShowDisclaimerNotice] = useState(false);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Preserved Interactive Moonlit Petals Background */}
      <MoonlitPetals
        background="#08060d"
        blossomColor="#ff2e93"
        speed={75}
        petals={120}
        wind={28}
        glow={55}
      />

      {/* Subtle dimming & blur veil behind UI so petals drift with depth while text remains 100% crisp */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(13, 8, 18, 0.6) 0%, rgba(8, 6, 13, 0.8) 100%)',
          backdropFilter: 'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* 2. Main Application Shell */}
      <div className="app-layout">
        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(6px)',
              zIndex: 90
            }}
          />
        )}

        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileOpen={mobileMenuOpen}
          setMobileOpen={setMobileMenuOpen}
          onOpenDisclaimer={() => setShowDisclaimerNotice(true)}
        />

        {/* Right Content Area */}
        <div className="main-content-wrapper">
          {/* Top Medical Disclaimer Banner */}
          <Disclaimer
            forceOpen={showDisclaimerNotice}
            onCloseForceOpen={() => setShowDisclaimerNotice(false)}
          />

          {/* Top Navigation Header */}
          <TopHeader
            onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
            onOpenSettings={() => setShowDisclaimerNotice(true)}
          />

          {/* Active Page View */}
          <main style={{ flex: 1, minWidth: 0 }}>
            {activeTab === 'dashboard' && (
              <Dashboard setActiveTab={setActiveTab} />
            )}

            {activeTab === 'mood' && (
              <MoodCheckIn
                onNavigateToJournal={() => setActiveTab('journal')}
                onNavigateToSelfCare={() => setActiveTab('selfcare')}
              />
            )}

            {activeTab === 'journal' && (
              <Journal />
            )}

            {activeTab === 'analytics' && (
              <Analytics onNavigateToMoodCheckIn={() => setActiveTab('mood')} />
            )}

            {activeTab === 'selfcare' && (
              <SelfCare onNavigateToMoodCheckIn={() => setActiveTab('mood')} />
            )}
          </main>

          {/* Subtle Glass Footer */}
          <footer
            style={{
              marginTop: '40px',
              padding: '18px 20px',
              borderRadius: '16px',
              background: 'rgba(23, 14, 28, 0.45)',
              border: '1px solid rgba(255, 112, 186, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              fontSize: '12px',
              color: '#a395a8'
            }}
          >
            <div>
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Wellness</span>{' '}
              <span style={{ color: '#ff70ba', fontWeight: 800 }}>Pulse</span>{' '}
              — Mind & Mood Companion. All insights stored private & local.
            </div>
            <div style={{ fontSize: '11px', color: '#716477' }}>
              Designed for personal mindfulness & self-care reflection.
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <WellnessProvider>
      <AppContent />
    </WellnessProvider>
  );
}
