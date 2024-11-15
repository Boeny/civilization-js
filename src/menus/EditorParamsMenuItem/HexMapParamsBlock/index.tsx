import './styles.css';

import { Block } from 'components/Block';
import { NumberInput } from 'components/NumberInput';

interface IProps {
    setWidth: (v: number) => void;
    setHeight: (v: number) => void;
    onEnterKeyDown: () => void;
}
export function HexMapParamsBlock({ setWidth, setHeight, onEnterKeyDown }: IProps) {
    return (
        <Block bordered>
            <label>
                Width{' '}
                <NumberInput
                    autoFocus
                    defaultValue={100}
                    onChange={setWidth}
                    onEnterKeyDown={onEnterKeyDown}
                />
            </label>
            <label>
                Height{' '}
                <NumberInput
                    defaultValue={100}
                    onChange={setHeight}
                    onEnterKeyDown={onEnterKeyDown}
                />
            </label>
        </Block>
    );
}
