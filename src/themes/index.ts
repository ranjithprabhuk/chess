import { createTheme } from '@mui/material/styles';
import { ThemeName } from '../types';

const defaultTheme = createTheme();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const classicWoodTheme = createTheme({
  palette: {
    background: {
      default: '#d2b48c',
      paper: '#f5deb3',
    },
  },
});

const blueWhiteTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#e3f2fd',
      paper: '#fff',
    },
  },
});

export const themes: Record<ThemeName, any> = {
  default: defaultTheme,
  dark: darkTheme,
  classic: classicWoodTheme,
  'blue-white': blueWhiteTheme,
};
