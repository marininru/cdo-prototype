import { observer } from 'mobx-react';

import { Box, Button, TextField } from '@mui/material';

import LogStore from '../store/LogStore';

const Log = observer(() => {
    const { log, clear } = LogStore;

    const handleClear = () => {
        clear();
    };

    return (
        <Box sx={{ m: 4 }}>
            <TextField
                fullWidth
                value={log.join(`\n`)}
                multiline
                rows={20}
                disabled
                sx={{ mb: 2 }}
            />
            <Button onClick={handleClear} variant="contained">
                Clear log
            </Button>
        </Box>
    );
});

export default Log;
