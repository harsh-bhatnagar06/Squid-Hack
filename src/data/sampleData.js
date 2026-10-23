// Sample data and wellness constants for Wellness Pulse

export const MOOD_OPTIONS = [
  { id: 'great', label: 'Great', emoji: '😄', score: 5, color: '#ff2e93', description: 'Feeling joyful, radiant, and empowered' },
  { id: 'good', label: 'Good', emoji: '🙂', score: 4, color: '#ff69b4', description: 'Peaceful, content, and grounded' },
  { id: 'okay', label: 'Neutral', emoji: '😐', score: 3, color: '#fbbf24', description: 'Steady, neutral, and balanced' },
  { id: 'low', label: 'Low', emoji: '😔', score: 2, color: '#f97316', description: 'Sluggish, tired, or needing rest' },
  { id: 'stressed', label: 'Stressed', emoji: '😣', score: 1, color: '#f43f5e', description: 'Overwhelmed, tense, or scattered' }
];

export const REFLECTIVE_PROMPTS = [
  "What made you feel genuinely grateful or comforted today?",
  "What drained your energy today, and what is one boundary you can set?",
  "What is a small win or accomplishment you can celebrate today?",
  "How did your body feel throughout the day? Did you notice any physical tension?",
  "What is something kind you can say to yourself right now?",
  "If today had a theme song or weather report, what would it be?",
  "What is one thing within your control that you can let go of worrying about?",
  "Who is someone who brought positivity into your life recently, and why?",
  "What does your mind or soul need most this evening?",
  "Describe a moment today where you felt most present or calm.",
  "What is something you learned about yourself this past week?",
  "What is one promise you want to make to yourself for tomorrow?"
];

export const SELF_CARE_LIBRARY = [
  // Low energy recommendations (Energy 1-4)
  {
    id: 'sc-1',
    title: '4-7-8 Relaxing Breathwork',
    description: 'Inhale through nose for 4s, hold for 7s, exhale slowly through mouth for 8s. Repeat 4 cycles.',
    minEnergy: 1,
    maxEnergy: 4,
    suitableMoods: ['stressed', 'low', 'okay', 'good', 'great'],
    category: 'Mind',
    duration: '5 min'
  },
  {
    id: 'sc-2',
    title: 'Gentle Hydration & Warm Tea',
    description: 'Sip a large glass of filtered water or caffeine-free herbal chamomile/peppermint tea without screens.',
    minEnergy: 1,
    maxEnergy: 5,
    suitableMoods: ['stressed', 'low', 'okay', 'good'],
    category: 'Body',
    duration: '10 min'
  },
  {
    id: 'sc-3',
    title: '5-Minute Mindful Body Scan',
    description: 'Lie down or sit supported. Close your eyes and gently bring attention from your toes up to your head, releasing tension.',
    minEnergy: 1,
    maxEnergy: 4,
    suitableMoods: ['stressed', 'low', 'okay'],
    category: 'Mind',
    duration: '5-10 min'
  },
  {
    id: 'sc-4',
    title: 'Comfort Audio & Rest',
    description: 'Listen to rain sounds, ambient lo-fi, or your favorite comfort album with your eyes resting.',
    minEnergy: 1,
    maxEnergy: 4,
    suitableMoods: ['low', 'stressed'],
    category: 'Soul',
    duration: '15 min'
  },

  // Moderate energy recommendations (Energy 4-7)
  {
    id: 'sc-5',
    title: 'Fresh Air Walk',
    description: 'Step outdoors for a mindful stroll around the block. Notice 3 things you can see, 2 you hear, and 1 you smell.',
    minEnergy: 4,
    maxEnergy: 8,
    suitableMoods: ['okay', 'good', 'low', 'stressed'],
    category: 'Body',
    duration: '15 min'
  },
  {
    id: 'sc-6',
    title: 'Desk Stretching & Shoulder Rolls',
    description: 'Release neck and shoulder stiffness with side neck stretches, seated spinal twists, and wrist circles.',
    minEnergy: 3,
    maxEnergy: 8,
    suitableMoods: ['okay', 'good', 'stressed'],
    category: 'Body',
    duration: '8 min'
  },
  {
    id: 'sc-7',
    title: 'Brain Dump Journaling',
    description: 'Write uncensored thoughts on paper for 5 minutes straight to clear mental clutter, then discard or save.',
    minEnergy: 4,
    maxEnergy: 8,
    suitableMoods: ['stressed', 'okay', 'low'],
    category: 'Mind',
    duration: '10 min'
  },
  {
    id: 'sc-8',
    title: 'Check In With a Friend',
    description: 'Send a quick supportive text or voice message to someone who makes you feel safe and appreciated.',
    minEnergy: 4,
    maxEnergy: 9,
    suitableMoods: ['good', 'great', 'okay', 'low'],
    category: 'Connection',
    duration: '10 min'
  },

  // High energy recommendations (Energy 7-10)
  {
    id: 'sc-9',
    title: 'Energizing Cardio or Dance Break',
    description: 'Put on 2 upbeat songs and dance freely, or go for an active jog to channel your high energy.',
    minEnergy: 7,
    maxEnergy: 10,
    suitableMoods: ['great', 'good'],
    category: 'Body',
    duration: '15-20 min'
  },
  {
    id: 'sc-10',
    title: 'Creative Project or Hobby Sprint',
    description: 'Spend dedicated time drawing, playing an instrument, cooking a fresh recipe, or crafting.',
    minEnergy: 6,
    maxEnergy: 10,
    suitableMoods: ['great', 'good'],
    category: 'Soul',
    duration: '25 min'
  },
  {
    id: 'sc-11',
    title: 'Kindness Outreach / Pay It Forward',
    description: 'Compliment a colleague, write a genuine review for a local favorite spot, or surprise a loved one.',
    minEnergy: 6,
    maxEnergy: 10,
    suitableMoods: ['great', 'good'],
    category: 'Connection',
    duration: '10 min'
  },
  {
    id: 'sc-12',
    title: 'Space Declutter & Reset',
    description: 'Pick one corner, desk surface, or shelf to organize and refresh for a clear, calm environment.',
    minEnergy: 5,
    maxEnergy: 9,
    suitableMoods: ['okay', 'good', 'great'],
    category: 'Mind',
    duration: '15 min'
  }
];

// Generates past dates dynamically so the sample data is always fresh relative to today
const getPastDateStr = (daysAgo) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
};

export const INITIAL_MOODS = [
  {
    id: 'sample-mood-1',
    date: getPastDateStr(6),
    mood: 'good',
    emoji: '🙂',
    score: 4,
    energy: 6,
    notes: 'Started the week feeling grounded. Had a productive morning walk.',
    timestamp: new Date(Date.now() - 6 * 86400000).toISOString()
  },
  {
    id: 'sample-mood-2',
    date: getPastDateStr(5),
    mood: 'stressed',
    emoji: '😣',
    score: 1,
    energy: 4,
    notes: 'Busy workday with back-to-back meetings. Took a break in the evening.',
    timestamp: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: 'sample-mood-3',
    date: getPastDateStr(4),
    mood: 'okay',
    emoji: '😐',
    score: 3,
    energy: 5,
    notes: 'Balanced day. Kept to my schedule and stayed hydrated.',
    timestamp: new Date(Date.now() - 4 * 86400000).toISOString()
  },
  {
    id: 'sample-mood-4',
    date: getPastDateStr(3),
    mood: 'low',
    emoji: '😔',
    score: 2,
    energy: 3,
    notes: 'Feeling a bit sluggish and low energy. Slept early to recharge.',
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'sample-mood-5',
    date: getPastDateStr(2),
    mood: 'good',
    emoji: '🙂',
    score: 4,
    energy: 7,
    notes: 'Felt much more rested today! Finished reading a good chapter.',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'sample-mood-6',
    date: getPastDateStr(1),
    mood: 'great',
    emoji: '😄',
    score: 5,
    energy: 8,
    notes: 'Had a wonderful chat with a close friend and enjoyed afternoon sunshine.',
    timestamp: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: 'sample-mood-7',
    date: getPastDateStr(0),
    mood: 'good',
    emoji: '🙂',
    score: 4,
    energy: 7,
    notes: 'Feeling motivated to set healthy intentions for the week ahead.',
    timestamp: new Date().toISOString()
  }
];

export const INITIAL_JOURNAL = [
  {
    id: 'sample-journal-1',
    title: 'Finding calm in the morning routine',
    content: 'Woke up 20 minutes before my alarm today. Instead of immediately checking notifications or emails, I sat by the window with warm lemon water. It is surprising how much calmer the entire rest of the morning feels when you do not rush the first few minutes.',
    promptUsed: 'What made you feel genuinely grateful or comforted today?',
    moodAssociated: 'good',
    date: getPastDateStr(2),
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: 'sample-journal-2',
    title: 'Recognizing when to slow down',
    content: 'Realized this afternoon that trying to force focus when my energy was at a 3 only made me frustrated. Stepped away, did 5 minutes of mindful breathwork, and let myself take a real break. Boundaries are something I am still practicing every single day.',
    promptUsed: 'What drained your energy today, and what is one boundary you can set?',
    moodAssociated: 'low',
    date: getPastDateStr(3),
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString()
  },
  {
    id: 'sample-journal-3',
    title: 'Celebrating simple creative moments',
    content: 'Spent an hour after dinner sketching with some old watercolours. No goal of perfection, just enjoying the colours blending together. Creative expression without judgment feels like a breath of fresh air.',
    promptUsed: 'What is a small win or accomplishment you can celebrate today?',
    moodAssociated: 'great',
    date: getPastDateStr(1),
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString()
  }
];
