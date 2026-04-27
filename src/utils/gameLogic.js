export const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const MODES = {
  human_ai: 'Human vs AI',
  human_human: 'Human vs Human',
  ai_ai: 'AI vs AI Demo',
  minimax_random: 'Minimax AI vs Random AI',
};

export const MODE_DESCRIPTIONS = {
  human_ai: 'Classic challenge',
  human_human: 'Two players',
  ai_ai: 'Watch minimax think',
  minimax_random: 'Strategy lab',
};

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Expert'];

export const DEPTH_LIMITS = {
  easy: 2,
  medium: 4,
  hard: 6,
  expert: 9,
};

export const RANDOM_RATES = {
  easy: 0.7,
  medium: 0.45,
  hard: 0.12,
  expert: 0,
};

export const EMPTY_BOARD = Array(9).fill(null);

export function opponent(mark) {
  return mark === 'X' ? 'O' : 'X';
}

export function boardWinner(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }

  if (board.every(Boolean)) {
    return { winner: 'Draw', line: null };
  }

  return { winner: null, line: null };
}

export function emptyCells(board) {
  return board.map((value, index) => (value ? null : index)).filter((value) => value !== null);
}

export function defaultPlayerNames(mode, difficulty) {
  if (mode === 'human_ai') {
    return { X: 'Human', O: 'AI' };
  }

  if (mode === 'minimax_random') {
    return { X: 'Minimax AI', O: 'Random AI' };
  }

  if (mode === 'ai_ai') {
    return { X: 'AI X', O: 'AI O' };
  }

  return { X: 'Player 1', O: 'Player 2' };
}

export function isArabicText(value) {
  return /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]/.test(String(value));
}

export function formatMoveIndex(value) {
  return value === null || value === undefined ? '-' : String(value);
}
