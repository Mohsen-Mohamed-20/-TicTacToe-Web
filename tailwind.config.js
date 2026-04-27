/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#070912',
        panel: '#101527',
        panel2: '#151c32',
        grid: '#444f7c',
        muted: '#8490b2',
        cyan: '#00e1ff',
        pink: '#ff397b',
        lime: '#73ffa5',
        amber: '#ffc656',
        violet: '#965dff',
      },
      fontFamily: {
        display: ['Orbitron', 'Rajdhani', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
        body: ['Rajdhani', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        cyan: '0 0 24px rgba(0, 225, 255, 0.35)',
        pink: '0 0 24px rgba(255, 57, 123, 0.35)',
        amber: '0 0 26px rgba(255, 198, 86, 0.35)',
      },
    },
  },
  plugins: [],
};
