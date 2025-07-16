import { useContext } from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { GameContext } from '../context/GameContext';

interface GameControlsProps {
    onRestart: () => void;
    onUndo: () => void;
    onResign: () => void;
}

const GameControls = ({ onRestart, onUndo, onResign }: GameControlsProps) => {
    const gameContext = useContext(GameContext);

    return (
        <ButtonGroup variant="contained" aria-label="game controls">
            <Button onClick={onRestart}>Restart</Button>
            <Button onClick={onResign}>Resign</Button>
            <Button onClick={onUndo} disabled={!gameContext?.settings.undoAllowed}>
                Undo
            </Button>
        </ButtonGroup>
    );
};

export default GameControls;
