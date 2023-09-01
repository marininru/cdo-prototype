import { FunctionComponent } from 'react';

import { Box } from '@mui/material';
import Element from './Element';

import { ChildElementsType } from './interfaces';
import ElementTreeStore from '../store/ElementTreeStore';

const ChildElements: FunctionComponent<ChildElementsType> = ({ childList, collapsed }) => {
    const hidden = collapsed ? { height: 0, overflow: 'hidden' } : {};

    return (
        <Box sx={{ ...{ ml: 4 }, ...hidden }}>
            {childList.map((guid: string, index: number) => {
                const elementStore = ElementTreeStore.getElement(guid);

                return elementStore ? <Element key={index} store={elementStore} /> : null;
            })}
        </Box>
    );
};

export default ChildElements;
