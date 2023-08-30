import { FunctionComponent, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';

import { AddButtonType } from './interfaces';

const AddButton: FunctionComponent<AddButtonType> = ({ title, defaultName, handleClick }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const handleOpen = () => {
        if (defaultName) {
            handleClick('');
        } else setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName('');
    };

    const handleConfirm = () => {
        handleClick(name);
        handleClose();
    };

    const handleChange = (event: any) => {
        setName(event.currentTarget.value);
    };

    return (
        <>
            <Button onClick={handleOpen}>{title}</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField onChange={handleChange} value={name} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm}>Ok</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddButton;
