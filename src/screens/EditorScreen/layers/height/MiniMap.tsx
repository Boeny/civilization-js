import { useCallback } from 'react';

import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { generateEmptyMapData, getHexHeight } from 'hexUtils';
import { mapMovementParamsConfig } from 'hooks/useMapMoving/mapMovingStore';
import { IPoint, LAYER_TYPE } from 'types';
import { getVector, getZeroVector, vectorMult, vectorSub } from 'utils';

import { BarWithTitle } from '../components/BarWithTitle';
import { BRUSH_MAP } from '../components/HexBrushes/config';
import { brushStoreConfig } from '../components/HexBrushes/store';
import { MiniMapWrapper } from '../components/MiniMapWrapper';
import { NewHexMapParams } from '../components/NewHexMapParams';
import { getMapsWithoutCurrent } from '../config';
import { HexMapData } from '../models';
import { IMiniMapProps, CREATE_MODE, HEX_TYPE } from '../types';
import { getHexMiniMapSize, getMapBorders, getFitScreenMapMovementParams, getSreenCenterMapMovementParams } from '../utils';

import { useStore } from './store';

const MAX_BRUSH_SIZE = 10;

type Props = {
    panelWidth: number;
    title: string;
    map: HexMapData<HEX_TYPE>;
};

const MiniMapComponent = ({ panelWidth, title, map }: Props) => {
    const { width, height, hexWidth } = getHexMiniMapSize(panelWidth, map);

    return (
        <Canvas
            title={title}
            width={width}
            height={height}
        >
            {(ctx) => {
                ctx.clearRect(0, 0, width, height);

                map.data.forEach((row, y) => {
                    row.forEach((type, x) => {
                        Hex({ ctx, position: { x, y }, width: hexWidth, color: BRUSH_MAP[type].color });
                    });
                });
            }}
        </Canvas>
    );
};

// eslint-disable-next-line import/no-unused-modules
export const MiniMap = ({ isSelected, screenSize, title, panelWidth, onMapCreate, createMapKeyBinding }: IMiniMapProps) => {
    const {
        store: { map, isVisible, hasImageMap },
        setStore,
    } = useStore();

    const handleSubmit = useCallback(
        (mapSize: IPoint, creationMode: CREATE_MODE, shouldCreateWaterMap: boolean) => {
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
                const zoomedHexHeight = newMapMovementParams.zoom * hexHeight;
                mapSize.y = Math.floor(screenSize.y / zoomedHexHeight);

                if (mapSize.y === 0) {
                    mapSize.y = 1;
                }
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
        },
        [screenSize],
    );

    return (
        <MiniMapWrapper
            isVisible={isVisible}
            setVisible={(value) => setStore({ isVisible: value })}
            setOpacity={(value) => setStore({ opacity: value })}
            map={
                map && (
                    <>
                        <BarWithTitle
                            title="brush size"
                            round
                            min={1}
                            max={MAX_BRUSH_SIZE}
                            defaultValue={1}
                            onChange={(newSize) => brushStoreConfig.setStore({ size: newSize })}
                        />
                        <MiniMapComponent
                            panelWidth={panelWidth}
                            title={title}
                            map={map}
                        />
                    </>
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
