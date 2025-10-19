import './styles.css';
import { useState } from 'react';

import { Block } from 'components/Block';
import { Button } from 'components/Button';
import { Canvas } from 'components/canvas/Canvas';
import { Radio } from 'components/Radio';
import { RadioItem } from 'components/Radio/RadioItem';
import { mapMovementParamsConfig } from 'hooks/useMapMoving/mapMovingStore';
import { MiniMapWrapper } from 'screens/EditorScreen/components/MiniMapWrapper';
import { IPoint, LAYER_TYPE } from 'types';
import { getVector, getZeroVector, vectorSub } from 'utils';

import { getMapsWithoutCurrent } from '../../config';
import { CREATE_MODE } from '../../hex/types';
import { IMiniMapProps } from '../../types';
import { getMapBorders, getFitScreenMapMovementParams, getSreenCenterMapMovementParams } from '../../utils';
import { useStore } from '../store';
import { uploadFile } from '../utils';

interface Props {
    panelWidth: number;
    title: string;
    map: HTMLImageElement;
    onClick?: (ctx: CanvasRenderingContext2D, point: IPoint) => void;
}

const MiniMapComponent = ({ map, title, onClick, panelWidth }: Props) => {
    const width = panelWidth - 29;
    const height = (width * map.height) / map.width;

    return (
        <Canvas
            id="image-minimap"
            title={title}
            width={width}
            height={height}
            style={{
                maxHeight: 170,
                cursor: 'pointer',
            }}
            onClick={onClick}
        >
            {(ctx) => ctx.drawImage(map, 0, 0, width, height)}
        </Canvas>
    );
};

// eslint-disable-next-line import/no-unused-modules
export const MiniMap = ({ screenSize, title, panelWidth, isSelected }: IMiniMapProps) => {
    const {
        store: { map },
        setStore,
    } = useStore();

    const [creationMode, setCreationMode] = useState(CREATE_MODE.center);

    const loadImage = async () => {
        const newMap = await uploadFile();

        if (!newMap) {
            return;
        }

        const otherExistingMaps = getMapsWithoutCurrent(LAYER_TYPE.image);
        const imageSize = getVector(newMap.width, newMap.height);

        // CREATE_MODE.free by default
        let newMapMovementParams = {
            zoom: 1,
            position: getZeroVector(),
        };

        if (creationMode === CREATE_MODE.fitScreen) {
            newMapMovementParams = getFitScreenMapMovementParams(screenSize.x, imageSize.x);
        }
        if (creationMode === CREATE_MODE.center) {
            newMapMovementParams = getSreenCenterMapMovementParams(screenSize, imageSize);
        }

        const {
            store: { zoom, position },
            setStore: setCommonMapMovementParams,
        } = mapMovementParamsConfig;

        if (otherExistingMaps.length > 0) {
            newMapMovementParams.zoom /= zoom;
            newMapMovementParams.position = vectorSub(newMapMovementParams.position, position);

            setStore({ map: newMap, ...newMapMovementParams });
            setCommonMapMovementParams({
                borders: getMapBorders(
                    imageSize,
                    otherExistingMaps.map(({ map }) => map),
                    newMapMovementParams.zoom,
                ),
            });
        } else {
            setStore({ map: newMap });
            setCommonMapMovementParams({ borders: imageSize, ...newMapMovementParams });
        }
    };

    const handleImageMiniMapClick = () => {
        if (isSelected) {
            loadImage();
        }
    };

    return (
        <MiniMapWrapper
            map={
                map && (
                    <MiniMapComponent
                        panelWidth={panelWidth}
                        title={isSelected ? 'Load new image' : title}
                        map={map}
                        onClick={handleImageMiniMapClick}
                    />
                )
            }
            title={title}
        >
            <div>
                <Radio
                    name="imageMapCreationMode"
                    value={creationMode}
                    onChange={setCreationMode}
                >
                    {(params) => (
                        <>
                            <RadioItem
                                {...params}
                                value={CREATE_MODE.fitScreen}
                                label="Fit the screen"
                            />
                            <RadioItem
                                {...params}
                                value={CREATE_MODE.center}
                                label="Screen center"
                            />
                            <RadioItem
                                {...params}
                                value={CREATE_MODE.free}
                                label="Free transform"
                            />
                        </>
                    )}
                </Radio>

                <Block
                    alignCenter
                    noPadding
                >
                    <Button onClick={loadImage}>Load Image</Button>
                </Block>
            </div>
        </MiniMapWrapper>
    );
};
