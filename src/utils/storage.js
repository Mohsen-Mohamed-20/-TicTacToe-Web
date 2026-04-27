const STORAGE_KEY = 'neon-tic-tac-toe-ai:v1';

const defaults = {
  selectedMode: 'human_ai',
  difficulty: 'Expert',
  playerNames: { X: 'Human', O: 'AI' },
  soundOn: true,
  language: 'en',
  scoreboard: { X: 0, O: 0, Draw: 0 },
};

export function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      ...defaults,
      ...saved,
      playerNames: { ...defaults.playerNames, ...(saved?.playerNames ?? {}) },
      scoreboard: { ...defaults.scoreboard, ...(saved?.scoreboard ?? {}) },
    };
  } catch {
    return defaults;
  }
}

export function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...loadSettings(), ...settings }));
}

export function clearScores() {
  const next = { X: 0, O: 0, Draw: 0 };
  saveSettings({ scoreboard: next });
  return next;
}
