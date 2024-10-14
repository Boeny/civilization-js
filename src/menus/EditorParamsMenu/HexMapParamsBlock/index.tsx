import './styles.css';

import { Block } from 'components/Block';
import { NumberInput } from 'components/NumberInput';
import { IHexMapParams } from 'screens/EditorScreen/types';

import { checkSubmitValidityForField } from '../utils';

interface IParams extends IHexMapParams {
    disabled: boolean;
    setWidth: (v: number) => void;
    setHeight: (v: number) => void;
    setHexWidth: (v: number) => void;
    onEnterKeyDown: () => void;
}
export function HexMapParamsBlock({ disabled, width, setWidth, height, setHeight, hexWidth, setHexWidth, onEnterKeyDown }: IParams) {
    return (
        <Block bordered>
            <div>
                <label>
                    Width{' '}
                    <NumberInput
                        disabled={disabled}
                        autoFocus
                        value={width}
                        onChange={setWidth}
                        onEnterKeyDown={onEnterKeyDown}
                        isError={!checkSubmitValidityForField(width)}
                    />
                </label>
                <label>
                    Height{' '}
                    <NumberInput
                        disabled={disabled}
                        value={height}
                        onChange={setHeight}
                        onEnterKeyDown={onEnterKeyDown}
                        isError={!checkSubmitValidityForField(height)}
                    />
                </label>
            </div>
            <label>
                Hex width{' '}
                <NumberInput
                    disabled={disabled}
                    value={hexWidth}
                    onChange={setHexWidth}
                    onEnterKeyDown={onEnterKeyDown}
                    isError={!checkSubmitValidityForField(hexWidth)}
                />
            </label>
        </Block>
    );
}
