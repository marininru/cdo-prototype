import { ButtonProps } from '@mui/material';

export type ChildType = {
    name: string;
    color?: string;
};

export interface ElementType {
    name: string;
    root?: boolean;
    addElement?: (name: string) => unknown;
    removeElement?: () => unknown;
}

export interface AddButtonType extends Omit<ButtonProps, 'button'> {
    title: string;
    onClick: (name: string) => unknown;
}

export interface ChildElementsType {
    childList: ChildType[];
    collapsed: boolean;
    addElement?: (name: string) => unknown;
    removeElement?: () => unknown;
}
