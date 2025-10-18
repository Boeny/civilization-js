import { Block } from 'components/Block';
import { MenuItem } from 'components/Menu/MenuItem';

interface IProps {
    onPlay: () => void;
}
export function NewGameMenu({ onPlay }: IProps) {
    return (
        <>
            <MenuItem
                title="Back"
                action="back"
            />

            <Block />

            <MenuItem
                title="Play"
                onClick={onPlay}
            />
        </>
    );
}
