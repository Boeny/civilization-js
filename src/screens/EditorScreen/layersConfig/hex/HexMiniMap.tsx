import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { IPoint } from 'types';
import { getVector, getZeroVector } from 'utils';

import { EyeButton } from '../../components/EyeButton';
import { OpacityBar } from '../../components/OpacityBar';
import { IMiniMapProps } from '../types';

import { HEX_CONFIG } from './hexConfig';
import { HexMapData } from './models';
import { NewHexMapParams } from './NewHexMapParams';
import { useHexMapStore } from './stores/hexMapStore';
import { CREATE_MODE } from './types';
import { generateEmptyMapData, getHexHeight, getHexRadius } from './utils';

type Props = {
    panelWidth: number;
    title: string;
    map: HexMapData;
};

const MiniMapComponent = ({ panelWidth, title, map }: Props) => {
    const { isVisible } = useHexMapStore().store;
    if (!isVisible) {
        return null;
    }

    const miniHexWidth = panelWidth / (map.rowLength + 10);
    const miniHexRadius = getHexRadius(miniHexWidth);
    const miniHexHeight = getHexHeight(miniHexRadius);

    return (
        <Canvas
            title={title}
            width={panelWidth + miniHexWidth / 2}
            height={miniHexHeight * map.columnLength + miniHexRadius / 2}
            style={{ maxHeight: 170 }}
        >
            {(ctx) => {
                map.data.forEach((row, y) => {
                    row.forEach((type, x) => {
                        Hex({ ctx, position: { x, y }, width: miniHexWidth, radius: miniHexRadius, color: HEX_CONFIG[type].color });
                    });
                });
            }}
        </Canvas>
    );
};

const MiniMapParams = ({ title }: { title: string }) => {
    const {
        store: { isVisible, opacity },
        setStore: setHexMap,
    } = useHexMapStore();

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
        </>
    );
};

export const HexMiniMap = ({ screenSize, title, panelWidth, otherExistingMapsCount, setMapCommonParams }: IMiniMapProps) => {
    const {
        store: { map },
        setStore: setHexMap,
    } = useHexMapStore();

    const handleSubmit = (mapSize: IPoint, creationMode: CREATE_MODE) => {
        let movingParams;

        if (creationMode === CREATE_MODE.fitScreen) {
            const zoom = screenSize.x / (mapSize.x * HexMapData.hexWidth);
            const hexHeight = getHexHeight(getHexRadius(HexMapData.hexWidth));
            mapSize.y = Math.floor(screenSize.y / (zoom * hexHeight));

            movingParams = {
                zoom,
                position: getZeroVector(),
            };
        }

        const newMap = new HexMapData(generateEmptyMapData(mapSize));
        const newImageSize = getVector(newMap.width, newMap.height);

        setMapCommonParams(newImageSize, movingParams);
        setHexMap({ map: newMap });
    };

    return (
        <>
            {map && (
                <>
                    <MiniMapParams title={title} />
                    <div className="mini-map">
                        <MiniMapComponent
                            panelWidth={panelWidth}
                            title={title}
                            map={map}
                        />
                    </div>
                </>
            )}

            <div>
                <NewHexMapParams
                    hasOtherMaps={otherExistingMapsCount > 0}
                    onSubmit={handleSubmit}
                />
            </div>
        </>
    );
};
