import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { GameSettings, GameMode, Difficulty, GameTime } from '../types';

interface GameContextType {
    settings: GameSettings;
    setSettings: React.Dispatch<React.SetStateAction<GameSettings>>;
    whiteTime: number;
    blackTime: number;
    setWhiteTime: React.Dispatch<React.SetStateAction<number>>;
    setBlackTime: React.Dispatch<React.SetStateAction<number>>;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<GameSettings>({
        mode: 'h-vs-h' as GameMode,
        difficulty: 'medium' as Difficulty,
        time: 0 as GameTime,
        undoAllowed: true,
    });

    const [whiteTime, setWhiteTime] = useState(0);
    const [blackTime, setBlackTime] = useState(0);

    useEffect(() => {
        const timeInSeconds = settings.time === 0 ? Infinity : settings.time * 60;
        setWhiteTime(timeInSeconds);
        setBlackTime(timeInSeconds);
    }, [settings.time]);

    return (
        <GameContext.Provider value={{ settings, setSettings, whiteTime, blackTime, setWhiteTime, setBlackTime }}>
            {children}
        </GameContext.Provider>
    );
};
