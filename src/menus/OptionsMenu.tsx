import { Block } from 'components/Block';
import { MenuItem } from 'components/Menu/MenuItem';

interface IProps {
    onApply: () => void;
}
export function OptionsMenu({ onApply }: IProps) {
    return (
        <>
            <MenuItem
                title="Back"
                action="back"
            />

            <Block />

            <MenuItem
                title="Apply"
                onClick={onApply}
                action="back"
            />
        </>
    );
}
