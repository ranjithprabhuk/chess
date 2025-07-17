import { Box, Typography, Paper } from '@mui/material';
import { useEffect, useRef } from 'react';

interface MoveHistoryProps {
  history: any[]; // chess.js history is complex, using any for now
}

const MoveHistory = ({ history }: MoveHistoryProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new moves are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Group moves by pairs (white and black moves)
  const movePairs = [];
  for (let i = 0; i < history.length; i += 2) {
    movePairs.push({
      moveNumber: Math.floor(i / 2) + 1,
      white: history[i],
      black: history[i + 1] || null,
    });
  }

  if (history.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
        No moves yet
      </Typography>
    );
  }

  return (
    <Box ref={scrollRef} sx={{ width: '100%', height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          pb: 1,
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky',
          top: 0,
          bgcolor: 'background.paper',
          zIndex: 1,
        }}
      >
        <Typography variant="caption" sx={{ width: '15%', fontWeight: 'bold', color: 'text.secondary' }}>
          #
        </Typography>
        <Typography variant="caption" sx={{ width: '42.5%', fontWeight: 'bold', color: 'text.secondary' }}>
          White
        </Typography>
        <Typography variant="caption" sx={{ width: '42.5%', fontWeight: 'bold', color: 'text.secondary' }}>
          Black
        </Typography>
      </Box>

      {/* Moves */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {movePairs.map((pair, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: 0.5,
              px: 1,
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
              bgcolor: index % 2 === 0 ? 'transparent' : 'action.hover',
            }}
          >
            {/* Move number */}
            <Typography
              variant="body2"
              sx={{
                width: '15%',
                fontWeight: 'bold',
                color: 'text.secondary',
                fontSize: '0.8rem',
              }}
            >
              {pair.moveNumber}.
            </Typography>

            {/* White move */}
            <Box sx={{ width: '42.5%' }}>
              <Paper
                elevation={0}
                sx={{
                  px: 1,
                  py: 0.5,
                  bgcolor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                  {pair.white?.san || ''}
                </Typography>
              </Paper>
            </Box>

            {/* Black move */}
            <Box sx={{ width: '42.5%', ml: 0.5 }}>
              {pair.black && (
                <Paper
                  elevation={0}
                  sx={{
                    px: 1,
                    py: 0.5,
                    bgcolor: 'grey.800',
                    border: '1px solid',
                    borderColor: 'grey.600',
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      color: 'white',
                    }}
                  >
                    {pair.black.san}
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MoveHistory;
