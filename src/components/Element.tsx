import { FunctionComponent, useState } from 'react';

import { Box, Grid, IconButton, Paper, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

import AddButton from 'components/AddButton';

type ChildType = {
    name: string;
    color?: string;
};

interface ElementType {
    name: string;
    root?: boolean;
    addElement?: (name: string) => unknown;
    removeElement?: () => unknown;
}

const Element: FunctionComponent<ElementType> = ({ name, root, addElement, removeElement }) => {
    const [children, setChildren] = useState<ChildType[]>([]);
    const [collapsed, setCollapsed] = useState(false);

    const handleAddChild = (childName: string) => {
        const tmp = [...children];
        tmp.push({ name: childName });

        setChildren(tmp);
    };

    const handleAddElement = (elementName: string) => {
        addElement && addElement(elementName);
    };

    const handleRemoveChild = (remIdx: number) => {
        const tmp = [...children];

        setChildren(
            tmp.filter((val, idx) => {
                console.log(idx);
                return idx !== remIdx;
            })
        );
    };

    return (
        <Box>
            <Grid sx={{ m: 4 }} container>
                {!root && (
                    <Grid item>
                        <IconButton
                            onClick={() => setCollapsed(val => !val)}
                            disabled={!children.length}
                        >
                            {!collapsed ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
                        </IconButton>
                    </Grid>
                )}
                <Grid item>
                    <Paper sx={{ position: 'relative', width: 250, p: 3 }}>
                        <Typography sx={{ margin: 'auto' }}>{name}</Typography>
                        <AddButton title="Add child" onClick={handleAddChild} />
                        {!root && <AddButton title="Add element" onClick={handleAddElement} />}
                        {!root && (
                            <IconButton
                                color="error"
                                sx={{ position: 'absolute', top: 0, right: 0, m: 1 }}
                                onClick={removeElement}
                            >
                                <DeleteIcon />
                            </IconButton>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            {!collapsed && (
                <Box sx={{ ml: 4 }}>
                    {children.map((child, index) => (
                        <Element
                            key={child.name}
                            name={child.name}
                            addElement={handleAddChild}
                            removeElement={() => handleRemoveChild(index)}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Element;
