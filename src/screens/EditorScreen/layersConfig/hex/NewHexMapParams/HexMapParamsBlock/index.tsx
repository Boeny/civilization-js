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
        <Block
            noPadding
            alignCenter
            style={{ fontSize: 14, margin: 0 }}
        >
            <Block
                alignedVertically
                noPadding
                style={{ marginRight: 5 }}
            >
                <div>width</div>
                <NumberInput
                    className="small"
                    autoFocus
                    value={width}
                    onChange={setWidth}
                    onEnterKeyDown={onEnterKeyDown}
                    isError={isError}
                    setError={setError}
                />
            </Block>
            <Block
                alignedVertically
                noPadding
                style={{ marginLeft: 5 }}
            >
                <div>height</div>
                <NumberInput
                    className="small"
                    value={height}
                    onChange={setHeight}
                    onEnterKeyDown={onEnterKeyDown}
                    isError={isError}
                    setError={setError}
                />
            </Block>
        </Block>
    );
}
