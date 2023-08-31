import { observer } from 'mobx-react';

import { Box, Button, Typography } from '@mui/material';

import LogStore from '../store/LogStore';

const Log = observer(() => {
    const { log, clear } = LogStore;

    const handleClear = () => {
        clear();
    };

    return (
        <Box sx={{ height: '80%', m: 4 }}>
            <Box sx={{ height: '100%', overflow: 'auto', textAlign: 'justify' }}>
                {log.map((rec, index) => (
                    <Typography key={index}>{rec}</Typography>
                ))}
            </Box>
            <Button onClick={handleClear} variant="contained" sx={{ mt: 2 }}>
                Clear log
            </Button>
        </Box>
    );
});

export default Log;
