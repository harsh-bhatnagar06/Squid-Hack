import React, { useState } from 'react';
import { Smile, Zap, Calendar, FileText, CheckCircle2, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { MOOD_OPTIONS } from '../data/sampleData';
import EmptyState from './EmptyState';

export default function MoodCheckIn({ onNavigateToJournal, onNavigateToSelfCare }) {
  const { moods, addMoodCheckIn, deleteMoodCheckIn, todayStr } = useWellness();

  const [selectedMood, setSelectedMood] = useState('great');
  const [energyLevel, setEnergyLevel] = useState(8);
  const [notes, setNotes] = useState('');
  const [checkInDate, setCheckInDate] = useState(todayStr);
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  // Take the 8 core mood options from sampleData (exclude aliases)
  const displayMoodOptions = MOOD_OPTIONS.slice(0, 8);

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
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '26px' }}>
      {/* Title & Introduction */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
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
            <span>Daily Mood Check-in</span>
            <span style={{ fontSize: '20px' }}>🌸</span>
          </h1>
          <p style={{ margin: 0, color: '#a395a8', fontSize: '14px' }}>
            Tune in to your emotional rhythm. Log your feelings, vitality index, and mindful context.
          </p>
        </div>

        {onNavigateToSelfCare && (
          <button
            onClick={onNavigateToSelfCare}
            className="glass-btn"
            style={{ padding: '8px 16px', fontSize: '12.5px' }}
          >
            <Sparkles size={14} color="#ff70ba" />
            <span>View Today's Self-Care</span>
          </button>
        )}
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 46, 147, 0.18) 0%, rgba(192, 132, 252, 0.14) 100%)',
            border: '1px solid rgba(255, 112, 186, 0.45)',
            borderRadius: '16px',
            padding: '16px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#ffffff',
            fontSize: '13.5px',
            boxShadow: '0 0 24px rgba(255, 46, 147, 0.3)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle2 size={20} color="#ff70ba" />
            <span>
              <strong style={{ color: '#ffc1db' }}>Check-in recorded!</strong> Your wellness pulse and recommendations are refreshed.
            </span>
          </div>
          {onNavigateToSelfCare && (
            <button
              onClick={onNavigateToSelfCare}
              className="pink-btn"
              style={{ padding: '6px 14px', fontSize: '12px', gap: '5px' }}
            >
              <span>Explore Self-Care</span>
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
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '26px',
          border: '1px solid rgba(255, 112, 186, 0.22)'
        }}
      >
        {formError && (
          <div
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px'
            }}
          >
            {formError}
          </div>
        )}

        {/* Date Selector */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 700, color: '#e4d8e5', marginBottom: '8px' }}>
            <Calendar size={15} color="#fda4af" />
            <span>Check-in Date:</span>
          </label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            style={{ padding: '10px 14px', maxWidth: '220px', fontSize: '13.5px' }}
          />
        </div>

        {/* 1. Mood Selection */}
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 700, color: '#e4d8e5', marginBottom: '14px' }}>
            <Smile size={16} color="#ff2e93" />
            <span>Select Your Current Mood:</span>
          </label>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
              gap: '10px'
            }}
          >
            {displayMoodOptions.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setSelectedMood(mood.id)}
                  className={`mood-tile ${isSelected ? 'active' : ''}`}
                  style={{
                    padding: '16px 8px',
                    borderRadius: '16px',
                    gap: '6px'
                  }}
                >
                  <span style={{ fontSize: '32px' }}>{mood.emoji}</span>
                  <span style={{ fontSize: '13px', fontWeight: isSelected ? 700 : 600, color: isSelected ? '#ffffff' : '#d4d4d8' }}>
                    {mood.label}
                  </span>
                  <span style={{ fontSize: '10.5px', color: '#a395a8', textAlign: 'center', lineHeight: 1.25, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {mood.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Energy Rating */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 700, color: '#e4d8e5' }}>
              <Zap size={16} color="#fbbf24" fill="#fbbf24" />
              <span>Energy & Vitality Rating (1 - 10):</span>
            </label>
            <span className="pill-badge pill-amber">
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
              borderRadius: '3px',
              marginBottom: '12px'
            }}
          />

          {/* Clickable Quick Numbers 1-10 */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
              const isActive = energyLevel === num;
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setEnergyLevel(num)}
                  className={`energy-number-btn ${isActive ? 'active' : ''}`}
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
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 700, color: '#e4d8e5' }}>
              <FileText size={15} color="#fda4af" />
              <span>Mindful Context & Reflection (optional):</span>
            </label>
            <span style={{ fontSize: '11.5px', color: '#716477' }}>
              {notes.length}/280
            </span>
          </div>
          <textarea
            maxLength={280}
            rows={3}
            placeholder="What contributed to this mood or energy today? (e.g., refreshing morning walk, good sleep, high workload, uplifting music)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', fontSize: '13.5px', lineHeight: 1.55, resize: 'vertical' }}
          />
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
          <button
            type="submit"
            className="pink-btn"
            style={{ padding: '12px 28px', fontSize: '14px', gap: '8px' }}
          >
            <span>Record Mood Check-in</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </form>

      {/* Mood History Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Check-in History</span>
            <span style={{ fontSize: '12px', color: '#a395a8', fontWeight: 500 }}>({moods.length} entries)</span>
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
              const moodMeta = MOOD_OPTIONS.find((m) => m.id === entry.mood) || MOOD_OPTIONS[0];
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
                    gap: '14px',
                    border: '1px solid rgba(255, 112, 186, 0.14)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        fontSize: '26px',
                        background: 'rgba(255, 46, 147, 0.12)',
                        border: '1px solid rgba(255, 112, 186, 0.25)',
                        width: '46px',
                        height: '46px',
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: '0 0 14px rgba(255, 46, 147, 0.2)'
                      }}
                    >
                      {entry.emoji || moodMeta.emoji}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '14.5px' }}>
                          {moodMeta.label}
                        </span>
                        <span className="pill-badge pill-amber" style={{ padding: '2px 8px', fontSize: '11px' }}>
                          ⚡ Energy {entry.energy}/10
                        </span>
                        <span style={{ fontSize: '11.5px', color: '#a395a8' }}>
                          📅 {entry.date}
                        </span>
                      </div>

                      {entry.notes && (
                        <p style={{ margin: '5px 0 0 0', fontSize: '12.5px', color: '#e4d8e5', fontStyle: 'italic', lineHeight: 1.4 }}>
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
                      style={{ padding: '6px 10px', color: '#f87171' }}
                    >
                      <Trash2 size={14} />
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
