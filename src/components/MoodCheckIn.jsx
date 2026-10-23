import React, { useState } from 'react';
import { Smile, Zap, Calendar, FileText, CheckCircle2, Trash2, ArrowRight } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { MOOD_OPTIONS } from '../data/sampleData';
import EmptyState from './EmptyState';

export default function MoodCheckIn({ onNavigateToJournal, onNavigateToSelfCare }) {
  const { moods, addMoodCheckIn, deleteMoodCheckIn, todayStr } = useWellness();

  const [selectedMood, setSelectedMood] = useState('good');
  const [energyLevel, setEnergyLevel] = useState(7);
  const [notes, setNotes] = useState('');
  const [checkInDate, setCheckInDate] = useState(todayStr);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) {
      setFormError('Please select a mood before submitting.');
      return;
    }

    if (!checkInDate) {
      setFormError('Please select a valid date.');
      return;
    }

    setFormError('');
    addMoodCheckIn({
      mood: selectedMood,
      energy: Number(energyLevel),
      notes: notes,
      date: checkInDate
    });

    setSuccessMessage(true);
    setNotes('');

    setTimeout(() => {
      setSuccessMessage(false);
    }, 4500);
  };

  const getEnergyDescriptor = (level) => {
    if (level <= 2) return 'Depleted / Rest Needed';
    if (level <= 4) return 'Low Energy / Sluggish';
    if (level <= 6) return 'Moderate / Balanced';
    if (level <= 8) return 'High Vitality / Motivated';
    return 'Peak / Supercharged';
  };

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Title & Introduction */}
      <div>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.5px',
          margin: '0 0 6px 0'
        }}>
          Daily Mood Check-in
        </h1>
        <p style={{ margin: 0, color: '#a1a1aa', fontSize: '15px' }}>
          Tune in to your emotional rhythm. Log your feelings, vitality index, and mindful context.
        </p>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div style={{
          background: 'rgba(255, 46, 147, 0.15)',
          border: '1px solid rgba(255, 46, 147, 0.5)',
          borderRadius: '12px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#ffffff',
          fontSize: '14px',
          boxShadow: '0 0 20px rgba(255, 46, 147, 0.35)',
          backdropFilter: 'blur(16px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={20} color="#ff2e93" />
            <span><strong style={{ color: '#ff70ba' }}>Check-in recorded!</strong> Your wellness pulse and recommendations are refreshed.</span>
          </div>
          {onNavigateToSelfCare && (
            <button
              onClick={onNavigateToSelfCare}
              className="pink-btn"
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>See Recommendations</span>
              <ArrowRight size={13} />
            </button>
          )}
        </div>
      )}

      {/* Check-in Form Card */}
      <form
        onSubmit={handleSubmit}
        className="glass-panel"
        style={{
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}
      >
        {formError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            color: '#fca5a5',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '13px'
          }}>
            {formError}
          </div>
        )}

        {/* Date Selector */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: '#e4e4e7', marginBottom: '8px' }}>
            <Calendar size={16} color="#fbbf24" />
            <span>Check-in Date:</span>
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            style={{
              padding: '10px 14px',
              maxWidth: '220px',
              fontSize: '14px'
            }}
          />
        </div>

        {/* 1. Mood Selection */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: '#e4e4e7', marginBottom: '12px' }}>
            <Smile size={16} color="#ff2e93" />
            <span>Select Your Current Mood:</span>
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '12px'
          }}>
            {MOOD_OPTIONS.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  style={{
                    padding: '16px 12px',
                    borderRadius: '12px',
                    border: isSelected ? `2px solid ${mood.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isSelected ? `rgba(255, 46, 147, 0.18)` : 'rgba(255, 255, 255, 0.03)',
                    boxShadow: isSelected ? `0 0 16px ${mood.color}40` : 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <span style={{ fontSize: '34px', filter: isSelected ? 'drop-shadow(0 0 8px rgba(255, 46, 147, 0.6))' : 'none' }}>
                    {mood.emoji}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: isSelected ? '#ffffff' : '#d4d4d8' }}>
                    {mood.label}
                  </span>
                  <span style={{ fontSize: '11px', color: '#a1a1aa', textAlign: 'center', lineHeight: 1.3 }}>
                    {mood.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Energy Rating */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: '#e4e4e7' }}>
              <Zap size={16} color="#fbbf24" />
              <span>Energy & Vitality Rating (1 - 10):</span>
            </label>
            <span className="amber-pill">
              Level {energyLevel} — <strong>{getEnergyDescriptor(energyLevel)}</strong>
            </span>
          </div>

          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(Number(e.target.value))}
            style={{
              width: '100%',
              cursor: 'pointer',
              accentColor: '#ff2e93',
              height: '6px',
              borderRadius: '3px'
            }}
          />

          {/* Clickable Quick Numbers 1-10 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isActive = energyLevel === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setEnergyLevel(num)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: isActive ? '2px solid #ff2e93' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: isActive ? 'linear-gradient(135deg, #ff2e93, #d91b75)' : 'rgba(255, 255, 255, 0.04)',
                    color: isActive ? '#ffffff' : '#a1a1aa',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 0 12px rgba(255, 46, 147, 0.45)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Optional Notes */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 700, color: '#e4e4e7' }}>
              <FileText size={16} color="#f472b6" />
              <span>Optional Notes or Context:</span>
            </label>
            <span style={{ fontSize: '12px', color: '#71717a' }}>
              {notes.length}/280 characters
            </span>
          </div>
          <textarea
            maxLength={280}
            rows={3}
            placeholder="What contributed to this mood or energy today? (e.g., restorative sleep, high workload, deep breathwork, uplifting music)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '14px',
              lineHeight: 1.6,
              resize: 'vertical'
            }}
          />
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
          <button
            type="submit"
            className="pink-btn"
            style={{
              padding: '12px 28px',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Record Mood Check-in</span>
          </button>
        </div>
      </form>

      {/* Mood History Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
            Check-in History ({moods.length})
          </h2>
        </div>

        {moods.length === 0 ? (
          <EmptyState
            icon={Smile}
            title="No mood check-ins yet"
            description="Log your first mood above to start uncovering trends in how your feelings and energy shift over time."
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {moods.map((entry) => {
              const moodMeta = MOOD_OPTIONS.find((m) => m.id === entry.mood) || MOOD_OPTIONS[2];
              return (
                <div
                  key={entry.id}
                  className="glass-panel"
                  style={{
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      fontSize: '30px',
                      background: 'rgba(255, 46, 147, 0.12)',
                      border: '1px solid rgba(255, 46, 147, 0.25)',
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 0 10px rgba(255, 46, 147, 0.2)'
                    }}>
                      {entry.emoji || moodMeta.emoji}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '15px' }}>
                          {moodMeta.label}
                        </span>
                        <span className="amber-pill" style={{ padding: '2px 8px', fontSize: '11px' }}>
                          ⚡ Energy {entry.energy}/10
                        </span>
                        <span style={{ fontSize: '12px', color: '#a1a1aa' }}>
                          📅 {entry.date}
                        </span>
                      </div>

                      {entry.notes && (
                        <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#d4d4d8', fontStyle: 'italic', lineHeight: 1.4 }}>
                          "{entry.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this check-in entry?')) {
                          deleteMoodCheckIn(entry.id);
                        }
                      }}
                      title="Delete check-in"
                      className="glass-btn"
                      style={{
                        padding: '6px 10px',
                        cursor: 'pointer',
                        color: '#f87171'
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
