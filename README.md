# ♟️ Modern Chess Web Application

A beautiful, responsive chess game built with React, TypeScript, and Material-UI. Play against friends or challenge the computer with Stockfish engine integration.

## ✨ Features

### 🎮 Game Modes

- **Human vs Human**: Play with friends locally
- **Human vs Computer**: Challenge the Stockfish chess engine
- **Multiple Difficulty Levels**: Easy, Medium, Hard AI opponents

### ⏱️ Time Controls

- **Flexible Timer System**: Set custom time controls or play unlimited
- **Live Timer Display**: Real-time countdown for both players
- **Visual Timer Integration**: Color-coded timer components

### 🎨 Modern UI/UX

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Material-UI Components**: Clean, modern interface with smooth animations
- **Theme Support**: Consistent design language throughout the app
- **Interactive Chess Board**: Drag-and-drop piece movement with visual feedback

### 📱 Mobile-First Experience

- **Adaptive Layout**: Three-section layout for desktop, stacked for mobile
- **Touch-Friendly**: Optimized for mobile gameplay
- **Floating Action Menu**: Easy access to game controls on mobile

### 🧠 Smart Features

- **Computer Thinking Indicator**: Visual feedback when AI is calculating moves
- **Move History**: Complete game notation with auto-scroll
- **Captured Pieces Display**: Visual representation with point values
- **Material Advantage**: Real-time calculation of captured piece values
- **Game Controls**: Undo moves, restart game, resign functionality

### 🔧 Technical Features

- **Stockfish Integration**: Powerful chess engine for computer play
- **Real-time Updates**: Live timer and game state management
- **TypeScript**: Type-safe development
- **Modular Architecture**: Clean component structure
- **Performance Optimized**: Efficient rendering and state management

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript
- **UI Framework**: Material-UI (MUI)
- **Chess Engine**: Stockfish NNUE
- **Chess Logic**: chess.js
- **Board Component**: react-chessboard
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/chess-app.git

# Navigate to project directory
cd chess-app

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

## 🎯 Usage

1. **Setup Game**: Choose game mode, difficulty, and time controls
2. **Play**: Make moves by dragging pieces or clicking
3. **Monitor**: Track time, captured pieces, and move history
4. **Control**: Use game controls for undo, restart, or resign

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── GameScreen.tsx   # Main game interface
│   ├── SetupScreen.tsx  # Game configuration
│   ├── WhiteTimer.tsx   # White player timer
│   ├── BlackTimer.tsx   # Black player timer
│   ├── GameTimer.tsx    # General timer component
│   ├── MoveHistory.tsx  # Move notation display
│   ├── CapturedPiecesDisplay.tsx
│   ├── GameControls.tsx
│   └── GameOverModal.tsx
├── context/             # React context providers
│   ├── GameContext.tsx  # Game state management
│   └── ThemeContext.tsx # UI theme management
├── hooks/               # Custom React hooks
│   ├── useGame.ts       # Game logic hook
│   └── useStockfish.ts  # Chess engine integration
├── themes/              # UI theme definitions
└── types/               # TypeScript type definitions
```

## 🎮 Game Features

### Timer System

- **Dedicated Timer Components**: Separate `WhiteTimer` and `BlackTimer` components
- **Real-time Updates**: Live countdown with automatic switching
- **Visual Feedback**: Color-coded display for active player
- **Flexible Time Controls**: Support for various time formats

### Chess Engine

- **Stockfish NNUE**: Latest neural network evaluation
- **Multiple Difficulty Levels**: Adjustable AI strength
- **Thinking Indicator**: Visual feedback during AI calculation
- **Performance Optimized**: Web Worker integration for smooth gameplay

### User Interface

- **Responsive Layout**: Adapts to screen size automatically
- **Material Design**: Modern, clean interface
- **Accessibility**: Keyboard navigation and screen reader support
- **Touch Optimized**: Mobile-friendly controls

## 🌟 Highlights

- **Responsive Design**: Seamless experience across all devices
- **Professional UI**: Clean, modern interface with smooth animations
- **Real-time Timers**: Live countdown with visual feedback
- **Smart AI**: Powered by Stockfish for challenging gameplay
- **Complete Game Management**: Full feature set for serious chess play

## 🛠️ Development

### Available Scripts

```bash
# Development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Type checking
pnpm run type-check

# Linting
pnpm run lint
```

### Development Setup

1. Install dependencies: `pnpm install`
2. Start development server: `pnpm run dev`
3. Open browser to `http://localhost:5173`

## 📱 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Requirements**: ES2015+ support, WebAssembly

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Stockfish Team**: For the amazing chess engine
- **chess.js**: For chess game logic
- **react-chessboard**: For the interactive chess board component
- **Material-UI**: For the beautiful UI components

---

_Built with ❤️ for chess enthusiasts_
