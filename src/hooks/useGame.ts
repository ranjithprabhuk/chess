import { useState, useContext, useMemo, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import { GameContext } from '../context/GameContext';
import { CapturedPieces } from '../types';
import { useStockfish } from './useStockfish';

export const useGame = () => {
    const gameContext = useContext(GameContext);
    const [game] = useState(new Chess());
    const [fen, setFen] = useState(game.fen());
    const { findBestMove, isStockfishReady } = useStockfish();
    const [gameOver, setGameOver] = useState<{ winner: string; reason: string } | null>(null);
    const [isComputerThinking, setIsComputerThinking] = useState(false);

    const history = useMemo(() => game.history({ verbose: true }), [fen]);

    const capturedPieces = useMemo(() => {
        const captured: CapturedPieces = { w: [], b: [] };
        const allHistory = game.history({ verbose: true });
        allHistory.forEach(move => {
            if (move.captured) {
                const pieceColor = move.color === 'w' ? 'b' : 'w';
                captured[pieceColor].push(move.captured.toUpperCase());
            }
        });
        return captured;
    }, [fen, game]);

    const checkGameOver = useCallback(() => {
        if (game.isGameOver()) {
            let winner = '';
            let reason = '';
            if (game.isCheckmate()) {
                winner = game.turn() === 'w' ? 'Black' : 'White';
                reason = 'Checkmate';
            } else if (game.isDraw()) {
                winner = 'Draw';
                reason = 'Draw';
            } else if (game.isStalemate()) {
                winner = 'Draw';
                reason = 'Stalemate';
            } else if (game.isThreefoldRepetition()) {
                winner = 'Draw';
                reason = 'Threefold Repetition';
            }
            setGameOver({ winner, reason });
            setIsComputerThinking(false); // Ensure thinking indicator is off when game ends
        }
    }, [game]);

    const makeMove = useCallback((move: { from: string; to: string; promotion?: string } | string) => {
        if (gameOver) return false;
        try {
            const result = game.move(move);
            if (result) {
                setFen(game.fen());
                checkGameOver();
                return true;
            }
        } catch (error) {
            // The move was illegal
        }
        return false;
    }, [game, gameOver, checkGameOver]);

    useEffect(() => {
        if (gameContext?.settings.mode === 'h-vs-c' && game.turn() === 'b' && !gameOver && isStockfishReady) {
            setIsComputerThinking(true);
            // Use a timeout to make the thinking indicator visible
            setTimeout(() => {
                findBestMove(game.fen()).then((bestMove) => {
                    if (bestMove) {
                        makeMove(bestMove);
                    }
                }).finally(() => {
                    setIsComputerThinking(false);
                });
            }, 500);
        }
    }, [fen, gameContext?.settings.mode, gameOver, isStockfishReady, findBestMove, makeMove, game]);

    const resetGame = () => {
        game.reset();
        setFen(game.fen());
        setGameOver(null);
    };

    const undoMove = () => {
        if (gameContext?.settings.undoAllowed && !isComputerThinking) {
            game.undo();
            if (gameContext.settings.mode === 'h-vs-c' && game.history().length > 0) {
                game.undo();
            }
            setFen(game.fen());
        }
    };

    const resign = () => {
        if (gameOver) return;
        const winner = game.turn() === 'w' ? 'Black' : 'White';
        setGameOver({ winner, reason: 'Resignation' });
    };

    return { game, fen, makeMove, resetGame, undoMove, history, capturedPieces, gameOver, resign, isComputerThinking };
};
