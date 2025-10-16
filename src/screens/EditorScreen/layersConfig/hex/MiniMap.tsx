import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { mapMovementParamsConfig } from 'hooks/useMapMoving/mapMovingStore';
import { MiniMapWrapper } from 'screens/EditorScreen/components/MiniMapWrapper';
import { IPoint } from 'types';
import { getVector, vectorMult, vectorSub } from 'utils';

import { getMapMovementParams, getMapBorders } from '../Layers/utils';
import { IMiniMapProps } from '../types';

import { BRUSH_MAP } from './config';
import { HexMapData } from './models';
import { NewHexMapParams } from './NewHexMapParams';
import { useHexMapStore } from './stores/hexMapStore';
import { CREATE_MODE, HEX_TYPE } from './types';
import { generateEmptyMapData, getHexHeight } from './utils';

type Props = {
    panelWidth: number;
    title: string;
    map: HexMapData;
};

const MiniMapComponent = ({ panelWidth, title, map }: Props) => {
    const miniHexWidth = panelWidth / (map.rowLength + 10);
    const miniHexHeight = getHexHeight(miniHexWidth);

    return (
        <Canvas
            title={title}
            width={panelWidth + miniHexWidth / 2}
            height={(miniHexHeight + 1) * map.columnLength}
            style={{ maxHeight: 170 }}
        >
            {(ctx) => {
                map.data.forEach((row, y) => {
                    row.forEach((type, x) => {
                        Hex({ ctx, position: { x, y }, width: miniHexWidth, color: BRUSH_MAP[type].color });
                    });
                });
            }}
        </Canvas>
    );
};

export const MiniMap = ({ screenSize, title, panelWidth, otherExistingMaps }: IMiniMapProps) => {
    const {
        store: { map, isVisible, opacity },
        setStore: setHexMap,
    } = useHexMapStore();

    const handleSubmit = (mapSize: IPoint, creationMode: CREATE_MODE) => {
        const hexHeight = getHexHeight(HexMapData.hexWidth);
        const imageSize = vectorMult(mapSize, getVector(HexMapData.hexWidth, hexHeight));
        const newMapMovementParams = getMapMovementParams(creationMode, screenSize, imageSize);

        if (creationMode === CREATE_MODE.fitScreen) {
            // zoom = screen_height / (map_height * hex_height)
            // map_height = screen_height / (zoom * hex_height)
            mapSize.y = Math.floor(screenSize.y / (newMapMovementParams.zoom * hexHeight));
        }

        const newMap = new HexMapData(generateEmptyMapData(mapSize, HEX_TYPE.hill));

        const {
            store: { zoom, position },
            setStore: setCommonMapMovementParams,
        } = mapMovementParamsConfig;

        if (otherExistingMaps.length > 0) {
            const newZoom = newMapMovementParams.zoom * zoom;
            const newPosition = vectorSub(newMapMovementParams.position, position);

            setHexMap({ map: newMap, zoom: newZoom, position: newPosition });
            setCommonMapMovementParams({ borders: getMapBorders(newMap.imageSize, otherExistingMaps, newZoom) });
        } else {
            setHexMap({ map: newMap });
            setCommonMapMovementParams({ borders: newMap.imageSize, ...newMapMovementParams });
        }
    };

    return (
        <MiniMapWrapper
            isVisible={isVisible}
            setVisible={(value) => setHexMap({ isVisible: value })}
            opacity={opacity}
            setOpacity={(value) => setHexMap({ opacity: value })}
            map={
                map && (
                    <MiniMapComponent
                        panelWidth={panelWidth}
                        title={title}
                        map={map}
                    />
                )
            }
            title={title}
        >
            <div>
                <NewHexMapParams
                    hasOtherMaps={otherExistingMaps.length > 0}
                    onSubmit={handleSubmit}
                />
            </div>
        </MiniMapWrapper>
    );
};
