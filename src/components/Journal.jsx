import React, { useState } from 'react';
import { BookOpen, Plus, Search, Sparkles, Edit3, Trash2, Calendar, MessageSquare, X, Check } from 'lucide-react';
import { useWellness } from '../context/WellnessContext';
import { REFLECTIVE_PROMPTS, MOOD_OPTIONS } from '../data/sampleData';
import EmptyState from './EmptyState';

export default function Journal() {
  const { journalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry, todayStr } = useWellness();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState('all');

  // Form states
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [promptUsed, setPromptUsed] = useState('');
  const [moodAssociated, setMoodAssociated] = useState('');
  const [entryDate, setEntryDate] = useState(todayStr);
  const [formError, setFormError] = useState('');

  // Prompt generator helper
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const handleShufflePrompt = () => {
    const nextIdx = Math.floor(Math.random() * REFLECTIVE_PROMPTS.length);
    setActivePromptIndex(nextIdx);
  };

  const handleApplyPrompt = (promptText) => {
    setPromptUsed(promptText);
    if (!title) {
      setTitle(`Reflection: ${promptText.slice(0, 45)}...`);
    }
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setPromptUsed('');
    setMoodAssociated('');
    setEntryDate(todayStr);
    setFormError('');
    setIsCreating(false);
    setEditingId(null);
  };

  const handleStartEdit = (entry) => {
    setEditingId(entry.id);
    setIsCreating(false);
    setTitle(entry.title);
    setContent(entry.content);
    setPromptUsed(entry.promptUsed || '');
    setMoodAssociated(entry.moodAssociated || '');
    setEntryDate(entry.date || todayStr);
    setFormError('');
  };

  const handleSaveEntry = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please provide a title for your journal reflection.');
      return;
    }
    if (!content.trim()) {
      setFormError('Journal content cannot be empty.');
      return;
    }

    if (editingId) {
      updateJournalEntry(editingId, {
        title,
        content,
        promptUsed,
        moodAssociated,
        date: entryDate
      });
    } else {
      addJournalEntry({
        title,
        content,
        promptUsed,
        moodAssociated,
        date: entryDate
      });
    }

    resetForm();
  };

  // Filtered entries
  const filteredEntries = journalEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.promptUsed && entry.promptUsed.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesMood =
      selectedMoodFilter === 'all' || entry.moodAssociated === selectedMoodFilter;

    return matchesSearch && matchesMood;
  });

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.5px',
            margin: '0 0 6px 0'
          }}>
            Mindful Journal
          </h1>
          <p style={{ margin: 0, color: '#a1a1aa', fontSize: '15px' }}>
            Reflect, express, and uncover personal clarity with guided prompts and free writing.
          </p>
        </div>

        {!isCreating && !editingId && (
          <button
            onClick={() => {
              resetForm();
              setIsCreating(true);
            }}
            className="pink-btn"
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={16} />
            <span>New Reflection</span>
          </button>
        )}
      </div>

      {/* Reflective Prompt Inspiration Box */}
      <div
        className="glass-panel"
        style={{
          padding: '22px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          background: 'linear-gradient(135deg, rgba(28, 20, 36, 0.75) 0%, rgba(18, 14, 25, 0.75) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.25)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontWeight: 700, fontSize: '14px' }}>
            <Sparkles size={18} color="#fbbf24" />
            <span>Reflective Prompt of the Moment</span>
          </div>
          <button
            onClick={handleShufflePrompt}
            type="button"
            className="glass-btn"
            style={{
              padding: '6px 12px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: '#fbbf24'
            }}
          >
            <span>🎲 Shuffle Prompt</span>
          </button>
        </div>

        <p style={{
          margin: 0,
          fontSize: '17px',
          color: '#ffffff',
          fontStyle: 'italic',
          fontWeight: 500,
          lineHeight: 1.5,
          letterSpacing: '-0.2px'
        }}>
          "{REFLECTIVE_PROMPTS[activePromptIndex]}"
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            type="button"
            onClick={() => {
              handleApplyPrompt(REFLECTIVE_PROMPTS[activePromptIndex]);
              if (!isCreating && !editingId) {
                setIsCreating(true);
              }
            }}
            className="pink-btn"
            style={{
              padding: '7px 16px',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Use this prompt to write</span>
          </button>
        </div>
      </div>

      {/* Create / Edit Form Card */}
      {(isCreating || editingId) && (
        <form
          onSubmit={handleSaveEntry}
          className="glass-panel"
          style={{
            padding: '28px',
            border: '2px solid rgba(255, 46, 147, 0.5)',
            boxShadow: '0 0 30px rgba(255, 46, 147, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 700, color: '#ffffff' }}>
              {editingId ? 'Edit Journal Reflection' : 'Create New Reflection'}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="glass-btn"
              style={{
                padding: '6px',
                color: '#a1a1aa'
              }}
            >
              <X size={18} />
            </button>
          </div>

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

          {/* Prompt banner if applied */}
          {promptUsed && (
            <div style={{
              background: 'rgba(255, 46, 147, 0.1)',
              borderLeft: '3px solid #ff2e93',
              padding: '10px 14px',
              fontSize: '13px',
              color: '#ff70ba',
              borderRadius: '0 8px 8px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span><strong>Prompt:</strong> {promptUsed}</span>
              <button
                type="button"
                onClick={() => setPromptUsed('')}
                style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', fontSize: '11px' }}
              >
                Clear
              </button>
            </div>
          )}

          {/* Row 1: Title and Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#e4e4e7', marginBottom: '6px' }}>
                Entry Title *
              </label>
              <input
                type="text"
                placeholder="Give your thoughts a reflective title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  fontSize: '15px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#e4e4e7', marginBottom: '6px' }}>
                Date
              </label>
              <input
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                style={{
                  padding: '10px 14px',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Row 2: Content textarea */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 700, color: '#e4e4e7' }}>
                Reflective Thoughts *
              </label>
              <span style={{ fontSize: '12px', color: '#71717a' }}>
                {content.length} characters
              </span>
            </div>
            <textarea
              rows={7}
              placeholder="Write freely without judgment. How did today feel? What thoughts are lingering? What are you choosing to let go of?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '14px',
                lineHeight: 1.7,
                resize: 'vertical'
              }}
            />
          </div>

          {/* Row 3: Associated Mood Tag */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#e4e4e7', marginBottom: '8px' }}>
              Tag Associated Mood (Optional):
            </label>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {MOOD_OPTIONS.map((m) => {
                const isSelected = moodAssociated === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMoodAssociated(isSelected ? '' : m.id)}
                    style={{
                      background: isSelected ? 'rgba(255, 46, 147, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                      border: isSelected ? '1px solid #ff2e93' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '20px',
                      padding: '5px 14px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: isSelected ? '#ffffff' : '#d4d4d8',
                      fontWeight: isSelected ? 700 : 500,
                      boxShadow: isSelected ? '0 0 10px rgba(255, 46, 147, 0.4)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{m.emoji}</span>
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={resetForm}
              className="glass-btn"
              style={{ padding: '10px 18px', fontSize: '14px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="pink-btn"
              style={{
                padding: '10px 22px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Check size={16} />
              <span>{editingId ? 'Save Changes' : 'Publish Reflection'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Search and Filters */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          gap: '14px',
          flexWrap: 'wrap',
          alignItems: 'center',
          padding: '14px 18px'
        }}
      >
        {/* Search input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flex: 1,
          minWidth: '240px'
        }}>
          <Search size={16} color="#a1a1aa" />
          <input
            type="text"
            placeholder="Search entries by title, prompt, or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: '14px',
              padding: '6px 0',
              outline: 'none',
              boxShadow: 'none'
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer' }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Mood filter dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: 600 }}>Filter:</span>
          <select
            value={selectedMoodFilter}
            onChange={(e) => setSelectedMoodFilter(e.target.value)}
            style={{
              padding: '7px 12px',
              fontSize: '13px',
              color: '#ffffff'
            }}
          >
            <option value="all">All Moods</option>
            {MOOD_OPTIONS.map((m) => (
              <option key={m.id} value={m.id} style={{ background: '#171220' }}>
                {m.emoji} {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Entries List */}
      <div>
        {filteredEntries.length === 0 ? (
          journalEntries.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="Your mindful journal is empty"
              description="Write down your thoughts, reflect on today's emotions, or answer a guided prompt."
              actionText="Write First Reflection"
              onAction={() => {
                resetForm();
                setIsCreating(true);
              }}
            />
          ) : (
            <EmptyState
              icon={Search}
              title="No entries match your search"
              description={`No journal reflections found matching "${searchTerm}". Try adjusting your keywords or mood filter.`}
              actionText="Clear Search Filter"
              onAction={() => {
                setSearchTerm('');
                setSelectedMoodFilter('all');
              }}
            />
          )
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredEntries.map((entry) => {
              const moodMeta = MOOD_OPTIONS.find((m) => m.id === entry.moodAssociated);
              return (
                <article
                  key={entry.id}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  {/* Entry Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px' }}>
                    <div>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '19px', fontWeight: 700, color: '#ffffff' }}>
                        {entry.title}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '12px', color: '#a1a1aa' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={13} color="#fbbf24" />
                          <span>{entry.date}</span>
                        </span>

                        {moodMeta && (
                          <span style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'rgba(255, 46, 147, 0.15)',
                            color: '#ff70ba',
                            border: '1px solid rgba(255, 46, 147, 0.3)',
                            padding: '2px 10px',
                            borderRadius: '12px',
                            fontWeight: 600
                          }}>
                            <span>{moodMeta.emoji}</span>
                            <span>{moodMeta.label}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleStartEdit(entry)}
                        title="Edit reflection"
                        className="glass-btn"
                        style={{
                          padding: '6px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          fontWeight: 600
                        }}
                      >
                        <Edit3 size={13} color="#ff2e93" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete entry "${entry.title}"?`)) {
                            deleteJournalEntry(entry.id);
                          }
                        }}
                        title="Delete reflection"
                        className="glass-btn"
                        style={{
                          padding: '6px 10px',
                          color: '#f87171'
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Prompt reference if used */}
                  {entry.promptUsed && (
                    <div style={{
                      background: 'rgba(245, 158, 11, 0.08)',
                      borderLeft: '3px solid #fbbf24',
                      padding: '8px 14px',
                      borderRadius: '0 8px 8px 0',
                      fontSize: '13px',
                      color: '#fef3c7',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <MessageSquare size={14} color="#fbbf24" />
                      <span><strong>Prompt:</strong> {entry.promptUsed}</span>
                    </div>
                  )}

                  {/* Body Content */}
                  <p style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#e4e4e7',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap'
                  }}>
                    {entry.content}
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
