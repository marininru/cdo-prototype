import { FunctionComponent, useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import { Box, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

import AddButton from './AddButton';

import { ElementType } from './interfaces';
import ChildElements from './ChildElements';

const Element: FunctionComponent<ElementType> = observer(({ store, root }) => {
    const {
        title,
        value,
        completed,
        color,
        setValue,
        addChild,
        childStore,
        removeCurrent,
        setStatus,
        getChildrenExists,
        getChildrenCompleted
    } = store;

    const [localVal, setLocalVal] = useState(`${value}` || '');
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        setLocalVal(`${value}`);
    }, [value]);

    const handleValue = (event: any) => {
        setLocalVal(event.currentTarget.value);
    };

    const handleConfirm = () => {
        if (`${value}` !== localVal) setValue(localVal);
    };

    const handleChangeStatus = () => {
        setStatus(!completed);
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
                            p: 2,
                            border: `solid 3px ${color}`
                        }}
                    >
                        <Grid container spacing={1}>
                            <Grid item alignSelf="center" xs={root ? 3 : 1}>
                                <Typography>{title}</Typography>
                            </Grid>
                            <Grid item xs={root ? 5 : 5}>
                                <TextField
                                    size="small"
                                    value={localVal}
                                    onChange={handleValue}
                                    type="number"
                                    onBlur={handleConfirm}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    color={completed ? 'primary' : 'success'}
                                    onClick={handleChangeStatus}
                                    disabled={getChildrenExists() && !getChildrenCompleted()}
                                >
                                    {completed ? <TaskAltIcon /> : <RadioButtonUncheckedIcon />}
                                </IconButton>
                            </Grid>
                            <Grid item xs={2}>
                                <AddButton
                                    icon
                                    defaultName
                                    title="Add child"
                                    handleClick={handleAddChild}
                                />
                            </Grid>
                            {!root && (
                                <Grid item xs={2}>
                                    <IconButton color="error" onClick={handleRemove}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            )}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <ChildElements collapsed={collapsed} childList={childStore} />
        </Box>
    );
});

export default Element;
