import { Modal, Box, Typography, Button, ButtonGroup } from '@mui/material';

interface GameOverModalProps {
    open: boolean;
    winner: string;
    reason: string;
    onPlayAgain: () => void;
    onNewGame: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
};

const GameOverModal = ({ open, winner, reason, onPlayAgain, onNewGame }: GameOverModalProps) => {
    return (
        <Modal open={open}>
            <Box sx={style}>
                <Typography variant="h4" gutterBottom>Game Over</Typography>
                <Typography variant="h6">{winner === 'Draw' ? 'The game is a Draw' : `${winner} wins!`}</Typography>
                <Typography variant="subtitle1" sx={{ mb: 3 }}>Reason: {reason}</Typography>
                <ButtonGroup>
                    <Button variant="contained" onClick={onPlayAgain}>Play Again</Button>
                    <Button variant="outlined" onClick={onNewGame}>New Game Setup</Button>
                </ButtonGroup>
            </Box>
        </Modal>
    );
};

export default GameOverModal;
