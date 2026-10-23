import React, { useState, useMemo } from 'react';
import { Sparkles, CheckCircle2, Circle, Clock, Heart, Smile, Zap } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { SELF_CARE_LIBRARY, MOOD_OPTIONS } from '../data/sampleData';
import EmptyState from './EmptyState';

export default function SelfCare({ onNavigateToMoodCheckIn }) {
  const { latestMood, todayMood, completedSelfCare, toggleSelfCare } = useWellness();

  const [activeCategory, setActiveCategory] = useState('all'); // all, Mind, Body, Soul, Connection
  const [energyFilter, setEnergyFilter] = useState('all'); // all, low, moderate, high

  const currentReferenceMood = todayMood || latestMood;

  // Filter personalized recommendations based on the user's latest mood & energy
  const personalizedActivities = useMemo(() => {
    if (!currentReferenceMood) return SELF_CARE_LIBRARY;

    const userMoodId = currentReferenceMood.mood;
    const userEnergy = currentReferenceMood.energy;

    return SELF_CARE_LIBRARY.filter((act) => {
      const moodMatches = act.suitableMoods.includes(userMoodId);
      const energyMatches = userEnergy >= act.minEnergy && userEnergy <= act.maxEnergy;
      return moodMatches && energyMatches;
    });
  }, [currentReferenceMood]);

  // General list with tab/filter selections
  const displayActivities = useMemo(() => {
    return SELF_CARE_LIBRARY.filter((act) => {
      if (activeCategory !== 'all' && act.category !== activeCategory) {
        return false;
      }
      if (energyFilter === 'low' && act.minEnergy > 4) return false;
      if (energyFilter === 'moderate' && (act.maxEnergy < 4 || act.minEnergy > 7)) return false;
      if (energyFilter === 'high' && act.maxEnergy < 7) return false;

      return true;
    });
  }, [activeCategory, energyFilter]);

  const moodMeta = currentReferenceMood
    ? MOOD_OPTIONS.find((m) => m.id === currentReferenceMood.mood) || MOOD_OPTIONS[0]
    : null;

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* Title */}
      <div>
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.4px',
            margin: '0 0 4px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <span>Personalized Self-Care & Practices</span>
          <span style={{ fontSize: '20px' }}>✨</span>
        </h1>
        <p style={{ margin: 0, color: '#a395a8', fontSize: '14px' }}>
          Actionable, mood-attuned mindfulness practices curated to align with your exact energy level.
        </p>
      </div>

      {/* Personalized Recommendation Banner based on current mood & energy */}
      {currentReferenceMood ? (
        <div
          className="glass-panel"
          style={{
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: 'linear-gradient(135deg, rgba(28, 16, 32, 0.85) 0%, rgba(18, 11, 23, 0.85) 100%)',
            border: '1px solid rgba(255, 112, 186, 0.3)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.45), 0 0 20px rgba(255, 46, 147, 0.12)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} color="#ff70ba" />
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                Tailored for Your Current State
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12.5px' }}>
              <span className="pill-badge pill-pink">
                <Smile size={13} />
                <span>{moodMeta.emoji} {moodMeta.label}</span>
              </span>
              <span className="pill-badge pill-amber">
                <Zap size={13} fill="#fbbf24" />
                <span>Vitality {currentReferenceMood.energy}/10</span>
              </span>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '13.5px', color: '#e4d8e5', lineHeight: 1.6 }}>
            {currentReferenceMood.energy <= 4 ? (
              <>Since your energy is on the lower side right now, we prioritize <strong>restorative, gentle practices</strong> to replenish your reserves without friction.</>
            ) : currentReferenceMood.energy <= 7 ? (
              <>With a balanced vitality level, moderate physical stretches, mindful outdoor strolls, and brief journaling will sustain your equilibrium.</>
            ) : (
              <>Your energy is high and vibrant! Channel this momentum into creative sprints, expressive movement, and celebrating small victories.</>
            )}
          </p>

          {/* Personalized Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '14px' }}>
            {personalizedActivities.slice(0, 3).map((act) => {
              const isDone = completedSelfCare.includes(act.id);
              return (
                <div
                  key={act.id}
                  style={{
                    background: isDone ? 'rgba(255, 46, 147, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: isDone ? '1px solid #ff2e93' : '1px solid rgba(255, 112, 186, 0.16)',
                    borderRadius: '14px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px',
                    boxShadow: isDone ? '0 0 16px rgba(255, 46, 147, 0.25)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#ff70ba', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                        {act.category} • {act.duration}
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '14.5px', fontWeight: 700, color: '#ffffff' }}>
                      {act.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '12.5px', color: '#a395a8', lineHeight: 1.45 }}>
                      {act.description}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleSelfCare(act.id)}
                    style={{
                      background: isDone ? 'linear-gradient(135deg, #ff2e93, #db2777)' : 'rgba(255, 255, 255, 0.05)',
                      border: isDone ? 'none' : '1px solid rgba(255, 112, 186, 0.2)',
                      color: '#ffffff',
                      borderRadius: '10px',
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: isDone ? '0 0 14px rgba(255, 46, 147, 0.45)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {isDone ? (
                      <>
                        <CheckCircle2 size={14} color="#ffffff" />
                        <span>Completed Today!</span>
                      </>
                    ) : (
                      <>
                        <Circle size={14} color="#fda4af" />
                        <span>Mark as Done</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className="glass-panel"
          style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '15px' }}>Check in today for tailored recommendations!</div>
            <div style={{ fontSize: '13px', color: '#a395a8' }}>Logging your mood unlocks customized suggestions based on your exact energy rating.</div>
          </div>
          <button
            onClick={onNavigateToMoodCheckIn}
            className="pink-btn"
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            Check In Now
          </button>
        </div>
      )}

      {/* Completed Count Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#ffffff' }}>
          <div
            style={{
              background: 'rgba(255, 46, 147, 0.16)',
              padding: '6px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Heart size={15} color="#ff70ba" fill="#ff70ba" />
          </div>
          <span><strong>Today's Wellness Practices:</strong> {completedSelfCare.length} activity completed</span>
        </div>
        {completedSelfCare.length > 0 && (
          <span style={{ fontSize: '12.5px', color: '#6ee7b7', fontWeight: 600 }}>
            ✨ Wonderful work prioritizing your wellbeing!
          </span>
        )}
      </div>

      {/* Browse Library Filters */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Self-Care Practice Library
          </h2>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {/* Category tabs */}
            <div
              style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 112, 186, 0.15)',
                padding: '3px',
                borderRadius: '10px'
              }}
            >
              {['all', 'Mind', 'Body', 'Soul', 'Connection'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    border: 'none',
                    background: activeCategory === cat ? 'linear-gradient(135deg, #ff2e93, #db2777)' : 'transparent',
                    color: activeCategory === cat ? '#ffffff' : '#a395a8',
                    fontWeight: activeCategory === cat ? 700 : 500,
                    padding: '6px 12px',
                    borderRadius: '7px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    boxShadow: activeCategory === cat ? '0 0 10px rgba(255, 46, 147, 0.3)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat === 'all' ? 'All Types' : cat}
                </button>
              ))}
            </div>

            {/* Energy filter */}
            <select
              value={energyFilter}
              onChange={(e) => setEnergyFilter(e.target.value)}
              style={{ padding: '6px 12px', fontSize: '12px', color: '#ffffff' }}
            >
              <option value="all" style={{ background: '#17101f' }}>Any Energy</option>
              <option value="low" style={{ background: '#17101f' }}>Low Energy (1-4)</option>
              <option value="moderate" style={{ background: '#17101f' }}>Moderate Energy (4-7)</option>
              <option value="high" style={{ background: '#17101f' }}>High Energy (7-10)</option>
            </select>
          </div>
        </div>

        {/* Activity Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '18px'
          }}
        >
          {displayActivities.map((activity) => {
            const isCompleted = completedSelfCare.includes(activity.id);

            return (
              <div
                key={activity.id}
                className="glass-panel"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '14px',
                  border: isCompleted ? '1px solid #ff2e93' : '1px solid rgba(255, 112, 186, 0.16)',
                  background: isCompleted ? 'rgba(255, 46, 147, 0.08)' : 'rgba(23, 14, 28, 0.68)',
                  boxShadow: isCompleted ? '0 0 16px rgba(255, 46, 147, 0.25)' : '0 8px 32px rgba(0, 0, 0, 0.35)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="pill-badge pill-pink" style={{ fontSize: '11px', padding: '2px 8px' }}>
                      {activity.category}
                    </span>

                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', color: '#a395a8' }}>
                      <Clock size={12} color="#fda4af" />
                      <span>{activity.duration}</span>
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                    {activity.title}
                  </h3>

                  <p style={{ margin: '0 0 10px 0', fontSize: '12.5px', color: '#a395a8', lineHeight: 1.5 }}>
                    {activity.description}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', fontSize: '11px', color: '#fda4af', fontWeight: 600 }}>
                    <span>⚡ Energy req: {activity.minEnergy}-{activity.maxEnergy}/10</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleSelfCare(activity.id)}
                  style={{
                    background: isCompleted ? 'linear-gradient(135deg, #ff2e93, #db2777)' : 'rgba(255, 255, 255, 0.05)',
                    border: isCompleted ? 'none' : '1px solid rgba(255, 112, 186, 0.2)',
                    color: '#ffffff',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: isDoneHighlight(isCompleted),
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 size={14} color="#ffffff" />
                      <span>Completed Today</span>
                    </>
                  ) : (
                    <>
                      <Circle size={14} color="#fda4af" />
                      <span>Mark as Done</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function isDoneHighlight(done) {
  return done ? '0 0 14px rgba(255, 46, 147, 0.45)' : 'none';
}
