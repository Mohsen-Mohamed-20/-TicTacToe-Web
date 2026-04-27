import { useCallback, useMemo, useRef } from 'react';

const soundMap = {
  click: { frequency: 540, duration: 0.055, type: 'triangle', gain: 0.04 },
  win: { frequency: 880, duration: 0.18, type: 'sine', gain: 0.055 },
  draw: { frequency: 260, duration: 0.14, type: 'sawtooth', gain: 0.025 },
  thinking: { frequency: 420, duration: 0.08, type: 'square', gain: 0.018 },
};

export function useSound(enabled) {
  const audioRef = useRef(null);

  const play = useCallback(
    (name) => {
      if (!enabled) return;
      const spec = soundMap[name];
      if (!spec) return;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const context = audioRef.current ?? new AudioContext();
      audioRef.current = context;

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = spec.type;
      oscillator.frequency.value = spec.frequency;
      gain.gain.value = spec.gain;
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + spec.duration);
      oscillator.stop(context.currentTime + spec.duration);
    },
    [enabled],
  );

  return useMemo(() => ({ play }), [play]);
}
