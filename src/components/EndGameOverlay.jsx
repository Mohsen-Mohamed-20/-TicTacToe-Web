import { motion } from 'framer-motion';

export default function EndGameOverlay({ winner, playerNames, onPlayAgain, onMenu }) {
  if (!winner) return null;

  const isDraw = winner === 'Draw';
  const headline = isDraw ? 'DRAW' : `${playerNames[winner]} WINS`;

  return (
    <div className="absolute inset-0 z-20 grid place-items-center rounded-2xl bg-void/80 p-5 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`w-full max-w-sm rounded-2xl border bg-panel p-5 text-center ${isDraw ? 'border-cyan/60 shadow-cyan' : 'border-amber/60 shadow-amber'}`}
      >
        <h2 className={`truncate font-display text-4xl font-black ${isDraw ? 'text-cyan' : 'text-amber'}`}>{headline}</h2>
        <p className="mt-2 text-sm text-muted">{isDraw ? 'No winner this round' : 'Perfect line secured'}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button type="button" onClick={onPlayAgain} className="neon-button border-cyan/70 text-cyan">
            Play again
          </button>
          <button type="button" onClick={onMenu} className="neon-button border-pink/70 text-pink">
            Menu
          </button>
        </div>
      </motion.div>
    </div>
  );
}
