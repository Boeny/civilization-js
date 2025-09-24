import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { IPoint } from 'types';

import { EyeButton } from '../../components/EyeButton';
import { OpacityBar } from '../../components/OpacityBar';
import { IMiniMapProps } from '../types';

import { HEX_CONFIG } from './hexConfig';
import { useHexMapObservableStore } from './hexMapStore';
import { HexMapData } from './types';
import { getHexRadius } from './utils';

interface IProps extends IMiniMapProps {
    data: HexMapData;
    zoom: number;
    position: IPoint;
}
const MapComponent = ({ data, width, title }: IProps) => {
    if (!data?.length) {
        return null;
    }

    const hexWidth = width / (data[0].length + 10);
    const hexRadius = getHexRadius(hexWidth);

    return (
        <Canvas
            title={title}
            width={width + hexWidth / 2}
            height={(3 * hexRadius * data.length) / 2 + hexRadius / 2}
            style={{ maxHeight: 170 }}
        >
            {(ctx) => {
                data.forEach((row, y) => {
                    row.forEach((type, x) => {
                        Hex({ ctx, position: { x, y }, width: hexWidth, radius: hexRadius, color: HEX_CONFIG[type].color });
                    });
                });
            }}
        </Canvas>
    );
};

export const HexMiniMap = ({ width, title }: IMiniMapProps) => {
    const [{ data, isVisible, opacity, zoom, position }, setHexMap] = useHexMapObservableStore();

    return (
        <>
            <div className="title">
                {title}
                {data && (
                    <EyeButton
                        isVisible={isVisible}
                        toggleVisible={() => setHexMap({ isVisible: !isVisible })}
                    />
                )}
            </div>

            {data && isVisible && (
                <OpacityBar
                    opacity={opacity}
                    onChange={(o) => setHexMap({ opacity: o })}
                />
            )}

            <div className="mini-map">
                {data && isVisible && (
                    <MapComponent
                        data={data}
                        width={width}
                        title={title}
                        zoom={zoom}
                        position={position}
                    />
                )}
            </div>
        </>
    );
};
