import { Box, Paper, Typography, Chip } from '@mui/material';
import { CapturedPieces } from '../types';

interface CapturedPiecesProps {
  capturedPieces: CapturedPieces;
}

const pieceToSymbol = (piece: string) => {
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
};

const getPieceValue = (piece: string) => {
  const values: { [key: string]: number } = {
    p: 1,
    P: 1, // Pawn
    n: 3,
    N: 3, // Knight
    b: 3,
    B: 3, // Bishop
    r: 5,
    R: 5, // Rook
    q: 9,
    Q: 9, // Queen
    k: 0,
    K: 0, // King (technically invaluable)
  };
  return values[piece] || 0;
};

const CapturedPiecesDisplay = ({ capturedPieces }: CapturedPiecesProps) => {
  // Calculate points for each side
  const whitePoints = capturedPieces.b.reduce((total, piece) => total + getPieceValue(piece), 0);
  const blackPoints = capturedPieces.w.reduce((total, piece) => total + getPieceValue(piece), 0);

  // Calculate material advantage
  const whiteLead = whitePoints - blackPoints;
  const blackLead = blackPoints - whitePoints;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, minHeight: 40 }}>
      {/* White captured pieces (left side) */}
      <Paper
        elevation={1}
        sx={{
          flex: 1,
          p: 1,
          borderRadius: 2,
          bgcolor: 'grey.50',
          border: '1px solid',
          borderColor: 'grey.200',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          minHeight: 50,
        }}
      >
        {/* White points and advantage */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 20 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            {whitePoints} pts
          </Typography>
          {whiteLead > 0 && (
            <Chip
              label={`+${whiteLead}`}
              size="small"
              color="success"
              sx={{
                height: 20,
                fontSize: '0.7rem',
                fontWeight: 'bold',
                '& .MuiChip-label': { px: 1 },
              }}
            />
          )}
        </Box>

        {/* White captured pieces */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center', minHeight: 24 }}>
          {capturedPieces.b.map((piece, index) => (
            <Box
              key={index}
              sx={{
                fontSize: '1.2rem',
                color: 'text.primary',
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              title={`${piece.toUpperCase()} (${getPieceValue(piece)} pts)`}
            >
              {pieceToSymbol(piece)}
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Black captured pieces (right side) */}
      <Paper
        elevation={1}
        sx={{
          flex: 1,
          p: 1,
          borderRadius: 2,
          bgcolor: 'grey.800',
          border: '1px solid',
          borderColor: 'grey.600',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          minHeight: 50,
        }}
      >
        {/* Black points and advantage */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 20 }}>
          <Typography variant="caption" color="grey.300" sx={{ fontWeight: 'bold' }}>
            {blackPoints} pts
          </Typography>
          {blackLead > 0 && (
            <Chip
              label={`+${blackLead}`}
              size="small"
              color="success"
              sx={{
                height: 20,
                fontSize: '0.7rem',
                fontWeight: 'bold',
                '& .MuiChip-label': { px: 1 },
              }}
            />
          )}
        </Box>

        {/* Black captured pieces */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, alignItems: 'center', minHeight: 24 }}>
          {capturedPieces.w.map((piece, index) => (
            <Box
              key={index}
              sx={{
                fontSize: '1.2rem',
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              title={`${piece.toUpperCase()} (${getPieceValue(piece)} pts)`}
            >
              {pieceToSymbol(piece)}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default CapturedPiecesDisplay;
