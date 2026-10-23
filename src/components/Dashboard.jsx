import React from 'react';
import {
  Smile,
  Zap,
  BookOpen,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { MOOD_OPTIONS, SELF_CARE_LIBRARY } from '../data/sampleData';

export default function Dashboard({ setActiveTab }) {
  const { moods, journalEntries, todayMood, latestMood, completedSelfCare, toggleSelfCare } = useWellness();

  // Current mood reference
  const currentMoodObj = todayMood || latestMood;
  const moodMeta = currentMoodObj
    ? MOOD_OPTIONS.find((m) => m.id === currentMoodObj.mood) || MOOD_OPTIONS[2]
    : null;

  // Past 7 days check-in items for weekly trend insight
  const last7Days = moods.slice(0, 7);

  // Self care recommendation based on current mood
  const recommendedCare = React.useMemo(() => {
    if (!currentMoodObj) return SELF_CARE_LIBRARY.slice(0, 2);
    const userMoodId = currentMoodObj.mood;
    const userEnergy = currentMoodObj.energy;

    const matched = SELF_CARE_LIBRARY.filter((act) => {
      return act.suitableMoods.includes(userMoodId) && userEnergy >= act.minEnergy && userEnergy <= act.maxEnergy;
    });

    return matched.length > 0 ? matched.slice(0, 2) : SELF_CARE_LIBRARY.slice(0, 2);
  }, [currentMoodObj]);

  const recentJournals = journalEntries.slice(0, 3);

  // Average weekly score
  const avgMoodScore = last7Days.length > 0
    ? (last7Days.reduce((acc, m) => acc + (m.score || 3), 0) / last7Days.length).toFixed(1)
    : '—';

  const avgEnergy = last7Days.length > 0
    ? (last7Days.reduce((acc, m) => acc + (m.energy || 5), 0) / last7Days.length).toFixed(1)
    : '—';

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. Today's Mood Status Hero */}
      <div
        className="glass-panel"
        style={{
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          background: 'linear-gradient(135deg, rgba(28, 20, 36, 0.85) 0%, rgba(16, 12, 22, 0.8) 100%)',
          border: '1px solid rgba(255, 46, 147, 0.25)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 46, 147, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle decorative glow orb */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 46, 147, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '620px', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#fbbf24',
            fontSize: '13px',
            fontWeight: 600,
            marginBottom: '10px',
            background: 'rgba(245, 158, 11, 0.12)',
            padding: '3px 10px',
            borderRadius: '20px',
            border: '1px solid rgba(245, 158, 11, 0.25)'
          }}>
            <Calendar size={13} />
            <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>

          {todayMood ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '4px 0 10px 0' }}>
                <span style={{
                  fontSize: '40px',
                  filter: 'drop-shadow(0 0 12px rgba(255, 46, 147, 0.5))'
                }}>
                  {todayMood.emoji}
                </span>
                <div>
                  <h2 style={{
                    margin: 0,
                    fontSize: '26px',
                    fontWeight: 800,
                    color: '#ffffff',
                    letterSpacing: '-0.5px'
                  }}>
                    Feeling{' '}
                    <span style={{
                      background: 'linear-gradient(135deg, #ff2e93 0%, #ff70ba 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {moodMeta?.label || 'Good'}
                    </span>{' '}
                    Today
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#d4d4d8', marginTop: '4px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fbbf24', fontWeight: 600 }}>
                      <Zap size={14} />
                      <span>Vitality: <strong>{todayMood.energy}/10</strong></span>
                    </span>
                    <span style={{ color: '#71717a' }}>•</span>
                    <span style={{ color: '#4ade80', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={13} />
                      <span>Checked In</span>
                    </span>
                  </div>
                </div>
              </div>

              {todayMood.notes && (
                <p style={{
                  margin: '10px 0 0 0',
                  fontSize: '14px',
                  color: '#e4e4e7',
                  fontStyle: 'italic',
                  lineHeight: 1.5,
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  borderLeft: '3px solid #ff2e93'
                }}>
                  "{todayMood.notes}"
                </p>
              )}
            </div>
          ) : (
            <div>
              <h2 style={{
                margin: '4px 0 8px 0',
                fontSize: '26px',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.5px'
              }}>
                How is your emotional pulse today?
              </h2>
              <p style={{ margin: 0, fontSize: '15px', color: '#a1a1aa', lineHeight: 1.5 }}>
                Take a mindful pause to tune in. Logging your mood powers your customized insights and self-care routines.
              </p>
            </div>
          )}
        </div>

        <div style={{ zIndex: 1 }}>
          <button
            onClick={() => setActiveTab('mood')}
            className="pink-btn"
            style={{
              padding: '12px 22px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Smile size={18} />
            <span>{todayMood ? "Update Today's Mood" : 'Complete Daily Check-in'}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* 2. Weekly Insights & Quick Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '16px'
      }}>
        {/* Metric 1 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }}>7-Day Mood Average</span>
            <div style={{
              background: 'rgba(255, 46, 147, 0.15)',
              padding: '6px',
              borderRadius: '8px',
              color: '#ff2e93'
            }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
            {avgMoodScore} <span style={{ fontSize: '15px', color: '#71717a', fontWeight: 500 }}>/ 5</span>
          </div>
          <div style={{ fontSize: '12px', color: '#ff70ba', marginTop: '6px', fontWeight: 600 }}>
            {avgMoodScore >= 4 ? '✨ Uplifted & Radiant' : avgMoodScore >= 3 ? '⚖️ Grounded & Steady' : '🌸 Gentle care recommended'}
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }}>Energy Baseline</span>
            <div style={{
              background: 'rgba(245, 158, 11, 0.15)',
              padding: '6px',
              borderRadius: '8px',
              color: '#fbbf24'
            }}>
              <Zap size={16} />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
            {avgEnergy} <span style={{ fontSize: '15px', color: '#71717a', fontWeight: 500 }}>/ 10</span>
          </div>
          <div style={{ fontSize: '12px', color: '#fbbf24', marginTop: '6px', fontWeight: 600 }}>
            ⚡ Physical vitality index
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }}>Journal Entries</span>
            <div style={{
              background: 'rgba(236, 72, 153, 0.15)',
              padding: '6px',
              borderRadius: '8px',
              color: '#f472b6'
            }}>
              <BookOpen size={16} />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
            {journalEntries.length} <span style={{ fontSize: '15px', color: '#71717a', fontWeight: 500 }}>written</span>
          </div>
          <div style={{ fontSize: '12px', color: '#f472b6', marginTop: '6px', fontWeight: 600 }}>
            📖 Mindful reflections logged
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }}>Self-Care Done Today</span>
            <div style={{
              background: 'rgba(255, 46, 147, 0.15)',
              padding: '6px',
              borderRadius: '8px',
              color: '#ff2e93'
            }}>
              <Heart size={16} fill="#ff2e93" />
            </div>
          </div>
          <div style={{ fontSize: '30px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px' }}>
            {completedSelfCare.length} <span style={{ fontSize: '15px', color: '#71717a', fontWeight: 500 }}>completed</span>
          </div>
          <div style={{ fontSize: '12px', color: completedSelfCare.length > 0 ? '#4ade80' : '#fbbf24', marginTop: '6px', fontWeight: 600 }}>
            {completedSelfCare.length > 0 ? '🎉 Nurturing your wellness!' : '⚡ Pick an activity today'}
          </div>
        </div>
      </div>

      {/* 3. 7-Day Pulse Trajectory */}
      <div className="glass-panel" style={{ padding: '22px 26px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
              7-Day Wellness Trajectory
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#a1a1aa' }}>
              Your recent sequence of emotional states and energy levels
            </p>
          </div>
          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff2e93',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>View Full Trends</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {last7Days.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#a1a1aa', fontSize: '13px' }}>
            No check-in history yet. Check in above to start your weekly pulse trajectory!
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px'
          }}>
            {last7Days.map((entry) => {
              const meta = MOOD_OPTIONS.find((m) => m.id === entry.mood) || MOOD_OPTIONS[2];
              return (
                <div
                  key={entry.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '14px 10px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 600 }}>
                    {entry.date}
                  </span>
                  <span style={{ fontSize: '28px', filter: 'drop-shadow(0 0 6px rgba(255, 46, 147, 0.3))' }}>
                    {entry.emoji || meta.emoji}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: meta.color }}>
                    {meta.label}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    color: '#fbbf24',
                    background: 'rgba(245, 158, 11, 0.15)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontWeight: 600
                  }}>
                    ⚡ {entry.energy}/10
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Two Columns: Recent Reflections & Recommended Self-Care */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '22px'
      }}>
        {/* Column A: Recent Journal Entries */}
        <div className="glass-panel" style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                background: 'rgba(255, 46, 147, 0.15)',
                padding: '6px',
                borderRadius: '8px',
                color: '#ff2e93'
              }}>
                <BookOpen size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
                Recent Reflections
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('journal')}
              style={{
                background: 'none',
                border: 'none',
                color: '#ff70ba',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {recentJournals.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px 10px', color: '#a1a1aa', fontSize: '13px' }}>
              <p style={{ margin: '0 0 12px 0' }}>No journal reflections logged yet.</p>
              <button
                onClick={() => setActiveTab('journal')}
                className="pink-btn"
                style={{ padding: '8px 16px', fontSize: '12px' }}
              >
                Write First Reflection
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentJournals.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => setActiveTab('journal')}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '10px',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 46, 147, 0.35)';
                    e.currentTarget.style.background = 'rgba(255, 46, 147, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#ffffff' }}>
                      {entry.title}
                    </h4>
                    <span style={{ fontSize: '11px', color: '#a1a1aa' }}>{entry.date}</span>
                  </div>
                  <p style={{
                    margin: 0,
                    fontSize: '13px',
                    color: '#d4d4d8',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    lineHeight: 1.4
                  }}>
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Column B: Recommended Self-Care Preview */}
        <div className="glass-panel" style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                background: 'rgba(245, 158, 11, 0.15)',
                padding: '6px',
                borderRadius: '8px',
                color: '#fbbf24'
              }}>
                <Sparkles size={16} />
              </div>
              <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
                Curated Self-Care
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('selfcare')}
              style={{
                background: 'none',
                border: 'none',
                color: '#fbbf24',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Explore More</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recommendedCare.map((act) => {
              const isDone = completedSelfCare.includes(act.id);
              return (
                <div
                  key={act.id}
                  style={{
                    background: isDone ? 'rgba(255, 46, 147, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: isDone ? '1px solid rgba(255, 46, 147, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '10px',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '11px', color: '#ff70ba', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      {act.category} • {act.duration}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                      {act.title}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSelfCare(act.id)}
                    style={{
                      background: isDone ? 'linear-gradient(135deg, #ff2e93, #d91b75)' : 'rgba(255, 255, 255, 0.08)',
                      border: isDone ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#ffffff',
                      borderRadius: '8px',
                      padding: '7px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: isDone ? '0 0 12px rgba(255, 46, 147, 0.4)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 size={13} />
                        <span>Done</span>
                      </>
                    ) : (
                      <span>Complete</span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
