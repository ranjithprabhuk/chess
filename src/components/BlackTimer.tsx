import { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { GameContext } from '../context/GameContext';

interface BlackTimerProps {
  className?: string;
  sx?: any;
  variant?: any;
  fontWeight?: any;
  color?: any;
  turn: 'w' | 'b';
  isGameOver: boolean;
}

const formatTime = (time: number) => {
  if (time === Infinity) return 'Unlimited';
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const BlackTimer = ({ className, sx, variant = "h6", fontWeight = "bold", color = "text.primary", turn, isGameOver }: BlackTimerProps) => {
  const gameContext = useContext(GameContext);
  const { blackTime, setBlackTime } = gameContext!;

  useEffect(() => {
    if (isGameOver || blackTime === Infinity || turn !== 'b') return;

    const timer = setInterval(() => {
      setBlackTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [turn, isGameOver, setBlackTime, blackTime]);

  return (
    <Typography 
      className={className}
      sx={sx}
      variant={variant} 
      fontWeight={fontWeight} 
      color={color}
    >
      {formatTime(blackTime)}
    </Typography>
  );
};

export default BlackTimer;
