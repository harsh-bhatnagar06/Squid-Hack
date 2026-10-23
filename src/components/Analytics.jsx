import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart3, TrendingUp, Zap, Smile, Calendar, Award } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { MOOD_OPTIONS } from '../data/sampleData';
import EmptyState from './EmptyState';

export default function Analytics({ onNavigateToMoodCheckIn }) {
  const { moods } = useWellness();
  const [timeRange, setTimeRange] = useState('7'); // '7', '14', 'all'

  // Filter moods based on selected time range and sort chronologically
  const chartData = useMemo(() => {
    if (!moods || moods.length === 0) return [];

    let filtered = [...moods];
    if (timeRange !== 'all') {
      const days = Number(timeRange);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      const cutoffStr = cutoff.toISOString().split('T')[0];
      filtered = filtered.filter((m) => m.date >= cutoffStr);
    }

    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    return filtered.map((item) => {
      const moodMeta = MOOD_OPTIONS.find((m) => m.id === item.mood) || MOOD_OPTIONS[2];
      const dateParts = item.date.split('-');
      const shortDate = `${dateParts[1]}/${dateParts[2]}`;

      return {
        id: item.id,
        rawDate: item.date,
        date: shortDate,
        moodLabel: moodMeta.label,
        emoji: moodMeta.emoji,
        moodScore: item.score || moodMeta.score,
        energy: item.energy || 5,
        color: moodMeta.color
      };
    });
  }, [moods, timeRange]);

  // Compute key metrics
  const stats = useMemo(() => {
    if (moods.length === 0) {
      return { avgMood: 0, avgEnergy: 0, topMood: 'N/A', totalEntries: 0, streak: 0 };
    }

    const totalMood = moods.reduce((acc, m) => acc + (m.score || 3), 0);
    const totalEnergy = moods.reduce((acc, m) => acc + (m.energy || 5), 0);

    const freq = {};
    moods.forEach((m) => {
      freq[m.mood] = (freq[m.mood] || 0) + 1;
    });
    let topMoodKey = Object.keys(freq).reduce((a, b) => (freq[a] > freq[b] ? a : b), 'good');
    const topMoodObj = MOOD_OPTIONS.find((m) => m.id === topMoodKey) || MOOD_OPTIONS[1];

    const uniqueDates = Array.from(new Set(moods.map((m) => m.date))).sort().reverse();
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < uniqueDates.length; i++) {
      const entryDate = new Date(uniqueDates[i] + 'T00:00:00');
      const diffDays = Math.round((today - entryDate) / (1000 * 60 * 60 * 24));

      if (diffDays === streak || diffDays === streak + 1) {
        streak++;
      } else {
        break;
      }
    }

    return {
      avgMood: (totalMood / moods.length).toFixed(1),
      avgEnergy: (totalEnergy / moods.length).toFixed(1),
      topMood: `${topMoodObj.emoji} ${topMoodObj.label}`,
      totalEntries: moods.length,
      streak: Math.max(streak, 1)
    };
  }, [moods]);

  // Mood Distribution Pie Data
  const pieData = useMemo(() => {
    const counts = {};
    MOOD_OPTIONS.forEach((m) => {
      counts[m.id] = 0;
    });

    moods.forEach((m) => {
      if (counts[m.mood] !== undefined) {
        counts[m.mood]++;
      }
    });

    return MOOD_OPTIONS.map((m) => ({
      name: `${m.emoji} ${m.label}`,
      value: counts[m.id] || 0,
      color: m.color
    })).filter((item) => item.value > 0);
  }, [moods]);

  // Custom Dark Glass Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{
          background: 'rgba(18, 14, 25, 0.95)',
          border: '1px solid rgba(255, 46, 147, 0.4)',
          borderRadius: '12px',
          padding: '12px 16px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 16px rgba(255, 46, 147, 0.25)',
          fontSize: '13px',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
            {data.rawDate}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff70ba', fontWeight: 600 }}>
            <span>Mood:</span>
            <span>{data.emoji} {data.moodLabel} ({data.moodScore}/5)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', marginTop: '4px', fontWeight: 600 }}>
            <span>Vitality:</span>
            <span>⚡ Level {data.energy}/10</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Title & Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.5px',
            margin: '0 0 6px 0'
          }}>
            Wellness Analytics
          </h1>
          <p style={{ margin: 0, color: '#a1a1aa', fontSize: '15px' }}>
            Visualize your emotional trajectories, weekly vitality trends, and sentiment balance.
          </p>
        </div>

        {/* Time range selector */}
        <div style={{
          display: 'flex',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '4px',
          borderRadius: '10px'
        }}>
          {[
            { id: '7', label: 'Past 7 Days' },
            { id: '14', label: 'Past 14 Days' },
            { id: 'all', label: 'All History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTimeRange(tab.id)}
              style={{
                border: 'none',
                background: timeRange === tab.id ? 'linear-gradient(135deg, #ff2e93, #d91b75)' : 'transparent',
                color: timeRange === tab.id ? '#ffffff' : '#a1a1aa',
                fontWeight: timeRange === tab.id ? 700 : 500,
                padding: '7px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                cursor: 'pointer',
                boxShadow: timeRange === tab.id ? '0 0 12px rgba(255, 46, 147, 0.4)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {moods.length === 0 ? (
        <EmptyState
          icon={BarChart3}
          title="No analytics data recorded yet"
          description="Once you record a few daily mood check-ins, trends and charts will automatically render here."
          actionText="Log Your First Mood"
          onAction={onNavigateToMoodCheckIn}
        />
      ) : (
        <>
          {/* Key Metric Summary Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff2e93', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                <TrendingUp size={16} />
                <span>Avg. Mood Score</span>
              </div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                {stats.avgMood} <span style={{ fontSize: '15px', color: '#71717a', fontWeight: 400 }}>/ 5.0</span>
              </div>
              <div style={{ fontSize: '12px', color: '#ff70ba', marginTop: '4px', fontWeight: 600 }}>Overall emotional health</div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                <Zap size={16} />
                <span>Avg. Vitality</span>
              </div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                {stats.avgEnergy} <span style={{ fontSize: '15px', color: '#71717a', fontWeight: 400 }}>/ 10.0</span>
              </div>
              <div style={{ fontSize: '12px', color: '#fbbf24', marginTop: '4px', fontWeight: 600 }}>Daily vitality baseline</div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f472b6', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                <Smile size={16} />
                <span>Dominant Mood</span>
              </div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                {stats.topMood}
              </div>
              <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '4px' }}>Most frequent state</div>
            </div>

            <div className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
                <Award size={16} />
                <span>Active Streak</span>
              </div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
                {stats.streak} <span style={{ fontSize: '15px', color: '#71717a', fontWeight: 400 }}>days</span>
              </div>
              <div style={{ fontSize: '12px', color: '#4ade80', marginTop: '4px', fontWeight: 600 }}>Consecutive check-ins</div>
            </div>
          </div>

          {/* Chart 1: Mood Score & Energy Level Line Trend */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
                  Mood Score & Vitality Trajectory
                </h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#a1a1aa' }}>
                  Emotional wellbeing (1-5) correlated with physical energy levels (1-10)
                </p>
              </div>
            </div>

            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                  <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} />
                  <YAxis yAxisId="left" domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#ff2e93" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" domain={[1, 10]} ticks={[2, 4, 6, 8, 10]} stroke="#fbbf24" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ color: '#d4d4d8', fontSize: '13px' }} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="moodScore"
                    name="Mood Score (1-5)"
                    stroke="#ff2e93"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#ff2e93', stroke: '#ffffff', strokeWidth: 1.5 }}
                    activeDot={{ r: 8, fill: '#ff70ba', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="energy"
                    name="Vitality (1-10)"
                    stroke="#fbbf24"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 4, fill: '#fbbf24' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grid with 2 Charts: Energy Bar Chart & Mood Distribution Pie */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '22px'
          }}>
            {/* Chart 2: Daily Vitality Level Bars */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
                Energy Ratings By Date
              </h3>
              <p style={{ margin: '0 0 18px 0', fontSize: '13px', color: '#a1a1aa' }}>
                Daily vitality levels across check-ins
              </p>

              <div style={{ width: '100%', height: 230 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} />
                    <YAxis domain={[0, 10]} ticks={[2, 4, 6, 8, 10]} stroke="#71717a" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="energy" name="Vitality" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Mood Distribution Breakdown */}
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
                Mood Distribution Balance
              </h3>
              <p style={{ margin: '0 0 18px 0', fontSize: '13px', color: '#a1a1aa' }}>
                Proportion of emotional states logged
              </p>

              {pieData.length === 0 ? (
                <div style={{ height: 230, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#71717a', fontSize: '13px' }}>
                  No mood entries to display
                </div>
              ) : (
                <div style={{ width: '100%', height: 230 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0, 0, 0, 0.5)" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: 'rgba(18, 14, 25, 0.95)', border: '1px solid rgba(255, 46, 147, 0.3)', borderRadius: '8px', color: '#ffffff' }} />
                      <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#d4d4d8', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
