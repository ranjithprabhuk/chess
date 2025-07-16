import { useContext } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Button,
  Box,
  Card,
  Chip,
  Divider,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
  Computer as ComputerIcon,
  AccessTime as TimeIcon,
  Palette as PaletteIcon,
  PlayArrow as PlayIcon,
  Undo as UndoIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { GameContext } from '../context/GameContext';
import { ThemeContext } from '../context/ThemeContext';
import { GameMode, Difficulty, GameTime, ThemeName } from '../types';

const SetupScreen = ({ onStartGame }: { onStartGame: () => void }) => {
  const gameContext = useContext(GameContext);
  const themeContext = useContext(ThemeContext);
  const muiTheme = useTheme();

  if (!gameContext || !themeContext) {
    return <div>Loading...</div>;
  }

  const { settings, setSettings } = gameContext;
  const { themeName, setThemeName } = themeContext;

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy':
        return muiTheme.palette.success.main;
      case 'medium':
        return muiTheme.palette.warning.main;
      case 'hard':
        return muiTheme.palette.error.main;
      default:
        return muiTheme.palette.warning.main;
    }
  };

  const getTimeDisplay = (time: number) => {
    if (time === 0) return 'Unlimited';
    if (time >= 60) return `${time / 60} hour${time > 60 ? 's' : ''}`;
    return `${time} min`;
  };

  const getThemeColor = (themeKey: ThemeName) => {
    switch (themeKey) {
      case 'default':
        return muiTheme.palette.primary.main;
      case 'dark':
        return muiTheme.palette.mode === 'dark' ? '#424242' : '#424242';
      case 'classic':
        return '#8B4513';
      case 'blue-white':
        return '#2196f3';
      default:
        return muiTheme.palette.primary.main;
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          py: 4,
          bgcolor: 'background.default',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            p: 5,
            width: '100%',
            borderRadius: 4,
            bgcolor: 'background.paper',
            border: `1px solid ${muiTheme.palette.divider}`,
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                fontSize: '2rem',
                color: 'primary.contrastText',
              }}
            >
              ♔
            </Avatar>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                mb: 1,
              }}
            >
              Chess Game Setup
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Configure your perfect chess experience
            </Typography>
            <Divider sx={{ mx: 'auto', width: '60%' }} />
          </Box>

          <Grid container spacing={4}>
            {/* Game Mode Section */}
            <Grid item xs={12}>
              <Card elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                    <SettingsIcon />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold">
                    Game Mode
                  </Typography>
                </Box>
                <FormControl fullWidth>
                  <Select
                    value={settings.mode}
                    onChange={(e) => setSettings({ ...settings, mode: e.target.value as GameMode })}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="h-vs-c" sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ComputerIcon sx={{ mr: 2, color: 'primary.main' }} />
                        <Box>
                          <Typography fontWeight="bold">Player vs Computer</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Challenge our AI engine
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                    <MenuItem value="h-vs-h" sx={{ py: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 2, color: 'secondary.main' }} />
                        <Box>
                          <Typography fontWeight="bold">Player vs Player</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Play with a friend locally
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Card>
            </Grid>

            {/* Difficulty Section */}
            {settings.mode === 'h-vs-c' && (
              <Grid item xs={12}>
                <Card elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: getDifficultyColor(settings.difficulty), mr: 2 }}>⚡</Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Difficulty Level
                    </Typography>
                  </Box>
                  <RadioGroup
                    row
                    value={settings.difficulty}
                    onChange={(e) => setSettings({ ...settings, difficulty: e.target.value as Difficulty })}
                    sx={{ justifyContent: 'space-around' }}
                  >
                    <FormControlLabel
                      value="easy"
                      control={
                        <Radio
                          sx={{
                            color: 'success.main',
                            '&.Mui-checked': { color: 'success.main' },
                          }}
                        />
                      }
                      label={
                        <Box sx={{ textAlign: 'center' }}>
                          <Chip
                            label="Easy"
                            size="small"
                            sx={{ mb: 1, bgcolor: 'success.main', color: 'success.contrastText' }}
                          />
                          <Typography variant="caption" display="block" color="text.secondary">
                            Beginner friendly
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="medium"
                      control={
                        <Radio
                          sx={{
                            color: 'warning.main',
                            '&.Mui-checked': { color: 'warning.main' },
                          }}
                        />
                      }
                      label={
                        <Box sx={{ textAlign: 'center' }}>
                          <Chip
                            label="Medium"
                            size="small"
                            sx={{ mb: 1, bgcolor: 'warning.main', color: 'warning.contrastText' }}
                          />
                          <Typography variant="caption" display="block" color="text.secondary">
                            Balanced challenge
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      value="hard"
                      control={
                        <Radio
                          sx={{
                            color: 'error.main',
                            '&.Mui-checked': { color: 'error.main' },
                          }}
                        />
                      }
                      label={
                        <Box sx={{ textAlign: 'center' }}>
                          <Chip
                            label="Hard"
                            size="small"
                            sx={{ mb: 1, bgcolor: 'error.main', color: 'error.contrastText' }}
                          />
                          <Typography variant="caption" display="block" color="text.secondary">
                            Expert level
                          </Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </Card>
              </Grid>
            )}

            <Grid container item xs={12} spacing={3}>
              {/* Time Control Section */}
              <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                      <TimeIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Time Control
                    </Typography>
                  </Box>
                  <FormControl fullWidth>
                    <Select
                      value={settings.time}
                      onChange={(e) => setSettings({ ...settings, time: e.target.value as GameTime })}
                      sx={{ borderRadius: 2 }}
                    >
                      {[3, 5, 10, 20, 30, 60, 0].map((time) => (
                        <MenuItem key={time} value={time} sx={{ py: 1.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TimeIcon sx={{ mr: 2, color: 'info.main', fontSize: '1.2rem' }} />
                            <Typography fontWeight="medium">{getTimeDisplay(time)}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Card>
              </Grid>

              {/* Theme Section */}
              <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                      <PaletteIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Theme
                    </Typography>
                  </Box>
                  <FormControl fullWidth>
                    <Select
                      value={themeName}
                      onChange={(e) => setThemeName(e.target.value as ThemeName)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="default" sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              bgcolor: getThemeColor('default'),
                              mr: 2,
                            }}
                          />
                          <Typography>Default</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="dark" sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: getThemeColor('dark'), mr: 2 }}
                          />
                          <Typography>Dark Mode</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="classic" sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              bgcolor: getThemeColor('classic'),
                              mr: 2,
                            }}
                          />
                          <Typography>Classic Wood</Typography>
                        </Box>
                      </MenuItem>
                      <MenuItem value="blue-white" sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              bgcolor: getThemeColor('blue-white'),
                              mr: 2,
                            }}
                          />
                          <Typography>Blue & White</Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Card>
              </Grid>
            </Grid>

            {/* Undo Option for PvP */}
            {settings.mode === 'h-vs-h' && (
              <Grid item xs={12}>
                <Card elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                        <UndoIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Allow Undo
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Players can undo their last move
                        </Typography>
                      </Box>
                    </Box>
                    <Switch
                      checked={settings.undoAllowed}
                      onChange={(e) => setSettings({ ...settings, undoAllowed: e.target.checked })}
                      color="success"
                    />
                  </Box>
                </Card>
              </Grid>
            )}

            {/* Start Game Button */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={onStartGame}
                startIcon={<PlayIcon />}
                sx={{
                  py: 2,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  borderRadius: 3,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  boxShadow: (theme) => `0 8px 32px ${theme.palette.primary.main}40`,
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) => `0 12px 40px ${theme.palette.primary.main}60`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Chess Game
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default SetupScreen;
