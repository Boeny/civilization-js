import './styles.css';

import { Block } from 'components/Block';
import { NumberInput } from 'components/NumberInput';

interface IProps {
    width: number;
    height: number;
    setWidth: (v: number) => void;
    setHeight: (v: number) => void;
    onEnterKeyDown: () => void;
    isError: boolean;
    setError: (isError: boolean) => void;
}

export function HexMapParamsBlock({ width, height, setWidth, setHeight, onEnterKeyDown, isError, setError }: IProps) {
    return (
        <Block bordered>
            <label>
                Width{' '}
                <NumberInput
                    autoFocus
                    value={width}
                    onChange={setWidth}
                    onEnterKeyDown={onEnterKeyDown}
                    isError={isError}
                    setError={setError}
                />
            </label>
            <label>
                Height{' '}
                <NumberInput
                    value={height}
                    onChange={setHeight}
                    onEnterKeyDown={onEnterKeyDown}
                    isError={isError}
                    setError={setError}
                />
            </label>
        </Block>
    );
}
