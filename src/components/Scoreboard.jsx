export default function Scoreboard({ scores, playerNames }) {
  const total = Math.max(1, scores.X + scores.O + scores.Draw);
  const rows = [
    { label: `${playerNames.X} [X]`, value: scores.X, color: 'text-cyan', bar: 'bg-cyan' },
    { label: `${playerNames.O} [O]`, value: scores.O, color: 'text-pink', bar: 'bg-pink' },
    { label: 'Draw', value: scores.Draw, color: 'text-muted', bar: 'bg-muted' },
  ];

  return (
    <section className="rounded-xl border border-white/10 bg-panel/90 p-4">
      <h2 className="font-display text-xl font-bold text-white">Scoreboard</h2>
      <div className="mt-4 space-y-4">
        {rows.map((row) => {
          const rate = Math.round((row.value / total) * 100);
          return (
            <div key={row.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className={`min-w-0 truncate font-display text-base font-bold ${row.color}`}>{row.label}</span>
                <span className="font-display text-2xl font-black text-white">{row.value}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-white/10">
                <div className={`h-full rounded-full ${row.bar}`} style={{ width: `${rate}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted">{row.label === 'Draw' ? `${rate}% draw rate` : `${rate}% win rate`}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
