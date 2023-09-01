import { observer } from 'mobx-react';

import { Box, TextField, Typography } from '@mui/material';
import moment from 'moment';

import TaskStore from '../store/TaskStore';

const TaskQuery = observer(() => {
    const { taskQueue, pause, setPause } = TaskStore;

    const handlePause = (event: any) => {
        setPause(Number(event.currentTarget.value));
    };

    return (
        <Box sx={{ height: '80%', m: 4 }}>
            <Typography variant="h4" gutterBottom>
                Active tasks
            </Typography>
            <TextField
                label="Pause"
                value={pause}
                size="small"
                onChange={handlePause}
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    m: 4
                }}
            />
            <Box sx={{ height: '100%', overflow: 'auto', textAlign: 'justify' }}>
                {taskQueue.map(task => (
                    <Typography variant="subtitle1" gutterBottom>{`Task #${task.index}, method "${
                        task.method
                    }" created at ${moment(task.created).format('HH:mm:ss')} for node ${
                        task.name
                    }. Initiator: ${task.initiator}`}</Typography>
                ))}
            </Box>
        </Box>
    );
});

export default TaskQuery;
