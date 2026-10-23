import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MOODS, INITIAL_JOURNAL, MOOD_OPTIONS } from '../data/sampleData';

const WellnessContext = createContext();

const STORAGE_KEYS = {
  MOODS: 'wellness_pulse_moods_v1',
  JOURNAL: 'wellness_pulse_journal_v1',
  COMPLETED_SELF_CARE: 'wellness_pulse_selfcare_done_v1',
  DISCLAIMER_ACKNOWLEDGED: 'wellness_pulse_disclaimer_ack_v1'
};

const getTodayDateStr = () => {
  return new Date().toISOString().split('T')[0];
};

export function WellnessProvider({ children }) {
  // 1. Initialize Moods
  const [moods, setMoods] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MOODS);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      // First visit: use sample data without overwriting if user already had data
      localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(INITIAL_MOODS));
      return INITIAL_MOODS;
    } catch (e) {
      console.error('Failed to load moods from localStorage:', e);
      return INITIAL_MOODS;
    }
  });

  // 2. Initialize Journal Entries
  const [journalEntries, setJournalEntries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      if (saved !== null) {
        return JSON.parse(saved);
      }
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(INITIAL_JOURNAL));
      return INITIAL_JOURNAL;
    } catch (e) {
      console.error('Failed to load journal entries from localStorage:', e);
      return INITIAL_JOURNAL;
    }
  });

  // 3. Completed self-care activities (keyed by today's date)
  const [completedSelfCare, setCompletedSelfCare] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_SELF_CARE);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only keep if matching today's date
        if (parsed.date === getTodayDateStr()) {
          return parsed.completedIds || [];
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(moods));
    } catch (e) {
      console.error('Error saving moods:', e);
    }
  }, [moods]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(journalEntries));
    } catch (e) {
      console.error('Error saving journal entries:', e);
    }
  }, [journalEntries]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.COMPLETED_SELF_CARE,
        JSON.stringify({ date: getTodayDateStr(), completedIds: completedSelfCare })
      );
    } catch (e) {
      console.error('Error saving completed self-care:', e);
    }
  }, [completedSelfCare]);

  // Mood Actions
  const addMoodCheckIn = (newCheckIn) => {
    const moodMeta = MOOD_OPTIONS.find((m) => m.id === newCheckIn.mood) || MOOD_OPTIONS[2];
    const timestamp = new Date().toISOString();
    const entryDate = newCheckIn.date || getTodayDateStr();

    const entry = {
      id: 'mood-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      date: entryDate,
      mood: newCheckIn.mood,
      emoji: moodMeta.emoji,
      score: moodMeta.score,
      energy: Number(newCheckIn.energy),
      notes: (newCheckIn.notes || '').trim(),
      timestamp
    };

    setMoods((prev) => [entry, ...prev]);
    return entry;
  };

  const deleteMoodCheckIn = (id) => {
    setMoods((prev) => prev.filter((m) => m.id !== id));
  };

  // Journal Actions
  const addJournalEntry = ({ title, content, promptUsed, moodAssociated, date }) => {
    const now = new Date().toISOString();
    const newEntry = {
      id: 'journal-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      title: title.trim(),
      content: content.trim(),
      promptUsed: promptUsed || '',
      moodAssociated: moodAssociated || '',
      date: date || getTodayDateStr(),
      createdAt: now,
      updatedAt: now
    };

    setJournalEntries((prev) => [newEntry, ...prev]);
    return newEntry;
  };

  const updateJournalEntry = (id, fields) => {
    setJournalEntries((prev) =>
      prev.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              ...fields,
              title: fields.title !== undefined ? fields.title.trim() : entry.title,
              content: fields.content !== undefined ? fields.content.trim() : entry.content,
              updatedAt: new Date().toISOString()
            }
          : entry
      )
    );
  };

  const deleteJournalEntry = (id) => {
    setJournalEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  // Self-care toggle
  const toggleSelfCare = (activityId) => {
    setCompletedSelfCare((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
    );
  };

  // Reset/Clear Data
  const resetToSampleData = () => {
    setMoods(INITIAL_MOODS);
    setJournalEntries(INITIAL_JOURNAL);
    setCompletedSelfCare([]);
    localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(INITIAL_MOODS));
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(INITIAL_JOURNAL));
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_SELF_CARE);
  };

  const clearAllData = () => {
    setMoods([]);
    setJournalEntries([]);
    setCompletedSelfCare([]);
    localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify([]));
    localStorage.removeItem(STORAGE_KEYS.COMPLETED_SELF_CARE);
  };

  // Derived helpers
  const todayStr = getTodayDateStr();
  const todayMood = moods.find((m) => m.date === todayStr) || null;
  const latestMood = moods.length > 0 ? moods[0] : null;

  return (
    <WellnessContext.Provider
      value={{
        moods,
        journalEntries,
        completedSelfCare,
        todayMood,
        latestMood,
        todayStr,
        addMoodCheckIn,
        deleteMoodCheckIn,
        addJournalEntry,
        updateJournalEntry,
        deleteJournalEntry,
        toggleSelfCare,
        resetToSampleData,
        clearAllData
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
}

export function useWellness() {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
}
