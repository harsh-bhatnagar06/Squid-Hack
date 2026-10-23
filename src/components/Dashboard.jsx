import React, { useState, useMemo } from 'react';
import {
  Smile,
  Zap,
  BookOpen,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Heart,
  Music,
  Droplets,
  Trees,
  Lightbulb,
  MoreVertical,
  Check,
  ChevronRight,
  Activity,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar
} from 'recharts';
import { useWellness } from '../context/WellnessContext';
import { MOOD_OPTIONS, SELF_CARE_LIBRARY } from '../data/sampleData';
import heroSunsetImg from '../assets/hero_sunset.jpg';
import natureWalkImg from '../assets/nature_walk.jpg';
import blossomCardImg from '../assets/blossom_card.jpg';

export default function Dashboard({ setActiveTab }) {
  const { moods, journalEntries, todayMood, latestMood, completedSelfCare, addMoodCheckIn, toggleSelfCare } = useWellness();

  // Quick Check-in Form States
  const [quickMood, setQuickMood] = useState('great');
  const [quickEnergy, setQuickEnergy] = useState(8);
  const [quickNotes, setQuickNotes] = useState('');
  const [showCheckInSuccess, setShowCheckInSuccess] = useState(false);

  // Widget Tabs State
  const [analyticsTab, setAnalyticsTab] = useState('trends'); // 'trends' | 'energy' | 'insights'
  const [selfCareTab, setSelfCareTab] = useState('forYou'); // 'forYou' | 'all'
  const [heroSlide, setHeroSlide] = useState(0);
  const [selfCareSlide, setSelfCareSlide] = useState(0);

  // Breathing Modal State
  const [showBreathingModal, setShowBreathingModal] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('Inhale');

  // Reference mood
  const currentMoodObj = todayMood || latestMood;
  const moodMeta = currentMoodObj
    ? MOOD_OPTIONS.find((m) => m.id === currentMoodObj.mood) || MOOD_OPTIONS[0]
    : MOOD_OPTIONS[0];

  // 8 Quick Mood options for the widget
  const quickMoodOptions = [
    { id: 'great', label: 'Great', emoji: '😆' },
    { id: 'happy', label: 'Happy', emoji: '😊' },
    { id: 'calm', label: 'Calm', emoji: '😌' },
    { id: 'okay', label: 'Okay', emoji: '😐' },
    { id: 'sad', label: 'Sad', emoji: '😢' },
    { id: 'anxious', label: 'Anxious', emoji: '😰' },
    { id: 'stressed', label: 'Stressed', emoji: '🤯' },
    { id: 'angry', label: 'Angry', emoji: '😡' }
  ];

  // 7-day stats
  const last7Days = useMemo(() => {
    return moods.slice(0, 7);
  }, [moods]);

  const avgMoodScore = useMemo(() => {
    if (!last7Days.length) return '3.4';
    return (last7Days.reduce((acc, m) => acc + (m.score || 3), 0) / last7Days.length).toFixed(1);
  }, [last7Days]);

  const avgEnergy = useMemo(() => {
    if (!last7Days.length) return '5.9';
    return (last7Days.reduce((acc, m) => acc + (m.energy || 5), 0) / last7Days.length).toFixed(1);
  }, [last7Days]);

  // Chart data for 7-Day Journey (sorted chronologically)
  const lineChartData = useMemo(() => {
    if (!moods || moods.length === 0) {
      // Fallback 7-day dummy curve matching reference
      return [
        { day: 'Oct 17', mood: 3.2, energy: 6 },
        { day: 'Oct 18', mood: 3.0, energy: 5 },
        { day: 'Oct 19', mood: 3.5, energy: 6 },
        { day: 'Oct 20', mood: 3.4, energy: 7 },
        { day: 'Oct 21', mood: 4.1, energy: 8 },
        { day: 'Oct 22', mood: 3.8, energy: 6 },
        { day: 'Oct 23', mood: 4.5, energy: 8 }
      ];
    }

    const items = [...moods.slice(0, 7)].reverse();
    return items.map((m) => {
      const parts = m.date.split('-');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const mIdx = parseInt(parts[1], 10) - 1;
      const dayLabel = `${monthNames[mIdx] || ''} ${parseInt(parts[2], 10)}`;
      return {
        day: dayLabel,
        mood: m.score || 3,
        energy: m.energy || 5
      };
    });
  }, [moods]);

  // Bar Chart Data for Mood Analytics
  const barChartData = useMemo(() => {
    return lineChartData.map((d) => ({
      day: d.day.split(' ')[1] || d.day,
      score: d.mood,
      energy: d.energy
    }));
  }, [lineChartData]);

  // Best & Lowest Day
  const bestDayStr = useMemo(() => {
    if (!moods.length) return 'Oct 22';
    const highest = [...moods].sort((a, b) => (b.score || 0) - (a.score || 0))[0];
    if (!highest) return 'Oct 22';
    const parts = highest.date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(parts[1], 10) - 1]} ${parts[2]}`;
  }, [moods]);

  const lowestDayStr = useMemo(() => {
    if (!moods.length) return 'Oct 18';
    const lowest = [...moods].sort((a, b) => (a.score || 0) - (b.score || 0))[0];
    if (!lowest) return 'Oct 18';
    const parts = lowest.date.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(parts[1], 10) - 1]} ${parts[2]}`;
  }, [moods]);

  // Self-care activities to show
  const selfCareList = [
    {
      id: 'sc-music',
      title: 'Listen to your favorite music',
      subtitle: 'Boost your mood in 5 minutes.',
      icon: Music
    },
    {
      id: 'sc-hydrate',
      title: 'Stay hydrated',
      subtitle: 'Even small sips make a difference.',
      icon: Droplets
    },
    {
      id: 'sc-nature',
      title: 'Spend time in nature',
      subtitle: 'It refreshes your mind and body.',
      icon: Trees
    }
  ];

  // Submit quick check-in
  const handleSaveQuickCheckIn = (e) => {
    e.preventDefault();
    addMoodCheckIn({
      mood: quickMood,
      energy: quickEnergy,
      notes: quickNotes
    });
    setQuickNotes('');
    setShowCheckInSuccess(true);
    setTimeout(() => setShowCheckInSuccess(false), 3500);
  };

  // Quotes for Hero Carousel
  const heroQuotes = [
    { quote: "A calm mind creates a happy life.", author: "Mindfulness" },
    { quote: "Peace comes from within. Do not seek it without.", author: "Presence" },
    { quote: "Every breath is a fresh start and a second chance.", author: "Reflection" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Main 2-Column Responsive Dashboard Grid */}
      <div
        className="dashboard-main-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 340px',
          gap: '24px',
          alignItems: 'start'
        }}
      >
        {/* ================= LEFT MAIN COLUMN ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
          {/* 1. Hero Banner with Scenic Sunset & Blossom Backdrop */}
          <div
            className="glass-panel"
            style={{
              borderRadius: '24px',
              padding: '30px 32px',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '190px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundImage: `linear-gradient(to right, rgba(16, 9, 22, 0.94) 0%, rgba(20, 11, 26, 0.75) 55%, rgba(20, 11, 26, 0.88) 100%), url(${heroSunsetImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 40%',
              border: '1px solid rgba(255, 112, 186, 0.22)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.55), 0 0 30px rgba(255, 46, 147, 0.12)'
            }}
          >
            {/* Top row inside Hero */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
                zIndex: 2
              }}
            >
              {/* Mood Avatar + Welcome text */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '22px',
                    background: 'linear-gradient(135deg, rgba(255, 46, 147, 0.25) 0%, rgba(251, 113, 133, 0.3) 100%)',
                    border: '1.5px solid rgba(255, 112, 186, 0.4)',
                    boxShadow: '0 0 24px rgba(255, 46, 147, 0.38)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '34px',
                    flexShrink: 0
                  }}
                >
                  {moodMeta.emoji || '😆'}
                </div>

                <div>
                  <h1
                    style={{
                      fontSize: '25px',
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: '0 0 4px 0',
                      letterSpacing: '-0.3px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <span>Feeling</span>
                    <span
                      style={{
                        background: 'linear-gradient(135deg, #ff2e93 0%, #ff85c4 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {moodMeta.label || 'Great'}
                    </span>
                    <span>Today</span>
                  </h1>

                  <p style={{ margin: '0 0 12px 0', color: '#e4d8e5', fontSize: '13.5px', fontWeight: 400 }}>
                    You're doing amazing! Keep this positive energy going.
                  </p>

                  {/* Badges: Energy & Checked In */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        background: 'rgba(251, 191, 36, 0.14)',
                        border: '1px solid rgba(251, 191, 36, 0.35)',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#fbbf24'
                      }}
                    >
                      <Zap size={13} fill="#fbbf24" />
                      <span>Energy: {currentMoodObj ? `${currentMoodObj.energy}/10` : '8/10'}</span>
                    </div>

                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        background: 'rgba(52, 211, 153, 0.14)',
                        border: '1px solid rgba(52, 211, 153, 0.35)',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#6ee7b7'
                      }}
                    >
                      <CheckCircle2 size={13} />
                      <span>{todayMood ? 'Checked In Today' : 'Checked In Today'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Quote Box */}
              <div
                style={{
                  background: 'rgba(22, 13, 26, 0.65)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 112, 186, 0.22)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  maxWidth: '260px',
                  position: 'relative'
                }}
              >
                <div style={{ fontSize: '20px', color: '#fda4af', lineHeight: 1, marginBottom: '4px', opacity: 0.8 }}>
                  “
                </div>
                <div style={{ fontSize: '12.5px', color: '#ffffff', fontStyle: 'italic', lineHeight: 1.45, marginBottom: '6px' }}>
                  "{heroQuotes[heroSlide].quote}"
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Heart size={14} color="#ff70ba" style={{ opacity: 0.8 }} />
                </div>
              </div>
            </div>

            {/* Carousel Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px', zIndex: 2 }}>
              {heroQuotes.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setHeroSlide(i)}
                  style={{
                    width: heroSlide === i ? '18px' : '6px',
                    height: '6px',
                    borderRadius: '4px',
                    background: heroSlide === i ? '#ff2e93' : 'rgba(255, 255, 255, 0.25)',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {/* 2. Key Metrics Row (4 Compact Cards) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '14px'
            }}
          >
            {/* Metric 1: 7-Day Mood Average */}
            <div
              className="glass-panel"
              style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d48ba3', fontSize: '12px', fontWeight: 600 }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '7px', background: 'rgba(255, 46, 147, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff70ba' }}>
                  <TrendingUp size={13} />
                </div>
                <span>7-Day Mood Average</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>{avgMoodScore}</span>
                <span style={{ fontSize: '13px', color: '#a395a8', fontWeight: 500 }}>/ 5</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ fontSize: '11.5px', color: '#ff85c4', fontWeight: 600 }}>↗ Steady</span>
                {/* Mini SVG Sparkline */}
                <svg width="70" height="22" viewBox="0 0 70 22" fill="none">
                  <path
                    d="M 2 16 Q 18 18 28 10 T 50 14 T 68 6"
                    stroke="#ff2e93"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="68" cy="6" r="2.5" fill="#ff70ba" />
                </svg>
              </div>
            </div>

            {/* Metric 2: Energy Baseline */}
            <div
              className="glass-panel"
              style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d48ba3', fontSize: '12px', fontWeight: 600 }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '7px', background: 'rgba(251, 113, 133, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fb7185' }}>
                  <Zap size={13} fill="#fb7185" />
                </div>
                <span>Energy Baseline</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>{avgEnergy}</span>
                <span style={{ fontSize: '13px', color: '#a395a8', fontWeight: 500 }}>/ 10</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto' }}>
                <span style={{ fontSize: '11.5px', color: '#6ee7b7', fontWeight: 600 }}>↑ Improving</span>
                <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${Math.min(100, Math.max(10, parseFloat(avgEnergy) * 10))}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #ff2e93 0%, #fda4af 100%)',
                      borderRadius: '3px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Metric 3: Journal Entries */}
            <div
              className="glass-panel"
              style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d48ba3', fontSize: '12px', fontWeight: 600 }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '7px', background: 'rgba(192, 132, 252, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
                  <BookOpen size={13} />
                </div>
                <span>Journal Entries</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>{journalEntries.length || 4}</span>
                <span style={{ fontSize: '12px', color: '#a395a8', fontWeight: 500 }}>recent entries</span>
              </div>

              <button
                onClick={() => setActiveTab('journal')}
                className="glass-btn"
                style={{
                  marginTop: 'auto',
                  padding: '6px 10px',
                  fontSize: '11.5px',
                  borderRadius: '8px',
                  justifyContent: 'space-between',
                  background: 'rgba(255, 46, 147, 0.12)',
                  borderColor: 'rgba(255, 112, 186, 0.3)',
                  color: '#ffffff'
                }}
              >
                <span>Write New Entry</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Metric 4: Self-Care Done Today */}
            <div
              className="glass-panel"
              style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d48ba3', fontSize: '12px', fontWeight: 600 }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '7px', background: 'rgba(255, 46, 147, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff70ba' }}>
                  <Heart size={13} fill="#ff70ba" />
                </div>
                <span>Self-Care Done Today</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                <span style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff' }}>{completedSelfCare.length || 1}</span>
                <span style={{ fontSize: '13px', color: '#a395a8', fontWeight: 500 }}>/ 4</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ fontSize: '11.5px', color: '#a395a8' }}>✓ completed</span>
                <span style={{ fontSize: '11.5px', color: '#6ee7b7', fontWeight: 600 }}>✓ Keep it up!</span>
              </div>
            </div>
          </div>

          {/* 3. Charts & Activities Middle Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
              gap: '20px'
            }}
          >
            {/* Your 7-Day Mood Journey Line Chart */}
            <div
              className="glass-panel"
              style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                    Your 7-Day Mood Journey
                  </h3>
                  <div style={{ fontSize: '12px', color: '#a395a8' }}>Mood and energy trends at a glance</div>
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff2e93' }} />
                    <span style={{ color: '#e4d8e5' }}>Mood</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fda4af' }} />
                    <span style={{ color: '#e4d8e5' }}>Energy</span>
                  </div>
                </div>
              </div>

              {/* Chart container */}
              <div style={{ width: '100%', height: '170px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineChartData} margin={{ top: 8, right: 12, left: -26, bottom: 0 }}>
                    <XAxis
                      dataKey="day"
                      stroke="#716477"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.08)' }}
                    />
                    <YAxis
                      domain={[1, 5]}
                      ticks={[1, 2, 3, 4, 5]}
                      stroke="#716477"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(255, 255, 255, 0.08)' }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(23, 14, 28, 0.94)',
                        border: '1px solid rgba(255, 112, 186, 0.3)',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                        fontSize: '12px',
                        color: '#ffffff'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="#ff2e93"
                      strokeWidth={2.6}
                      dot={{ r: 3.5, fill: '#ff2e93', stroke: '#ffffff', strokeWidth: 1 }}
                      activeDot={{ r: 5, fill: '#ff70ba' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="energy"
                      stroke="#fda4af"
                      strokeWidth={1.8}
                      strokeDasharray="4 4"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Self-Care Preview Card */}
            <div
              className="glass-panel"
              style={{
                padding: '22px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'rgba(255, 46, 147, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff70ba' }}>
                    <Sparkles size={13} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                    Quick Self-Care
                  </h3>
                </div>
                <div style={{ fontSize: '12px', color: '#a395a8' }}>Personalized for your mood & energy</div>
              </div>

              {/* Card with picturesque photo thumbnail */}
              <div
                onClick={() => setActiveTab('selfcare')}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 112, 186, 0.2)',
                  borderRadius: '16px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 112, 186, 0.45)';
                  e.currentTarget.style.background = 'rgba(255, 112, 186, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 112, 186, 0.2)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
              >
                <img
                  src={natureWalkImg}
                  alt="Nature walk"
                  style={{
                    width: '68px',
                    height: '56px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    flexShrink: 0,
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>
                    Take a 10-minute walk
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#d48ba3', lineHeight: 1.35 }}>
                    Fresh air can boost your mood and reduce stress.
                  </div>
                </div>
                <ArrowRight size={16} color="#ff70ba" style={{ flexShrink: 0 }} />
              </div>

              {/* Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                <div style={{ width: '16px', height: '5px', borderRadius: '3px', background: '#ff2e93' }} />
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)' }} />
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.2)' }} />
              </div>
            </div>
          </div>

          {/* 4. Bottom 3-Column Widgets Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px'
            }}
          >
            {/* Widget A: Recent Journal Entries */}
            <div
              className="glass-panel"
              style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={16} color="#fda4af" />
                  <h3 style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: '#ffffff' }}>
                    Recent Journal Entries
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('journal')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff70ba',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}
                >
                  <span>View All</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              {/* Journal items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(journalEntries.slice(0, 3)).map((entry) => (
                  <div
                    key={entry.id}
                    onClick={() => setActiveTab('journal')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '12px',
                      padding: '10px 12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 112, 186, 0.3)';
                      e.currentTarget.style.background = 'rgba(255, 112, 186, 0.06)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '11px', color: '#a395a8' }}>{entry.date}</span>
                      <span
                        style={{
                          fontSize: '10.5px',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          background: 'rgba(255, 46, 147, 0.15)',
                          color: '#ff85c4',
                          fontWeight: 600
                        }}
                      >
                        {entry.moodAssociated === 'great' ? '😁 Grateful' : entry.moodAssociated === 'low' ? '😌 Calm' : '😊 Happy'}
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#ffffff', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {entry.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#a395a8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {entry.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget B: Mood Analytics Mini Dashboard */}
            <div
              className="glass-panel"
              style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="#fda4af" />
                <h3 style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: '#ffffff' }}>
                  Mood Analytics
                </h3>
              </div>

              {/* Tabs */}
              <div style={{ display: 'flex', gap: '4px', background: 'rgba(0, 0, 0, 0.25)', padding: '3px', borderRadius: '10px' }}>
                {['Mood Trends', 'Energy', 'Insights'].map((tab) => {
                  const key = tab.toLowerCase().split(' ')[0];
                  const isActive = analyticsTab === key || (key === 'mood' && analyticsTab === 'trends');
                  return (
                    <button
                      key={tab}
                      onClick={() => setAnalyticsTab(key === 'mood' ? 'trends' : key)}
                      style={{
                        flex: 1,
                        padding: '5px 8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        border: 'none',
                        borderRadius: '7px',
                        cursor: 'pointer',
                        background: isActive ? '#ff2e93' : 'transparent',
                        color: isActive ? '#ffffff' : '#a395a8',
                        transition: 'all 0.18s ease'
                      }}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Bar Chart */}
              <div style={{ height: '90px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 4, right: 0, left: -28, bottom: -6 }}>
                    <XAxis dataKey="day" stroke="#716477" fontSize={10} tickLine={false} axisLine={false} />
                    <Bar dataKey="score" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff2e93" />
                        <stop offset="100%" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Donut Score & Mini Stats */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'conic-gradient(#ff2e93 0% 70%, rgba(255, 255, 255, 0.1) 70% 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px'
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#17101f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                      {moodMeta.emoji || '😆'}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '10.5px', color: '#a395a8' }}>Average Mood</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>{avgMoodScore} / 5</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '10.5px', color: '#a395a8' }}>
                  <div>🌟 Best Day: <strong style={{ color: '#e4d8e5' }}>{bestDayStr}</strong></div>
                  <div>📉 Lowest Day: <strong style={{ color: '#e4d8e5' }}>{lowestDayStr}</strong></div>
                  <div>📝 Total Entries: <strong style={{ color: '#e4d8e5' }}>{moods.length}</strong></div>
                </div>
              </div>
            </div>

            {/* Widget C: Self-Care List */}
            <div
              className="glass-panel"
              style={{ padding: '22px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} color="#fda4af" />
                  <h3 style={{ margin: 0, fontSize: '14.5px', fontWeight: 700, color: '#ffffff' }}>
                    Self-Care
                  </h3>
                </div>

                {/* Pill switch */}
                <div style={{ display: 'flex', gap: '2px', background: 'rgba(0, 0, 0, 0.25)', padding: '2px', borderRadius: '10px' }}>
                  <button
                    onClick={() => setSelfCareTab('forYou')}
                    style={{
                      padding: '4px 8px',
                      fontSize: '11px',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selfCareTab === 'forYou' ? '#ff2e93' : 'transparent',
                      color: selfCareTab === 'forYou' ? '#ffffff' : '#a395a8'
                    }}
                  >
                    For You
                  </button>
                  <button
                    onClick={() => setSelfCareTab('all')}
                    style={{
                      padding: '4px 8px',
                      fontSize: '11px',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selfCareTab === 'all' ? '#ff2e93' : 'transparent',
                      color: selfCareTab === 'all' ? '#ffffff' : '#a395a8'
                    }}
                  >
                    All
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '11.5px', color: '#d48ba3' }}>💖 Personalized for your mood</div>

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {selfCareList.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveTab('selfcare')}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '12px',
                        padding: '10px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 112, 186, 0.35)';
                        e.currentTarget.style.background = 'rgba(255, 112, 186, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'rgba(255, 46, 147, 0.16)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ff70ba',
                          flexShrink: 0
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '11px', color: '#a395a8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.subtitle}
                        </div>
                      </div>
                      <ChevronRight size={15} color="#a395a8" />
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => setActiveTab('selfcare')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ff70ba',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: 'auto',
                  justifyContent: 'center'
                }}
              >
                <span>See More Suggestions</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* ================= RIGHT WIDGET COLUMN ================= */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 1. Quick Mood Check-in Widget */}
          <div
            className="glass-panel"
            style={{
              padding: '24px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              background: 'rgba(23, 14, 28, 0.78)',
              border: '1px solid rgba(255, 112, 186, 0.22)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Sparkles size={16} color="#fda4af" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                  Quick Mood Check-in
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', color: '#a395a8' }}>
                How are you feeling right now?
              </p>
            </div>

            {/* Success message */}
            {showCheckInSuccess && (
              <div
                style={{
                  background: 'rgba(52, 211, 153, 0.15)',
                  border: '1px solid rgba(52, 211, 153, 0.4)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  color: '#6ee7b7',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Check size={14} />
                <span>Check-in saved to your pulse!</span>
              </div>
            )}

            {/* 2x4 Mood Buttons Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px'
              }}
            >
              {quickMoodOptions.map((item) => {
                const isSelected = quickMood === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setQuickMood(item.id)}
                    className={`mood-tile ${isSelected ? 'active' : ''}`}
                    style={{ padding: '8px 4px' }}
                  >
                    <span style={{ fontSize: '22px' }}>{item.emoji}</span>
                    <span style={{ fontSize: '11px', fontWeight: isSelected ? 700 : 500 }}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Energy Level (1 to 10) */}
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#e4d8e5', marginBottom: '8px' }}>
                Energy Level
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuickEnergy(num)}
                    className={`energy-number-btn ${quickEnergy === num ? 'active' : ''}`}
                    style={{ fontSize: '11.5px', height: '30px' }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Note */}
            <div>
              <input
                type="text"
                placeholder="Add a note (optional)..."
                value={quickNotes}
                onChange={(e) => setQuickNotes(e.target.value)}
                style={{ width: '100%', fontSize: '12.5px', padding: '9px 12px' }}
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveQuickCheckIn}
              className="pink-btn"
              style={{ width: '100%', padding: '11px', fontSize: '13.5px', borderRadius: '12px' }}
            >
              <span>Save Check-in</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 2. Today's Suggestion Widget */}
          <div
            className="glass-panel"
            onClick={() => setShowBreathingModal(true)}
            style={{
              padding: '20px 22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              cursor: 'pointer',
              border: '1px solid rgba(255, 112, 186, 0.18)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lightbulb size={16} color="#fbbf24" />
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                Today's Suggestion
              </h3>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '12px',
                borderRadius: '14px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 46, 147, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  flexShrink: 0
                }}
              >
                🧘‍♀️
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>
                  Try 5 minutes of deep breathing
                </div>
                <div style={{ fontSize: '11px', color: '#a395a8', lineHeight: 1.35 }}>
                  It can help reduce anxiety and bring instant calm.
                </div>
              </div>
              <ArrowRight size={15} color="#ff70ba" style={{ flexShrink: 0 }} />
            </div>
          </div>

          {/* 3. Inspiration Cherry Blossom Aesthetic Card ("You got this ♡") */}
          <div
            className="glass-panel"
            style={{
              borderRadius: '20px',
              padding: '30px 24px',
              position: 'relative',
              overflow: 'hidden',
              backgroundImage: `linear-gradient(135deg, rgba(23, 14, 28, 0.88) 0%, rgba(20, 10, 25, 0.72) 100%), url(${blossomCardImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              minHeight: '190px',
              border: '1px solid rgba(255, 112, 186, 0.25)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5), 0 0 24px rgba(255, 46, 147, 0.15)'
            }}
          >
            {/* Elegant Script Header */}
            <div
              className="font-handwriting"
              style={{
                fontSize: '44px',
                lineHeight: 1.1,
                color: '#ffc1db',
                fontWeight: 600,
                textShadow: '0 0 20px rgba(255, 46, 147, 0.5)',
                marginBottom: '8px',
                letterSpacing: '1px'
              }}
            >
              You got this ♡
            </div>

            <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#ffffff', fontWeight: 600 }}>
              Your mental health matters.
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: '#d48ba3' }}>
              Be kind to yourself, always.
            </p>
          </div>
        </div>
      </div>

      {/* Deep Breathing Exercise Interactive Modal */}
      {showBreathingModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(8, 6, 13, 0.8)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setShowBreathingModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel"
            style={{
              maxWidth: '420px',
              width: '100%',
              padding: '32px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              background: 'rgba(23, 14, 28, 0.95)',
              border: '1px solid rgba(255, 112, 186, 0.35)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 46, 147, 0.25)'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>
              Mindful Breath & Center
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#a395a8', lineHeight: 1.5 }}>
              Follow the expanding circle. Inhale through your nose, hold gently, and slowly release.
            </p>

            {/* Breathing Animation Circle */}
            <div
              className="animate-pulse-subtle"
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 46, 147, 0.35) 0%, rgba(192, 132, 252, 0.15) 70%, transparent 100%)',
                border: '2px solid rgba(255, 112, 186, 0.5)',
                boxShadow: '0 0 35px rgba(255, 46, 147, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '15px'
              }}
            >
              Inhale & Calm
            </div>

            <button
              onClick={() => setShowBreathingModal(false)}
              className="pink-btn"
              style={{ padding: '9px 24px', fontSize: '13px' }}
            >
              Finish Exercise
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
