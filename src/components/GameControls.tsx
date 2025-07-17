import { useContext } from 'react';
import { Button, Box } from '@mui/material';
import { Refresh as RestartIcon, Flag as ResignIcon, Undo as UndoIcon } from '@mui/icons-material';
import { GameContext } from '../context/GameContext';

interface GameControlsProps {
  onRestart: () => void;
  onUndo: () => void;
  onResign: () => void;
}

const GameControls = ({ onRestart, onUndo, onResign }: GameControlsProps) => {
  const gameContext = useContext(GameContext);

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <Button
        variant="contained"
        onClick={onRestart}
        startIcon={<RestartIcon />}
        color="primary"
        sx={{
          flexGrow: 1,
          borderRadius: 2,
          fontWeight: 'bold',
          textTransform: 'none',
        }}
      >
        Restart
      </Button>
      <Button
        variant="contained"
        onClick={onResign}
        startIcon={<ResignIcon />}
        color="error"
        sx={{
          flexGrow: 1,
          borderRadius: 2,
          fontWeight: 'bold',
          textTransform: 'none',
        }}
      >
        Resign
      </Button>
      <Button
        variant="contained"
        onClick={onUndo}
        disabled={!gameContext?.settings.undoAllowed}
        startIcon={<UndoIcon />}
        color="warning"
        sx={{
          flexGrow: 1,
          borderRadius: 2,
          fontWeight: 'bold',
          textTransform: 'none',
          '&:disabled': {
            bgcolor: 'grey.300',
            color: 'grey.500',
          },
        }}
      >
        Undo
      </Button>
    </Box>
  );
};

export default GameControls;
