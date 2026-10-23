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
    ? MOOD_OPTIONS.find((m) => m.id === currentReferenceMood.mood) || MOOD_OPTIONS[2]
    : null;

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Title */}
      <div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.5px',
          margin: '0 0 6px 0'
        }}>
          Personalized Self-Care
        </h1>
        <p style={{ margin: 0, color: '#a1a1aa', fontSize: '15px' }}>
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
            background: 'linear-gradient(135deg, rgba(30, 20, 38, 0.85) 0%, rgba(18, 14, 25, 0.85) 100%)',
            border: '1px solid rgba(255, 46, 147, 0.35)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 46, 147, 0.15)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="#ff2e93" />
              <span style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>
                Tailored for Your Current State
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              <span className="pink-pill">
                <Smile size={14} />
                <span>{moodMeta.emoji} {moodMeta.label}</span>
              </span>
              <span className="amber-pill">
                <Zap size={14} />
                <span>Vitality {currentReferenceMood.energy}/10</span>
              </span>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '14px', color: '#e4e4e7', lineHeight: 1.6 }}>
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
                    background: isDone ? 'rgba(255, 46, 147, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                    border: isDone ? '1px solid #ff2e93' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
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
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#ff70ba', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {act.category} • {act.duration}
                      </span>
                    </div>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>
                      {act.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#d4d4d8', lineHeight: 1.5 }}>
                      {act.description}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleSelfCare(act.id)}
                    style={{
                      background: isDone ? 'linear-gradient(135deg, #ff2e93, #d91b75)' : 'rgba(255, 255, 255, 0.06)',
                      border: isDone ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#ffffff',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      fontSize: '12px',
                      fontWeight: 700,
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
                        <Circle size={14} />
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
            <div style={{ fontSize: '13px', color: '#a1a1aa' }}>Logging your mood unlocks customized suggestions based on your exact energy rating.</div>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#ffffff' }}>
          <div style={{
            background: 'rgba(255, 46, 147, 0.15)',
            padding: '6px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Heart size={16} color="#ff2e93" fill="#ff2e93" />
          </div>
          <span><strong>Today's Wellness Practices:</strong> {completedSelfCare.length} activity completed</span>
        </div>
        {completedSelfCare.length > 0 && (
          <span style={{ fontSize: '13px', color: '#4ade80', fontWeight: 700 }}>
            ✨ Wonderful work prioritizing your wellbeing!
          </span>
        )}
      </div>

      {/* Browse Library Filters */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '19px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Self-Care Practice Library
          </h2>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* Category tabs */}
            <div style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '3px',
              borderRadius: '10px'
            }}>
              {['all', 'Mind', 'Body', 'Soul', 'Connection'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    border: 'none',
                    background: activeCategory === cat ? 'linear-gradient(135deg, #ff2e93, #d91b75)' : 'transparent',
                    color: activeCategory === cat ? '#ffffff' : '#a1a1aa',
                    fontWeight: activeCategory === cat ? 700 : 500,
                    padding: '6px 12px',
                    borderRadius: '8px',
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
              style={{
                padding: '7px 12px',
                fontSize: '12px',
                color: '#ffffff'
              }}
            >
              <option value="all" style={{ background: '#171220' }}>Any Energy</option>
              <option value="low" style={{ background: '#171220' }}>Low Energy (1-4)</option>
              <option value="moderate" style={{ background: '#171220' }}>Moderate Energy (4-7)</option>
              <option value="high" style={{ background: '#171220' }}>High Energy (7-10)</option>
            </select>
          </div>
        </div>

        {/* Activity Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '18px'
        }}>
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
                  border: isCompleted ? '1px solid #ff2e93' : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isCompleted ? 'rgba(255, 46, 147, 0.08)' : 'rgba(22, 17, 28, 0.72)',
                  boxShadow: isCompleted ? '0 0 16px rgba(255, 46, 147, 0.25)' : '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="pink-pill" style={{ fontSize: '11px', padding: '2px 8px' }}>
                      {activity.category}
                    </span>

                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#a1a1aa' }}>
                      <Clock size={12} color="#fbbf24" />
                      <span>{activity.duration}</span>
                    </span>
                  </div>

                  <h3 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>
                    {activity.title}
                  </h3>

                  <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#d4d4d8', lineHeight: 1.5 }}>
                    {activity.description}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', fontSize: '11px', color: '#fbbf24', fontWeight: 600 }}>
                    <span>⚡ Energy req: {activity.minEnergy}-{activity.maxEnergy}/10</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleSelfCare(activity.id)}
                  style={{
                    background: isCompleted ? 'linear-gradient(135deg, #ff2e93, #d91b75)' : 'rgba(255, 255, 255, 0.06)',
                    border: isCompleted ? 'none' : '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '8px 14px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: isCompleted ? '0 0 14px rgba(255, 46, 147, 0.45)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 size={15} color="#ffffff" />
                      <span>Completed Today</span>
                    </>
                  ) : (
                    <>
                      <Circle size={15} />
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
