import { FunctionComponent } from 'react';

import { Box } from '@mui/material';
import Element from './Element';

import { ChildElementsType } from './interfaces';
import ElementStore from '../store/ElementStore';

const ChildElements: FunctionComponent<ChildElementsType> = ({ childList, collapsed }) => {
    const hidden = collapsed ? { height: 0, overflow: 'hidden' } : {};

    return (
        <Box sx={{ ...{ ml: 4 }, ...hidden }}>
            {childList.map((store: ElementStore, index: number) => (
                <Element key={index} store={store} />
            ))}
        </Box>
    );
};

export default ChildElements;
