import { Theme } from "@mui/material";

export type GameMode = 'h-vs-c' | 'h-vs-h';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameTime = 3 | 5 | 10 | 20 | 30 | 60 | 0; // 0 for unlimited
export type ThemeName = 'default' | 'dark' | 'classic' | 'blue-white';

export interface GameSettings {
  mode: GameMode;
  difficulty: Difficulty;
  time: GameTime;
  undoAllowed: boolean;
}

export interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setThemeName: (themeName: ThemeName) => void;
}

export interface Move {
  from: string;
  to: string;
  piece: string;
  san: string;
  timestamp: number;
}

export interface CapturedPieces {
  w: string[];
  b: string[];
}
