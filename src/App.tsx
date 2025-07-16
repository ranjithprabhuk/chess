import { useState } from 'react';
import { GameProvider } from './context/GameContext';
import { ThemeProvider } from './context/ThemeContext';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <ThemeProvider>
      <GameProvider>
        {gameStarted ? (
          <GameScreen />
        ) : (
          <SetupScreen onStartGame={() => setGameStarted(true)} />
        )}
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;


