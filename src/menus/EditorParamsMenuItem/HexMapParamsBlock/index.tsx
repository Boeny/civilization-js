import './styles.css';

import { Block } from 'components/Block';
import { NumberInput } from 'components/NumberInput';
import { IHexMapParams } from 'types';

interface IProps extends IHexMapParams {
    setWidth: (v: number) => void;
    setHeight: (v: number) => void;
    onEnterKeyDown: () => void;
}
export function HexMapParamsBlock({ width, height, setWidth, setHeight, onEnterKeyDown }: IProps) {
    return (
        <Block bordered>
            <label>
                Width{' '}
                <NumberInput
                    autoFocus
                    value={width}
                    onChange={setWidth}
                    onEnterKeyDown={onEnterKeyDown}
                />
            </label>
            <label>
                Height{' '}
                <NumberInput
                    value={height}
                    onChange={setHeight}
                    onEnterKeyDown={onEnterKeyDown}
                />
            </label>
        </Block>
    );
}
