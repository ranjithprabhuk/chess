import { useEffect, useContext } from 'react';
import { Typography, Box } from '@mui/material';
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
                setWhiteTime(t => (t > 0 ? t - 1 : 0));
            } else {
                setBlackTime(t => (t > 0 ? t - 1 : 0));
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [turn, isGameOver, setWhiteTime, setBlackTime, whiteTime]);

    return (
        <Box display="flex" justifyContent="space-around" sx={{ mb: 2, p: 2, bgcolor: 'grey.200', borderRadius: 1 }}>
            <Typography variant="h6" color={turn === 'w' ? 'primary' : 'text.secondary'}>
                White: {formatTime(whiteTime)}
            </Typography>
            <Typography variant="h6" color={turn === 'b' ? 'primary' : 'text.secondary'}>
                Black: {formatTime(blackTime)}
            </Typography>
        </Box>
    );
};

export default GameTimer;
