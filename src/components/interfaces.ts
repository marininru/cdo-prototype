import { ButtonProps } from '@mui/material';
import ElementStore from '../store/ElementStore';

export type ChildType = {
    title: string;
    color?: string;
};

export interface ElementType {
    store: ElementStore;
    root?: boolean;
    addElement?: (name: string) => unknown;
    removeElement?: () => unknown;
}

export interface AddButtonType extends Omit<ButtonProps, 'button'> {
    title: string;
    icon?: boolean;
    defaultName?: boolean;
    handleClick: (name: string) => unknown;
}

export interface ChildElementsType {
    childList: string[];
    collapsed: boolean;
}

export interface ColorSwitcherType {
    color: string;
    setColor: (color: string) => unknown;
}
