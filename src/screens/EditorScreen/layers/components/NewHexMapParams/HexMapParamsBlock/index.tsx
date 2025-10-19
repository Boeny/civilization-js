import './styles.css';

import { Block } from 'components/Block';
import { NumberInput } from 'components/NumberInput';
import { IPoint } from 'types';

interface IProps {
    mapSize: IPoint;
    setMapSize: (size: IPoint) => void;
    onEnterKeyDown: () => void;
    isError: boolean;
    setError: (isError: boolean) => void;
}

export function HexMapParamsBlock({ mapSize, setMapSize, onEnterKeyDown, isError, setError }: IProps) {
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
                    value={mapSize.x}
                    onChange={(x) => setMapSize({ x, y: mapSize.y })}
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
                    value={mapSize.y}
                    onChange={(y) => setMapSize({ x: mapSize.x, y })}
                    onEnterKeyDown={onEnterKeyDown}
                    isError={isError}
                    setError={setError}
                />
            </Block>
        </Block>
    );
}
