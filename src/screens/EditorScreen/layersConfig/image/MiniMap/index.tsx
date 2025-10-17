import './styles.css';
import { useState } from 'react';

import { Block } from 'components/Block';
import { Button } from 'components/Button';
import { Canvas } from 'components/canvas/Canvas';
import { Radio } from 'components/Radio';
import { RadioItem } from 'components/Radio/RadioItem';
import { mapMovementParamsConfig } from 'hooks/useMapMoving/mapMovingStore';
import { MiniMapWrapper } from 'screens/EditorScreen/components/MiniMapWrapper';
import { IPoint } from 'types';
import { getVector, vectorSub } from 'utils';

import { CREATE_MODE } from '../../hex/types';
import { IMiniMapProps } from '../../types';
import { getMapMovementParams, getMapBorders } from '../../utils';
import { useImageMapStore } from '../imageMapStore';
import { uploadFile } from '../Map/utils';

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

export const MiniMap = ({ screenSize, title, panelWidth, isSelected, otherExistingMaps }: IMiniMapProps) => {
    const {
        store: { map },
        setStore: setImageMap,
    } = useImageMapStore();

    const [creationMode, setCreationMode] = useState(CREATE_MODE.center);

    const loadImage = async () => {
        const newMap = await uploadFile();

        if (!newMap) {
            return;
        }

        const imageSize = getVector(newMap.width, newMap.height);
        const newMapMovementParams = getMapMovementParams(creationMode, screenSize, imageSize);

        const {
            store: { zoom, position },
            setStore: setCommonMapMovementParams,
        } = mapMovementParamsConfig;

        if (otherExistingMaps.length > 0) {
            const newZoom = newMapMovementParams.zoom / zoom;
            const newPosition = vectorSub(newMapMovementParams.position, position);

            setImageMap({ map: newMap, zoom: newZoom, position: newPosition });
            setCommonMapMovementParams({
                borders: getMapBorders(
                    imageSize,
                    otherExistingMaps.map(({ map }) => map),
                    newZoom,
                ),
            });
        } else {
            setImageMap({ map: newMap });
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
