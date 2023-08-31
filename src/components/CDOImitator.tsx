import { Box, Grid } from '@mui/material';

import Element from './Element';
import Log from './Log';
import TaskQuery from './TaskQuery';

import ElementStore from '../store/ElementStore';
import ElementTreeStore from '../store/ElementTreeStore';

const elementStore = new ElementStore('Root element', 0);

ElementTreeStore.addElement(elementStore);

const CDOImitator = () => (
    <Grid container sx={{ width: '100vw' }}>
        <Grid item xs={7}>
            <Box sx={{ height: '100vh', overflow: 'auto' }}>
                <Element root store={elementStore} />
            </Box>
        </Grid>
        <Grid container item sx={{ height: '100vh' }} xs={5} direction="column">
            <Grid item xs={6}>
                <Log />
            </Grid>
            <Grid item xs={6}>
                <TaskQuery />
            </Grid>
        </Grid>
    </Grid>
);

export default CDOImitator;
