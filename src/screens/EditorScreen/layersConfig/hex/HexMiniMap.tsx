import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';

import { EyeButton } from '../../components/EyeButton';
import { OpacityBar } from '../../components/OpacityBar';
import { IMiniMapProps } from '../types';

import { HEX_CONFIG } from './hexConfig';
import { NewHexMapParams } from './NewHexMapParams';
import { useHexMapObservableStore } from './stores/hexMapStore';
import { generateEmptyMapData, getHexRadius } from './utils';

const MiniMap = ({ width, title }: IMiniMapProps) => {
    const { data } = useHexMapObservableStore().store;

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

const MiniMapWithParams = ({ width, title }: IMiniMapProps) => {
    const {
        store: { isVisible, opacity },
        setStore: setHexMap,
    } = useHexMapObservableStore();

    return (
        <>
            <div className="title">
                {title}
                <EyeButton
                    isVisible={isVisible}
                    toggleVisible={() => setHexMap({ isVisible: !isVisible })}
                />
            </div>

            {isVisible && (
                <OpacityBar
                    opacity={opacity}
                    onChange={(newOpacity) => setHexMap({ opacity: newOpacity })}
                />
            )}

            <div className="mini-map">
                {isVisible && (
                    <MiniMap
                        width={width}
                        title={title}
                    />
                )}
            </div>
        </>
    );
};

export const HexMiniMap = (props: IMiniMapProps) => {
    const {
        store: { data },
        setStore: setHexMap,
    } = useHexMapObservableStore();

    return (
        <>
            {data && <MiniMapWithParams {...props} />}

            <div>
                <NewHexMapParams
                    onSubmit={(width, height) => {
                        setHexMap({ data: generateEmptyMapData(width, height) });
                    }}
                />
            </div>
        </>
    );
};
