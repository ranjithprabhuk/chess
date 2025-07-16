import { createContext, useState, useMemo, ReactNode } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ThemeName, ThemeContextType } from '../types';
import { themes } from '../themes';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeName, setThemeName] = useState<ThemeName>('default');

    const theme = useMemo(() => themes[themeName], [themeName]);

    return (
        <ThemeContext.Provider value={{ theme, themeName, setThemeName }}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};
