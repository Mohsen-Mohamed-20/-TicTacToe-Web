import { DEPTH_LIMITS, RANDOM_RATES, WIN_LINES, boardWinner, emptyCells, opponent } from './gameLogic';

const MOVE_ORDER = [4, 0, 2, 6, 8, 1, 3, 5, 7];

function boardKey(board, mark, depth, maximizing, depthLimit) {
  return `${board.map((value) => value ?? '-').join('')}|${mark}|${depth}|${maximizing ? 1 : 0}|${depthLimit}`;
}

function orderedMoves(board) {
  return MOVE_ORDER.filter((index) => board[index] === null);
}

function terminalScore(winner, mark, depth) {
  if (winner === mark) return 100 - depth;
  if (winner === 'Draw') return 0;
  return depth - 100;
}

function heuristic(board, mark) {
  let score = 0;
  const enemy = opponent(mark);
  const weights = { 1: 2, 2: 12, 3: 100 };

  for (const line of WIN_LINES) {
    const values = line.map((index) => board[index]);
    const mine = values.filter((value) => value === mark).length;
    const theirs = values.filter((value) => value === enemy).length;

    if (mine && !theirs) score += weights[mine];
    if (theirs && !mine) score -= weights[theirs];
  }

  if (board[4] === mark) score += 5;
  if (board[4] === enemy) score -= 5;

  return score;
}

function tiebreak(moves) {
  for (const move of MOVE_ORDER) {
    if (moves.includes(move)) return move;
  }

  return moves[0] ?? null;
}

export function createEmptyAiResult() {
  return {
    move: null,
    scores: {},
    nodes: 0,
    pruned: 0,
    thinkingMs: 0,
    bestMoveIndex: null,
    evaluatedOrder: [],
  };
}

export function evaluateAllMoves(board, mark, depthLimit = 9) {
  let nodes = 0;
  let pruned = 0;
  const scores = {};
  const evaluatedOrder = [];
  const cache = new Map();

  function minimax(nextBoard, depth, maximizing, alpha, beta) {
    const key = boardKey(nextBoard, mark, depth, maximizing, depthLimit);
    if (cache.has(key)) return cache.get(key);

    nodes += 1;
    const { winner } = boardWinner(nextBoard);
    if (winner) {
      const score = terminalScore(winner, mark, depth);
      cache.set(key, score);
      return score;
    }
    if (depth >= depthLimit) {
      const score = heuristic(nextBoard, mark);
      cache.set(key, score);
      return score;
    }

    const player = maximizing ? mark : opponent(mark);

    if (maximizing) {
      let best = -Infinity;
      let cut = false;
      for (const move of orderedMoves(nextBoard)) {
        nextBoard[move] = player;
        best = Math.max(best, minimax(nextBoard, depth + 1, false, alpha, beta));
        nextBoard[move] = null;
        alpha = Math.max(alpha, best);
        if (beta <= alpha) {
          pruned += 1;
          cut = true;
          break;
        }
      }
      if (!cut) cache.set(key, best);
      return best;
    }

    let best = Infinity;
    let cut = false;
    for (const move of orderedMoves(nextBoard)) {
      nextBoard[move] = player;
      best = Math.min(best, minimax(nextBoard, depth + 1, true, alpha, beta));
      nextBoard[move] = null;
      beta = Math.min(beta, best);
      if (beta <= alpha) {
        pruned += 1;
        cut = true;
        break;
      }
    }
    if (!cut) cache.set(key, best);
    return best;
  }

  for (const move of orderedMoves(board)) {
    board[move] = mark;
    scores[move] = minimax(board, 1, false, -Infinity, Infinity);
    board[move] = null;
    evaluatedOrder.push(move);
  }

  return { scores, evaluatedOrder, nodes, pruned };
}

export function chooseAiMove(board, mark, difficulty = 'Expert', style = 'minimax') {
  const started = performance.now();
  const available = emptyCells(board);
  if (!available.length) return createEmptyAiResult();

  if (style === 'random') {
    const move = available[Math.floor(Math.random() * available.length)];
    return {
      move,
      scores: Object.fromEntries(available.map((index) => [index, 0])),
      nodes: 0,
      pruned: 0,
      thinkingMs: Math.round(performance.now() - started),
      bestMoveIndex: move,
      evaluatedOrder: available,
    };
  }

  const key = difficulty.toLowerCase();
  const depthLimit = DEPTH_LIMITS[key] ?? 9;
  const randomRate = RANDOM_RATES[key] ?? 0;
  const { scores, evaluatedOrder, nodes, pruned } = evaluateAllMoves([...board], mark, depthLimit);
  const scoreValues = Object.values(scores);

  let move;
  if (randomRate && Math.random() < randomRate) {
    move = available[Math.floor(Math.random() * available.length)];
  } else {
    const bestScore = Math.max(...scoreValues);
    move = tiebreak(Object.entries(scores).filter(([, score]) => score === bestScore).map(([index]) => Number(index)));
  }

  return {
    move,
    scores,
    nodes,
    pruned,
    thinkingMs: Math.round(performance.now() - started),
    bestMoveIndex: move,
    evaluatedOrder,
  };
}

export function previewAiMoves(board, mark, difficulty = 'Expert', style = 'minimax', maxDepth = 9) {
  if (style === 'random') {
    const available = emptyCells(board);
    return {
      scores: Object.fromEntries(available.map((index) => [index, 0])),
      evaluatedOrder: available,
      nodes: 0,
      pruned: 0,
    };
  }

  const depthLimit = Math.min(DEPTH_LIMITS[difficulty.toLowerCase()] ?? 9, maxDepth);
  return evaluateAllMoves([...board], mark, depthLimit);
}
