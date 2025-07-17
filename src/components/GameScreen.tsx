import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Container,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  MoreVert as MoreIcon,
  History as HistoryIcon,
  Refresh as RestartIcon,
  Flag as ResignIcon,
  Undo as UndoIcon,
} from '@mui/icons-material';
import { Chessboard } from 'react-chessboard';
import { useGame } from '../hooks/useGame';
import WhiteTimer from './WhiteTimer';
import BlackTimer from './BlackTimer';
import MoveHistory from './MoveHistory';
import { useMemo, useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';
import GameOverModal from './GameOverModal';
const GameScreen = () => {
  const { game, fen, makeMove, history, capturedPieces, resetGame, undoMove, gameOver, resign, isComputerThinking } =
    useGame();
  const gameContext = useContext(GameContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // State for menu and dialogs
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showMoveHistory, setShowMoveHistory] = useState(false);

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
      promotion:
        piece.toLowerCase().endsWith('p') && (targetSquare.endsWith('8') || targetSquare.endsWith('1'))
          ? 'q'
          : undefined,
    });
    return !!move;
  }

  const handleNewGame = () => {
    window.location.reload();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action: () => void) => {
    action();
    handleMenuClose();
  };

  const isPlayerTurn = game.turn() === 'w';
  const arePiecesDraggable =
    !gameOver && !isComputerThinking && (gameContext?.settings.mode === 'h-vs-h' || isPlayerTurn);

  return (
    <Container maxWidth={false} sx={{ py: 2, px: { xs: 1, sm: 2, md: 2, lg: 3 } }}>
      {gameOver && (
        <GameOverModal
          open={!!gameOver}
          winner={gameOver.winner}
          reason={gameOver.reason}
          onPlayAgain={resetGame}
          onNewGame={handleNewGame}
        />
      )}

      {/* Move History Dialog */}
      <Dialog open={showMoveHistory} onClose={() => setShowMoveHistory(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <HistoryIcon sx={{ mr: 1 }} />
          Move History
        </DialogTitle>
        <DialogContent>
          <MoveHistory history={history} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowMoveHistory(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Game Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => handleMenuAction(() => setShowMoveHistory(true))}>
          <ListItemIcon>
            <HistoryIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Move History</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction(resetGame)}>
          <ListItemIcon>
            <RestartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Restart Game</ListItemText>
        </MenuItem>
        {gameContext?.settings.undoAllowed && (
          <MenuItem onClick={() => handleMenuAction(undoMove)}>
            <ListItemIcon>
              <UndoIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Undo Move</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={() => handleMenuAction(resign)}>
          <ListItemIcon>
            <ResignIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Resign Game</ListItemText>
        </MenuItem>
      </Menu>

      {/* Main Game Area */}
      <Grid container spacing={{ xs: 3, md: 2, lg: 3 }}>
        {/* Mobile Top Player (Black) - Only visible on mobile */}
        {isMobile && (
          <Grid item xs={12}>
            <Card elevation={4} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2, bgcolor: 'grey.800' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color="white">
                      Black
                    </Typography>
                    {isComputerThinking && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          px: 1,
                          py: 0.3,
                          borderRadius: 2,
                          bgcolor: 'rgba(255, 152, 0, 0.9)',
                          animation: 'pulse 1.5s ease-in-out infinite',
                          '@keyframes pulse': {
                            '0%': {
                              opacity: 0.8,
                              transform: 'scale(1)',
                            },
                            '50%': {
                              opacity: 1,
                              transform: 'scale(1.02)',
                            },
                            '100%': {
                              opacity: 0.8,
                              transform: 'scale(1)',
                            },
                          },
                        }}
                      >
                        <CircularProgress size={12} thickness={6} sx={{ color: 'white' }} />
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.7rem',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                          }}
                        >
                          Thinking...
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <BlackTimer variant="h6" fontWeight="bold" color="white" turn={game.turn()} isGameOver={!!gameOver} />
                </Box>
                {/* Captured pieces and points */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Box
                    sx={{
                      bgcolor: 'error.main',
                      borderRadius: 1,
                      p: 1,
                      flex: 1,
                      minHeight: 40,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {capturedPieces.w.length > 0 ? (
                      capturedPieces.w.map((piece, index) => (
                        <Box key={index} sx={{ fontSize: '1rem', color: 'white' }}>
                          {(() => {
                            const symbols: { [key: string]: string } = {
                              p: '♟',
                              r: '♜',
                              n: '♞',
                              b: '♝',
                              q: '♛',
                              k: '♚',
                              P: '♙',
                              R: '♖',
                              N: '♘',
                              B: '♗',
                              Q: '♕',
                              K: '♔',
                            };
                            return symbols[piece] || piece;
                          })()}
                        </Box>
                      ))
                    ) : (
                      <Typography variant="caption" color="white" sx={{ opacity: 0.7 }}>
                        No captures
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      bgcolor: 'success.main',
                      borderRadius: 1,
                      p: 1,
                      minWidth: 60,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" color="white" fontWeight="bold">
                      {capturedPieces.w.reduce((total, piece) => {
                        const values: { [key: string]: number } = {
                          p: 1,
                          P: 1,
                          n: 3,
                          N: 3,
                          b: 3,
                          B: 3,
                          r: 5,
                          R: 5,
                          q: 9,
                          Q: 9,
                          k: 0,
                          K: 0,
                        };
                        return total + (values[piece] || 0);
                      }, 0)}{' '}
                      pts
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Desktop/Tablet Layout */}
        <Grid item xs={12} md={9}>
          {/* Chess Board */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              minHeight: isMobile ? '360px' : isTablet ? '520px' : '680px',
            }}
          >
            {/* Chess Board */}
            <Box
              sx={{
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Chessboard
                position={fen}
                onPieceDrop={onDrop}
                boardOrientation="white"
                arePiecesDraggable={arePiecesDraggable}
                customBoardStyle={{
                  borderRadius: '8px',
                }}
                boardWidth={
                  isMobile
                    ? Math.min(window.innerWidth - 32, 400)
                    : isTablet
                    ? Math.min(window.innerWidth * 0.7 - 64, 480)
                    : Math.min(window.innerWidth * 0.75 - 200, 800)
                }
                customSquareStyles={
                  lastMove
                    ? {
                        [lastMove.from]: { backgroundColor: 'rgba(255, 193, 7, 0.6)' },
                        [lastMove.to]: { backgroundColor: 'rgba(255, 193, 7, 0.6)' },
                      }
                    : {}
                }
              />
            </Box>
          </Box>
        </Grid>

        {/* Right Sidebar - Only visible on desktop/tablet */}
        {!isMobile && (
          <Grid item md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Top Player (Black) */}
              <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 2, bgcolor: 'grey.800' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" fontWeight="bold" color="white">
                        Black
                      </Typography>
                      {isComputerThinking && (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            px: 1,
                            py: 0.3,
                            borderRadius: 2,
                            bgcolor: 'rgba(255, 152, 0, 0.9)',
                            animation: 'pulse 1.5s ease-in-out infinite',
                            '@keyframes pulse': {
                              '0%': {
                                opacity: 0.8,
                                transform: 'scale(1)',
                              },
                              '50%': {
                                opacity: 1,
                                transform: 'scale(1.02)',
                              },
                              '100%': {
                                opacity: 0.8,
                                transform: 'scale(1)',
                              },
                            },
                          }}
                        >
                          <CircularProgress size={12} thickness={6} sx={{ color: 'white' }} />
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '0.7rem',
                              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                            }}
                          >
                            Thinking...
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <BlackTimer variant="h6" fontWeight="bold" color="white" turn={game.turn()} isGameOver={!!gameOver} />
                  </Box>
                  {/* Captured pieces and points */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box
                      sx={{
                        bgcolor: 'error.main',
                        borderRadius: 1,
                        p: 1,
                        flex: 1,
                        minHeight: 40,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {capturedPieces.w.length > 0 ? (
                        capturedPieces.w.map((piece, index) => (
                          <Box key={index} sx={{ fontSize: '1rem', color: 'white' }}>
                            {(() => {
                              const symbols: { [key: string]: string } = {
                                p: '♟',
                                r: '♜',
                                n: '♞',
                                b: '♝',
                                q: '♛',
                                k: '♚',
                                P: '♙',
                                R: '♖',
                                N: '♘',
                                B: '♗',
                                Q: '♕',
                                K: '♔',
                              };
                              return symbols[piece] || piece;
                            })()}
                          </Box>
                        ))
                      ) : (
                        <Typography variant="caption" color="white" sx={{ opacity: 0.7 }}>
                          No captures
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        bgcolor: 'success.main',
                        borderRadius: 1,
                        p: 1,
                        minWidth: 60,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body2" color="white" fontWeight="bold">
                        {capturedPieces.w.reduce((total, piece) => {
                          const values: { [key: string]: number } = {
                            p: 1,
                            P: 1,
                            n: 3,
                            N: 3,
                            b: 3,
                            B: 3,
                            r: 5,
                            R: 5,
                            q: 9,
                            Q: 9,
                            k: 0,
                            K: 0,
                          };
                          return total + (values[piece] || 0);
                        }, 0)}{' '}
                        pts
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Game Controls */}
              <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                    Game Controls
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button variant="outlined" startIcon={<RestartIcon />} onClick={resetGame} fullWidth>
                      Restart Game
                    </Button>
                    {gameContext?.settings.undoAllowed && (
                      <Button variant="outlined" startIcon={<UndoIcon />} onClick={undoMove} fullWidth>
                        Undo Move
                      </Button>
                    )}
                    <Button variant="outlined" color="error" startIcon={<ResignIcon />} onClick={resign} fullWidth>
                      Resign Game
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              {/* Move History */}
              <Card elevation={4} sx={{ borderRadius: 3, display: 'flex', flexDirection: 'column', height: 320 }}>
                <CardContent sx={{ p: 2, pb: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    Move History
                  </Typography>
                </CardContent>
                <CardContent sx={{ p: 2, pt: 1, flex: 1, overflow: 'auto' }}>
                  <MoveHistory history={history} />
                </CardContent>
              </Card>

              {/* Bottom Player (White) */}
              <Card elevation={4} sx={{ borderRadius: 3 }}>
                <CardContent sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Box
                      sx={{
                        bgcolor: 'error.main',
                        borderRadius: 1,
                        p: 1,
                        flex: 1,
                        minHeight: 40,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {capturedPieces.b.length > 0 ? (
                        capturedPieces.b.map((piece, index) => (
                          <Box key={index} sx={{ fontSize: '1rem', color: 'white' }}>
                            {(() => {
                              const symbols: { [key: string]: string } = {
                                p: '♟',
                                r: '♜',
                                n: '♞',
                                b: '♝',
                                q: '♛',
                                k: '♚',
                                P: '♙',
                                R: '♖',
                                N: '♘',
                                B: '♗',
                                Q: '♕',
                                K: '♔',
                              };
                              return symbols[piece] || piece;
                            })()}
                          </Box>
                        ))
                      ) : (
                        <Typography variant="caption" color="white" sx={{ opacity: 0.7 }}>
                          No captures
                        </Typography>
                      )}
                    </Box>
                    <Box
                      sx={{
                        bgcolor: 'success.main',
                        borderRadius: 1,
                        p: 1,
                        minWidth: 60,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography variant="body2" color="white" fontWeight="bold">
                        {capturedPieces.b.reduce((total, piece) => {
                          const values: { [key: string]: number } = {
                            p: 1,
                            P: 1,
                            n: 3,
                            N: 3,
                            b: 3,
                            B: 3,
                            r: 5,
                            R: 5,
                            q: 9,
                            Q: 9,
                            k: 0,
                            K: 0,
                          };
                          return total + (values[piece] || 0);
                        }, 0)}{' '}
                        pts
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                      White
                    </Typography>
                    <WhiteTimer variant="h6" fontWeight="bold" color="text.primary" turn={game.turn()} isGameOver={!!gameOver} />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        )}

        {/* Mobile Bottom Player (White) - Only visible on mobile */}
        {isMobile && (
          <Grid item xs={12}>
            <Card elevation={4} sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Box
                    sx={{
                      bgcolor: 'error.main',
                      borderRadius: 1,
                      p: 1,
                      flex: 1,
                      minHeight: 40,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0.5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {capturedPieces.b.length > 0 ? (
                      capturedPieces.b.map((piece, index) => (
                        <Box key={index} sx={{ fontSize: '1rem', color: 'white' }}>
                          {(() => {
                            const symbols: { [key: string]: string } = {
                              p: '♟',
                              r: '♜',
                              n: '♞',
                              b: '♝',
                              q: '♛',
                              k: '♚',
                              P: '♙',
                              R: '♖',
                              N: '♘',
                              B: '♗',
                              Q: '♕',
                              K: '♔',
                            };
                            return symbols[piece] || piece;
                          })()}
                        </Box>
                      ))
                    ) : (
                      <Typography variant="caption" color="white" sx={{ opacity: 0.7 }}>
                        No captures
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      bgcolor: 'success.main',
                      borderRadius: 1,
                      p: 1,
                      minWidth: 60,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="body2" color="white" fontWeight="bold">
                      {capturedPieces.b.reduce((total, piece) => {
                        const values: { [key: string]: number } = {
                          p: 1,
                          P: 1,
                          n: 3,
                          N: 3,
                          b: 3,
                          B: 3,
                          r: 5,
                          R: 5,
                          q: 9,
                          Q: 9,
                          k: 0,
                          K: 0,
                        };
                        return total + (values[piece] || 0);
                      }, 0)}{' '}
                      pts
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight="bold" color="text.primary">
                    White
                  </Typography>
                  <WhiteTimer variant="h6" fontWeight="bold" color="text.primary" turn={game.turn()} isGameOver={!!gameOver} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Mobile Action Menu */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <IconButton
            onClick={handleMenuClick}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              boxShadow: 3,
              '&:hover': {
                bgcolor: 'primary.dark',
              },
            }}
            size="large"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      )}
    </Container>
  );
};

export default GameScreen;
