# Tic Tac Toe-Pro

A production-ready React + Vite + Tailwind CSS PWA rewrite of the original Python Pygame Tic Tac Toe AI game. It keeps the dark neon futuristic style, cyan X, pink O, animated board highlights, Arabic/English support, and the minimax AI behavior from the reference.

## Features

- Human vs AI
- Human vs Human
- AI vs AI Demo
- Minimax AI vs Random AI
- Easy, Medium, Hard, and Expert difficulty levels
- Minimax AI with alpha-beta pruning
- AI thinking animation
- Evaluated move highlights, best move highlight, and evaluated order
- AI stats: nodes explored, pruned branches, thinking time, best move index
- Scoreboard, reset round, reset scores, and back to menu
- Player name input with Arabic and English support
- Smooth X/O placement animation and winning line animation
- End game overlay
- Sound effects with mute toggle
- LocalStorage persistence for mode, difficulty, names, sound, language, and scores
- Offline-capable PWA with manifest, service worker, and app icons
- Responsive mobile-first UI for desktop, tablet, and phones

## Screenshots

Add screenshots here after running the app locally or deploying it:

- Menu screen
- Game board
- AI stats panel
- Mobile installed PWA

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Vercel Deployment

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

No backend or environment variables are required.

## PWA Install Guide

1. Run a production build and deploy it, or use `npm run preview`.
2. Open the app in Chrome, Edge, or a mobile browser that supports PWAs.
3. Use the browser install prompt:
   - Desktop: click the install icon in the address bar.
   - Android: browser menu -> Add to Home screen.
   - iOS Safari: Share -> Add to Home Screen.
4. After the first load, the app shell is cached and works offline.

## Project Structure

```text
src/
  components/
    Board.jsx
    Cell.jsx
    Scoreboard.jsx
    ControlPanel.jsx
    GameModeSelector.jsx
    AiStats.jsx
    PlayerNameModal.jsx
    EndGameOverlay.jsx
  utils/
    gameLogic.js
    minimax.js
    storage.js
  hooks/
    useGame.js
    useSound.js
  App.jsx
  main.jsx
  index.css
```

## AI Notes

Expert uses full-depth minimax with alpha-beta pruning. Easy, Medium, and Hard use shallower depth limits and intentional random move rates to feel more human and beatable, matching the Python reference behavior.
