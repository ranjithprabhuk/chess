import { Box, Typography } from '@mui/material';
import { CapturedPieces } from '../types';

interface CapturedPiecesProps {
    capturedPieces: CapturedPieces;
}

const CapturedPiecesDisplay = ({ capturedPieces }: CapturedPiecesProps) => {
    return (
        <Box>
            <Typography variant="subtitle1">Captured by White:</Typography>
            <Typography variant="body2">{capturedPieces.b.join(' ')}</Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>Captured by Black:</Typography>
            <Typography variant="body2">{capturedPieces.w.join(' ')}</Typography>
        </Box>
    );
};

export default CapturedPiecesDisplay;
