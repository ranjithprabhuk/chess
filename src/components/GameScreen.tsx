import { Grid, Paper, Box, Typography, CircularProgress } from '@mui/material';
import { Chessboard } from 'react-chessboard';
import { useGame } from '../hooks/useGame';
import MoveHistory from './MoveHistory';
import CapturedPiecesDisplay from './CapturedPiecesDisplay';
import GameControls from './GameControls';
import GameTimer from './GameTimer';
import GameOverModal from './GameOverModal';
import { useMemo, useContext } from 'react';
import { GameContext } from '../context/GameContext';

const GameScreen = () => {
    const { game, fen, makeMove, history, capturedPieces, resetGame, undoMove, gameOver, resign, isComputerThinking } = useGame();
    const gameContext = useContext(GameContext);

    const lastMove = useMemo(() => {
        if (history.length > 0) {
            return history[history.length - 1];
        }
        return null;
    }, [history]);

    function onDrop(sourceSquare: string, targetSquare: string, piece: string) {
        const move = makeMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: piece.toLowerCase().endsWith('p') && (targetSquare.endsWith('8') || targetSquare.endsWith('1')) ? 'q' : undefined,
        });
        return !!move;
    }

    const handleNewGame = () => {
        window.location.reload();
    };

    const isPlayerTurn = game.turn() === 'w';
    const arePiecesDraggable = !gameOver && !isComputerThinking && (gameContext?.settings.mode === 'h-vs-h' || isPlayerTurn);

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            {gameOver && (
                <GameOverModal
                    open={!!gameOver}
                    winner={gameOver.winner}
                    reason={gameOver.reason}
                    onPlayAgain={resetGame}
                    onNewGame={handleNewGame}
                />
            )}
            <Grid item xs={12} md={8}>
                <Paper elevation={3}>
                    <GameTimer turn={game.turn()} isGameOver={!!gameOver} />
                    <Box sx={{ position: 'relative' }}>
                        <Chessboard
                            position={fen}
                            onPieceDrop={onDrop}
                            boardOrientation="white"
                            arePiecesDraggable={arePiecesDraggable}
                            customBoardStyle={{ borderRadius: '4px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)' }}
                            customSquareStyles={lastMove ? { [lastMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' }, [lastMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.4)' } } : {}}
                        />
                        {isComputerThinking && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '4px',
                                }}
                            >
                                <CircularProgress color="inherit" />
                                <Typography variant="h6" sx={{ mt: 2 }}>Computer is thinking...</Typography>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                    <Box sx={{ mb: 2 }}>
                        <GameControls onRestart={resetGame} onUndo={undoMove} onResign={resign} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <CapturedPiecesDisplay capturedPieces={capturedPieces} />
                    </Box>
                    <MoveHistory history={history} />
                </Paper>
            </Grid>
        </Grid>
    );
};

export default GameScreen;
