import { FunctionComponent, useState, MouseEvent } from 'react';

import { Box } from '@mui/material';

import { SketchPicker } from 'react-color';

import { ColorSwitcherType } from './interfaces';

const ColorSwitcher: FunctionComponent<ColorSwitcherType> = ({ color, setColor }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (newColor: any) => {
        setColor(newColor.hex);
    };

    return (
        <>
            <Box
                sx={{
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    m: 2
                }}
                onClick={handleClick}
            >
                <Box
                    sx={{
                        width: 36,
                        height: 13,
                        borderRadius: '2px',
                        background: color
                    }}
                />
            </Box>
            {open && (
                <Box sx={{ position: 'absolute', zIndex: 2, top: 0, left: 0, m: 2 }}>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0
                        }}
                        onClick={handleClose}
                    />
                    <SketchPicker color={color} onChange={handleChange} />
                </Box>
            )}
        </>
    );
};

export default ColorSwitcher;
