import { MenuItem } from 'components/Menu/MenuItem';
import { IEditorParamsMenuState } from 'types';

import { EditorParamsMenu } from './EditorParamsMenu';

interface IProps {
    itemName: string;
    onSubmit: (params: IEditorParamsMenuState) => void;
}
export const EditorParamsMenuItem = ({ itemName, onSubmit }: IProps) => {
    return (
        <MenuItem
            name={itemName}
            menuStyle={{ height: 383 }}
        >
            <EditorParamsMenu onSubmit={onSubmit} />
        </MenuItem>
    );
};
