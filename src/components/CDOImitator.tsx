import { Box, Grid } from '@mui/material';

import Element from './Element';
import Log from './Log';
import TaskQuery from './TaskQuery';

import ElementTreeStore from '../store/ElementTreeStore';

const rootGuid = ElementTreeStore.addElement(undefined, 'Root element');

const rootElement = ElementTreeStore.getElement(rootGuid);

const CDOImitator = () => (
    <Grid container sx={{ width: '100vw' }}>
        <Grid item xs={6}>
            <Box sx={{ height: '100vh', overflow: 'auto' }}>
                {rootElement && <Element root store={rootElement} />}
            </Box>
        </Grid>
        <Grid container item sx={{ height: '100vh' }} xs={6} direction="column">
            <Grid item xs={6} sx={{ overflow: 'hidden' }}>
                <TaskQuery />
            </Grid>
            <Grid item xs={6} sx={{ overflow: 'hidden' }}>
                <Log />
            </Grid>
        </Grid>
    </Grid>
);

export default CDOImitator;
