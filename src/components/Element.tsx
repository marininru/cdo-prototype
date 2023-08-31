import { FunctionComponent, useState } from 'react';
import { observer } from 'mobx-react';

import { Box, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

import AddButton from './AddButton';

import { ElementType } from './interfaces';
import ChildElements from './ChildElements';
import ColorSwitcher from './ColorSwither';

const Element: FunctionComponent<ElementType> = observer(({ store, root }) => {
    const { title, value, sum, color, setValue, addChild, childStore, removeCurrent, setColor } =
        store;

    const [localVal, setLocalVal] = useState(`${value}` || '');
    const [collapsed, setCollapsed] = useState(false);

    const handleValue = (event: any) => {
        setLocalVal(event.currentTarget.value);
    };

    const handleConfirm = () => {
        if (`${value}` !== localVal) setValue(localVal);
    };

    const handleAddChild = (childTitle?: string) => {
        addChild(childTitle);
    };

    const handleRemove = () => {
        removeCurrent();
    };

    return (
        <Box>
            <Grid sx={{ m: 4 }} container>
                {!root && (
                    <Grid item>
                        <IconButton
                            onClick={() => setCollapsed(val => !val)}
                            disabled={!childStore.length}
                        >
                            {!collapsed ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
                        </IconButton>
                    </Grid>
                )}
                <Grid item>
                    <Paper
                        sx={{
                            position: 'relative',
                            width: 250,
                            p: 3,
                            border: `solid 3px ${color}`
                        }}
                    >
                        <Typography>{title}</Typography>
                        <Typography>{`Sum: ${sum}`}</Typography>
                        {!root && (
                            <Grid container>
                                <Grid item xs={10}>
                                    <TextField
                                        size="small"
                                        value={localVal}
                                        onChange={handleValue}
                                        type="number"
                                        onBlur={handleConfirm}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton onClick={handleConfirm}>
                                        <CheckIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        )}
                        <ColorSwitcher color={color} setColor={setColor} />
                        <AddButton defaultName title="Add child" handleClick={handleAddChild} />
                        {!root && (
                            <IconButton
                                color="error"
                                sx={{ position: 'absolute', top: 0, right: 0, m: 1 }}
                                onClick={handleRemove}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <ChildElements collapsed={collapsed} childList={childStore} />
        </Box>
    );
});

export default Element;
