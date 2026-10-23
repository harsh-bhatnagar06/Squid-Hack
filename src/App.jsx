import React, { useState } from 'react';
import { WellnessProvider } from './context/WellnessContext';
import MoonlitPetals from './components/MoonlitPetals';
import Disclaimer from './components/Disclaimer';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import MoodCheckIn from './components/MoodCheckIn';
import Journal from './components/Journal';
import Analytics from './components/Analytics';
import SelfCare from './components/SelfCare';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Interactive Moonlit Petals Background (Source provided by user) */}
      <MoonlitPetals
        background="#08070b"
        blossomColor="#ff2e93"
        speed={85}
        petals={130}
        wind={32}
        glow={60}
      />

      {/* 2. Application Foreground (Z-index above background canvas) */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Medical Disclaimer Banner */}
        <Disclaimer />

        {/* Top Navigation */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main View Container */}
        <main style={{
          flex: 1,
          padding: '32px 24px 48px 24px',
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box'
        }}>
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

        {/* Footer with persistent disclaimer note */}
        <footer style={{
          background: 'rgba(12, 9, 18, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '24px 20px',
          marginTop: 'auto',
          fontSize: '13px',
          color: '#a1a1aa',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <strong style={{ color: '#ffffff' }}>Wellness</strong>
              <span style={{ color: '#ff2e93', fontWeight: 800 }}> Pulse</span> — Mind & Mood Companion. Data is stored safely and locally in your browser.
            </div>
            <div style={{ fontSize: '12px', color: '#71717a' }}>
              Disclaimer: This application is intended for personal self-reflection and tracking purposes only. It is not a clinical diagnostic tool or medical device.
            </div>
          </div>
        </footer>
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
