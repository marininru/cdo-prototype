import { useState, FunctionComponent } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { TaskStatus, TaskStatusDescr } from 'common/TaskInterfaces';
import { ElementType } from './interfaces';

const NewStatusMenu: FunctionComponent<ElementType> = ({ store }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [open, setOpen] = useState(false);
    const { status, setStatus } = store;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSelectItem = (newStatus: TaskStatus) => {
        setStatus(newStatus);
        setOpen(false);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button'
                }}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
            >
                {TaskStatusDescr[status].allowed.map((St: TaskStatus) => (
                    <MenuItem key={St} onClick={() => onSelectItem(St)}>
                        {TaskStatusDescr[St].name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default NewStatusMenu;
