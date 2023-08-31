import { observer } from 'mobx-react';

import { Box, Typography } from '@mui/material';
import moment from 'moment';

import TaskStore from '../store/TaskStore';

const TaskQuery = observer(() => {
    const { taskQueue } = TaskStore;

    return (
        <Box sx={{ m: 4 }}>
            <Typography variant="h4" gutterBottom>
                Active tasks
            </Typography>
            <Box sx={{ textAlign: 'justify' }}>
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
