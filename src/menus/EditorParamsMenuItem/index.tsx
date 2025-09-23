import { MenuItem } from 'components/Menu/MenuItem';

import { EditorParamsMenu } from './EditorParamsMenu';

interface IProps {
    title: string;
}
export const EditorParamsMenuItem = ({ title }: IProps) => {
    return (
        <MenuItem
            title={title}
            menuStyle={{ height: 383 }}
        >
            <EditorParamsMenu />
        </MenuItem>
    );
};
