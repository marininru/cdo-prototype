import { FunctionComponent } from 'react';

import { Box } from '@mui/material';
import Element from 'components/Element';

import { ChildElementsType } from 'components/interfaces';

const ChildElements: FunctionComponent<ChildElementsType> = ({
    childList,
    collapsed,
    addElement,
    removeElement
}) => {
    const hidden = collapsed ? { height: 0, overflow: 'hidden' } : {};

    return (
        <Box sx={{ ...{ ml: 4 }, ...hidden }}>
            {childList.map((child, index) => (
                <Element
                    key={child.name}
                    name={child.name}
                    addElement={addElement}
                    removeElement={() => removeElement(index)}
                />
            ))}
        </Box>
    );
};

export default ChildElements;
