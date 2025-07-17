import { useEffect, useContext } from 'react';
import { Typography, Box, Paper, Avatar, Chip } from '@mui/material';
import { Timer as TimerIcon } from '@mui/icons-material';
import { GameContext } from '../context/GameContext';

interface GameTimerProps {
  turn: 'w' | 'b';
  isGameOver: boolean;
}

const formatTime = (time: number) => {
  if (time === Infinity) return 'Unlimited';
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const GameTimer = ({ turn, isGameOver }: GameTimerProps) => {
  const gameContext = useContext(GameContext);
  const { whiteTime, blackTime, setWhiteTime, setBlackTime } = gameContext!;

  useEffect(() => {
    if (isGameOver || whiteTime === Infinity) return;

    const timer = setInterval(() => {
      if (turn === 'w') {
        setWhiteTime((t) => (t > 0 ? t - 1 : 0));
      } else {
        setBlackTime((t) => (t > 0 ? t - 1 : 0));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [turn, isGameOver, setWhiteTime, setBlackTime, whiteTime]);

  const isWhiteActive = turn === 'w' && !isGameOver;
  const isBlackActive = turn === 'b' && !isGameOver;

  return (
    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
      {/* White Player Timer */}
      <Chip
        icon={<TimerIcon />}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              White
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {formatTime(whiteTime)}
            </Typography>
          </Box>
        }
        color={isWhiteActive ? 'primary' : 'default'}
        variant={isWhiteActive ? 'filled' : 'outlined'}
        sx={{
          px: 2,
          py: 1,
          height: 'auto',
          borderRadius: 2,
          '& .MuiChip-label': { px: 1 },
          boxShadow: isWhiteActive ? '0 2px 8px rgba(25, 118, 210, 0.3)' : 'none',
          transition: 'all 0.3s ease',
        }}
      />

      {/* Current Turn Indicator */}
      <Avatar
        sx={{
          bgcolor: isGameOver ? 'grey.400' : 'success.main',
          width: 32,
          height: 32,
          fontSize: '1rem',
        }}
      >
        {isGameOver ? '⏹️' : turn === 'w' ? '♔' : '♚'}
      </Avatar>

      {/* Black Player Timer */}
      <Chip
        icon={<TimerIcon />}
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" fontWeight="bold">
              Black
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {formatTime(blackTime)}
            </Typography>
          </Box>
        }
        color={isBlackActive ? 'primary' : 'default'}
        variant={isBlackActive ? 'filled' : 'outlined'}
        sx={{
          px: 2,
          py: 1,
          height: 'auto',
          borderRadius: 2,
          '& .MuiChip-label': { px: 1 },
          boxShadow: isBlackActive ? '0 2px 8px rgba(25, 118, 210, 0.3)' : 'none',
          transition: 'all 0.3s ease',
        }}
      />
    </Box>
  );
};

export default GameTimer;
