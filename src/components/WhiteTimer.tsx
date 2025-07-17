import { useContext, useEffect } from 'react';
import { Typography } from '@mui/material';
import { GameContext } from '../context/GameContext';

interface WhiteTimerProps {
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

const WhiteTimer = ({
  className,
  sx,
  variant = 'h6',
  fontWeight = 'bold',
  color = 'text.primary',
  turn,
  isGameOver,
}: WhiteTimerProps) => {
  const gameContext = useContext(GameContext);
  const { whiteTime, setWhiteTime } = gameContext!;

  useEffect(() => {
    if (isGameOver || whiteTime === Infinity || turn !== 'w') return;

    const timer = setInterval(() => {
      setWhiteTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [turn, isGameOver, setWhiteTime, whiteTime]);

  return (
    <Typography className={className} sx={sx} variant={variant} fontWeight={fontWeight} color={color}>
      {formatTime(whiteTime)}
    </Typography>
  );
};

export default WhiteTimer;
