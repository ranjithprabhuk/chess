import { List, ListItem, ListItemText, Typography } from '@mui/material';

interface MoveHistoryProps {
    history: any[]; // chess.js history is complex, using any for now
}

const MoveHistory = ({ history }: MoveHistoryProps) => {
    return (
        <div>
            <Typography variant="h6">Move History</Typography>
            <List dense sx={{ maxHeight: 300, overflow: 'auto' }}>
                {history.map((move, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`${Math.floor(index / 2) + 1}. ${move.san}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default MoveHistory;
