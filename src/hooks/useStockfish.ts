import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { Difficulty } from '../types';

const STOCKFISH_PATH = '/stockfish/stockfish-nnue-16.js';

const getSkillLevel = (difficulty: Difficulty) => {
    switch (difficulty) {
        case 'easy': return 1;
        case 'medium': return 5;
        case 'hard': return 10;
        default: return 5;
    }
};

export const useStockfish = () => {
    const [isStockfishReady, setIsStockfishReady] = useState(false);
    const stockfish = useRef<Worker | null>(null);
    const onBestMoveRef = useRef<((bestMove: string) => void) | null>(null);
    const gameContext = useContext(GameContext);

    useEffect(() => {
        const worker = new Worker(STOCKFISH_PATH);
        stockfish.current = worker;

        worker.onmessage = (event: MessageEvent<string>) => {
            const message = event.data;

            if (message === 'uciok') {
                setIsStockfishReady(true);
            } else if (message.startsWith('bestmove')) {
                const bestMove = message.split(' ')[1];
                if (onBestMoveRef.current) {
                    onBestMoveRef.current(bestMove);
                }
            }
        };

        worker.postMessage('uci');
        worker.postMessage('isready');

        return () => {
            worker.terminate();
        };
    }, []);

    const findBestMove = useCallback((fen: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (stockfish.current && isStockfishReady) {
                onBestMoveRef.current = resolve;
                const skillLevel = getSkillLevel(gameContext?.settings.difficulty || 'medium');
                stockfish.current.postMessage(`setoption name Skill Level value ${skillLevel}`);
                stockfish.current.postMessage(`position fen ${fen}`);
                stockfish.current.postMessage('go depth 15');
            } else {
                reject('Stockfish not ready');
            }
        });
    }, [isStockfishReady, gameContext?.settings.difficulty]);

    return { findBestMove, isStockfishReady };
};
