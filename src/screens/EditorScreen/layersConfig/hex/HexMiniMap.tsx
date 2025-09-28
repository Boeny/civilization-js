import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';

import { EyeButton } from '../../components/EyeButton';
import { OpacityBar } from '../../components/OpacityBar';
import { IMiniMapProps } from '../types';

import { HEX_CONFIG } from './hexConfig';
import { useHexMapObservableStore } from './stores/hexMapStore';
import { getHexRadius } from './utils';

const MapComponent = ({ width, title }: IMiniMapProps) => {
    const [{ data }] = useHexMapObservableStore();

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
    const [{ data, isVisible, opacity }, setHexMap] = useHexMapObservableStore();

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
                        width={width}
                        title={title}
                    />
                )}
            </div>
        </>
    );
};
