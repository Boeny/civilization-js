import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { generateEmptyMapData, getHexHeight } from 'hexUtils';
import { mapMovementParamsConfig } from 'hooks/useMapMoving/mapMovingStore';
import { IPoint, LAYER_TYPE } from 'types';
import { getVector, getZeroVector, vectorMult, vectorSub } from 'utils';

import { BRUSH_MAP } from '../components/HexBrushes/config';
import { MiniMapWrapper } from '../components/MiniMapWrapper';
import { NewHexMapParams } from '../components/NewHexMapParams';
import { getMapsWithoutCurrent } from '../config';
import { HexMapData } from '../models';
import { IMiniMapProps, CREATE_MODE, HEX_TYPE } from '../types';
import { getMapBorders, getFitScreenMapMovementParams, getSreenCenterMapMovementParams } from '../utils';

import { useStore } from './store';

type Props = {
    panelWidth: number;
    title: string;
    map: HexMapData<HEX_TYPE>;
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

// eslint-disable-next-line import/no-unused-modules
export const MiniMap = ({ isSelected, screenSize, title, panelWidth, onMapCreate, createMapKeyBinding }: IMiniMapProps) => {
    const {
        store: { map, isVisible, opacity, hasImageMap },
        setStore,
    } = useStore();

    const handleSubmit = (mapSize: IPoint, creationMode: CREATE_MODE, shouldCreateWaterMap: boolean) => {
        const otherExistingMaps = getMapsWithoutCurrent(LAYER_TYPE.height);
        const imageMap = otherExistingMaps.find(({ type }) => type === LAYER_TYPE.image);
        const hexHeight = getHexHeight(HexMapData.hexWidth);
        const currentHexImageSize = vectorMult(mapSize, getVector(HexMapData.hexWidth, hexHeight));

        // CREATE_MODE.free by default
        let newMapMovementParams = {
            zoom: 1,
            position: getZeroVector(),
        };

        // adapt map height with screen height
        if (creationMode === CREATE_MODE.fitScreen) {
            newMapMovementParams = getFitScreenMapMovementParams(screenSize.x, currentHexImageSize.x);
            // zoom = screen_height / hex_image_height = screen_width / hex_image_width
            // zoom = screen_height / (map_height * hex_height)
            // map_height = screen_height / (zoom * hex_height)
            mapSize.y = Math.floor(screenSize.y / (newMapMovementParams.zoom * hexHeight));
        }
        if (creationMode === CREATE_MODE.center) {
            newMapMovementParams = getSreenCenterMapMovementParams(screenSize, currentHexImageSize);
        }

        const setCommonMapMovementParams = mapMovementParamsConfig.setStore;

        if (otherExistingMaps.length === 0) {
            const newMap = new HexMapData<HEX_TYPE>(generateEmptyMapData(mapSize, HEX_TYPE.hill));
            setStore({ map: newMap });
            setCommonMapMovementParams({ borders: newMap.imageSize, ...newMapMovementParams });
            onMapCreate({ shouldCreateWaterMap });

            return;
        }

        const { zoom, position } = mapMovementParamsConfig.store;

        // adapt map height with image height
        if (creationMode === CREATE_MODE.fitImage && imageMap) {
            // zoom = image_height / hex_image_height = screen_width / hex_image_width
            // zoom = image_height / (map_height * hex_height)
            // map_height = image_height / (image_zoom * hex_height)
            newMapMovementParams.zoom = (imageMap.map.width * imageMap.zoom) / (mapSize.x * HexMapData.hexWidth);
            mapSize.y = Math.floor((imageMap.map.height * imageMap.zoom) / (newMapMovementParams.zoom * hexHeight));
            // the same as image
            newMapMovementParams.position = imageMap.position;
        } else {
            newMapMovementParams.zoom /= zoom;
            newMapMovementParams.position = vectorSub(newMapMovementParams.position, position);
        }

        const newMap = new HexMapData<HEX_TYPE>(generateEmptyMapData(mapSize, HEX_TYPE.hill));
        setStore({ map: newMap, ...newMapMovementParams });
        setCommonMapMovementParams({
            borders: getMapBorders(
                newMap.imageSize,
                otherExistingMaps.map(({ map }) => map),
                newMapMovementParams.zoom,
            ),
        });
        onMapCreate({ shouldCreateWaterMap });
    };

    return (
        <MiniMapWrapper
            isVisible={isVisible}
            setVisible={(value) => setStore({ isVisible: value })}
            opacity={opacity}
            setOpacity={(value) => setStore({ opacity: value })}
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
                    isSelected={isSelected}
                    hasImageMap={hasImageMap}
                    onSubmit={handleSubmit}
                    createMapKeyBinding={createMapKeyBinding}
                />
            </div>
        </MiniMapWrapper>
    );
};
