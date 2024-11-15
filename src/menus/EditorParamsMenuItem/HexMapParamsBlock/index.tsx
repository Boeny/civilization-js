import './styles.css';

import { Block } from 'components/Block';
import { NumberInput } from 'components/NumberInput';
import { IHexMapParams } from 'types';

interface IProps extends IHexMapParams {
    disabled?: boolean;
    setWidth: (v: number) => void;
    setHeight: (v: number) => void;
    onEnterKeyDown: () => void;
    checkValidity: (value: number) => boolean;
}
export function HexMapParamsBlock({ disabled, width, setWidth, height, setHeight, onEnterKeyDown, checkValidity }: IProps) {
    return (
        <Block bordered>
            <label>
                Width{' '}
                <NumberInput
                    disabled={disabled}
                    autoFocus
                    value={width}
                    onChange={setWidth}
                    onEnterKeyDown={onEnterKeyDown}
                    isError={!checkValidity(width)}
                />
            </label>
            <label>
                Height{' '}
                <NumberInput
                    disabled={disabled}
                    value={height}
                    onChange={setHeight}
                    onEnterKeyDown={onEnterKeyDown}
                    isError={!checkValidity(height)}
                />
            </label>
        </Block>
    );
}
