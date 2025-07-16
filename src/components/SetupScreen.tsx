import { useContext } from 'react';
import { Container, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Switch, Button } from '@mui/material';
import { GameContext } from '../context/GameContext';
import { ThemeContext } from '../context/ThemeContext';
import { GameMode, Difficulty, GameTime, ThemeName } from '../types';

const SetupScreen = ({ onStartGame }: { onStartGame: () => void }) => {
    const gameContext = useContext(GameContext);
    const themeContext = useContext(ThemeContext);

    if (!gameContext || !themeContext) {
        return <div>Loading...</div>;
    }

    const { settings, setSettings } = gameContext;
    const { themeName, setThemeName } = themeContext;

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>Game Setup</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Game Mode</InputLabel>
                            <Select value={settings.mode} onChange={(e) => setSettings({ ...settings, mode: e.target.value as GameMode })}>
                                <MenuItem value="h-vs-c">Player vs Computer</MenuItem>
                                <MenuItem value="h-vs-h">Player vs Player</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {settings.mode === 'h-vs-c' && (
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <Typography component="legend">Difficulty</Typography>
                                <RadioGroup row value={settings.difficulty} onChange={(e) => setSettings({ ...settings, difficulty: e.target.value as Difficulty })}>
                                    <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                                    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                    <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Game Time</InputLabel>
                            <Select value={settings.time} onChange={(e) => setSettings({ ...settings, time: e.target.value as GameTime })}>
                                <MenuItem value={3}>3 min</MenuItem>
                                <MenuItem value={5}>5 min</MenuItem>
                                <MenuItem value={10}>10 min</MenuItem>
                                <MenuItem value={20}>20 min</MenuItem>
                                <MenuItem value={30}>30 min</MenuItem>
                                <MenuItem value={60}>1 hour</MenuItem>
                                <MenuItem value={0}>Unlimited</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {settings.mode === 'h-vs-h' && (
                        <Grid item xs={12}>
                            <FormControlLabel control={<Switch checked={settings.undoAllowed} onChange={(e) => setSettings({ ...settings, undoAllowed: e.target.checked })} />} label="Allow Undo" />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Theme</InputLabel>
                            <Select value={themeName} onChange={(e) => setThemeName(e.target.value as ThemeName)}>
                                <MenuItem value="default">Default</MenuItem>
                                <MenuItem value="dark">Dark Mode</MenuItem>
                                <MenuItem value="classic">Classic Wood</MenuItem>
                                <MenuItem value="blue-white">Blue & White</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth onClick={onStartGame}>Start Game</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default SetupScreen;
