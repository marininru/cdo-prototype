import { FunctionComponent, useState } from 'react';

import {
    Button,
    ButtonProps,
    Dialog,
    DialogActions,
    DialogContent,
    TextField
} from '@mui/material';

interface AddButtonType extends Omit<ButtonProps, 'button'> {
    title: string;
    onClick: (name: string) => unknown;
}

const AddButton: FunctionComponent<AddButtonType> = ({ title, onClick }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName('');
    };

    const handleConfirm = () => {
        onClick(name);
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
