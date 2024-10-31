import { Block } from 'components/Block';
import { MenuItem } from 'components/Menu/MenuItem';

interface IProps {
    onApply: () => void;
}
export function OptionsMenu({ onApply }: IProps) {
    return (
        <>
            <MenuItem
                name="Back"
                action="back"
            />

            <Block />

            <MenuItem
                name="Apply"
                onClick={onApply}
                action="back"
            />
        </>
    );
}
