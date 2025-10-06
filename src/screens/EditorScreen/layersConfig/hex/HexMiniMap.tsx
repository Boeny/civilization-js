import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';

import { EyeButton } from '../../components/EyeButton';
import { OpacityBar } from '../../components/OpacityBar';
import { IMiniMapProps } from '../types';

import { HEX_CONFIG } from './hexConfig';
import { NewHexMapParams } from './NewHexMapParams';
import { useHexMapStore } from './stores/hexMapStore';
import { HexMapData } from './types';
import { generateEmptyMapData, getHexRadius } from './utils';

type Props = {
    panelWidth: number;
    title: string;
    data: HexMapData;
};

const MiniMap = ({ panelWidth, title, data }: Props) => {
    const hexWidth = panelWidth / (data.width + 10);
    const hexRadius = getHexRadius(hexWidth);

    return (
        <Canvas
            title={title}
            width={panelWidth + hexWidth / 2}
            height={(3 * hexRadius * data.height) / 2 + hexRadius / 2}
            style={{ maxHeight: 170 }}
        >
            {(ctx) => {
                data.data.forEach((row, y) => {
                    row.forEach((type, x) => {
                        Hex({ ctx, position: { x, y }, width: hexWidth, radius: hexRadius, color: HEX_CONFIG[type].color });
                    });
                });
            }}
        </Canvas>
    );
};

const MiniMapWithParams = (props: Props) => {
    const {
        store: { isVisible, opacity },
        setStore: setHexMap,
    } = useHexMapStore();

    return (
        <>
            <div className="title">
                {props.title}
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

            <div className="mini-map">{isVisible && <MiniMap {...props} />}</div>
        </>
    );
};

export const HexMiniMap = ({ setMapCommonParams, ...props }: IMiniMapProps) => {
    const {
        store: { data, hexWidth },
        setStore: setHexMap,
    } = useHexMapStore();

    const handleSubmit = (width: number, height: number) => {
        setMapCommonParams(width * hexWidth, height * hexWidth);
        setHexMap({ data: new HexMapData(generateEmptyMapData(width, height)) });
    };

    return (
        <>
            {data && (
                <MiniMapWithParams
                    {...props}
                    data={data}
                />
            )}

            <div>
                <NewHexMapParams onSubmit={handleSubmit} />
            </div>
        </>
    );
};
