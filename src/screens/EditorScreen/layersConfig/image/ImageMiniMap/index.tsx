import './styles.css';
import { useState } from 'react';

import { Block } from 'components/Block';
import { Button } from 'components/Button';
import { Canvas } from 'components/canvas/Canvas';
import { Radio } from 'components/Radio';
import { RadioItem } from 'components/Radio/RadioItem';
import { IPoint } from 'types';
import { getVector, getZeroVector } from 'utils';

import { CREATE_MODE } from '../../hex/types';
import { IMiniMapProps } from '../../types';
import { uploadFile } from '../ImageMap/utils';
import { useImageMapStore } from '../imageMapStore';

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

export const ImageMiniMap = ({ screenSize, title, panelWidth, isSelected, setMapCommonParams }: IMiniMapProps) => {
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

        let movingParams;

        if (creationMode === CREATE_MODE.fitScreen) {
            movingParams = {
                zoom: screenSize.x / newMap.width,
                position: getZeroVector(),
            };
        }

        setMapCommonParams(getVector(newMap.width, newMap.height), movingParams);
        setImageMap({ map: newMap });
    };

    const handleImageMiniMapClick = () => {
        if (isSelected) {
            loadImage();
        }
    };

    return (
        <>
            {map && (
                <MiniMapComponent
                    panelWidth={panelWidth}
                    title={isSelected ? 'Load new image' : title}
                    map={map}
                    onClick={handleImageMiniMapClick}
                />
            )}
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
        </>
    );
};
