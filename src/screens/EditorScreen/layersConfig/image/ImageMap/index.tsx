import './styles.css';

import { useCallback, useEffect, useState } from 'react';

import { Canvas } from 'components/canvas/Canvas';
import { useArrowKeys } from 'hooks/useArrowKeys';
import { useWheel } from 'hooks/useWheel';
import { IPoint } from 'types';
import { getZeroVector, vectorDiv, vectorMult, vectorSub, vectorSum } from 'utils';

import { IMapProps } from '../../types';
import { useImageMapObservableStore } from '../imageMapStore';

import { ZOOM_CONFIG } from './config';
import { LoadImageButton } from './LoadImageButton';
import { clampImageWidth, clampImageSize, getZoomImageOffset } from './utils';

const KEY_PAN_SPEED = 40;
const screenSize: IPoint = {
    x: window.innerWidth,
    y: window.innerHeight,
};
const BORDER_SIZE = getZeroVector();

function applyZoom({
    dz,
    point,
    zoom,
    position,
    imageSize,
    originalImageSize,
}: {
    dz: number;
    point: IPoint;
    zoom: number;
    position: IPoint;
    imageSize: IPoint;
    originalImageSize: IPoint;
}): { zoom: number; position: IPoint } | null {
    const newImageSize = {
        x: clampImageWidth(imageSize.x, dz),
        y: originalImageSize.y,
    };
    const newZoom = newImageSize.x / originalImageSize.x;

    if (zoom === newZoom) {
        return null;
    }

    newImageSize.y *= newZoom;

    const offset = getZoomImageOffset(vectorSub(point, position), imageSize, newImageSize);

    return {
        zoom: newZoom,
        position: clampImageSize(vectorSub(position, offset), newImageSize, screenSize, BORDER_SIZE),
    };
}

const container = {
    setClampedPosition: (_v: IPoint) => {},
};

interface IProps extends IMapProps {
    data: HTMLImageElement;
}

const ImageMapComponent = ({ data, zIndex }: IProps) => {
    const {
        store: { zoom, position },
        setStore: setImageMap,
    } = useImageMapObservableStore();

    const originalImageSize: IPoint = {
        x: data.width,
        y: data.height,
    };
    const imageSize = vectorMult(originalImageSize, zoom);

    container.setClampedPosition = (delta) => {
        setImageMap({
            position: clampImageSize(vectorSum(position, delta), imageSize, screenSize, BORDER_SIZE),
        });
    };

    const useWheelCallback = useCallback(
        (e: WheelEvent) => {
            if (!e.ctrlKey) {
                container.setClampedPosition(vectorMult({ x: e.deltaX, y: e.deltaY }, -5)); // DELTA! - making pan

                return;
            }

            const newZoomParams = applyZoom({
                dz: e.deltaY,
                point: { x: e.offsetX, y: e.offsetY }, // OFSSET! - making zoom
                zoom,
                position,
                imageSize,
                originalImageSize,
            });

            if (newZoomParams) {
                setImageMap(newZoomParams);
            }
        },
        [zoom, position],
    );

    useWheel(useWheelCallback);

    const [isUpPressed, setUpPressed] = useState(false);
    const [isDownPressed, setDownPressed] = useState(false);
    const [isLeftPressed, setLeftPressed] = useState(false);
    const [isRightPressed, setRightPressed] = useState(false);

    useArrowKeys({ setUpPressed, setDownPressed, setLeftPressed, setRightPressed });

    useEffect(() => {
        if (isUpPressed || isDownPressed || isLeftPressed || isRightPressed) {
            requestAnimationFrame(() => {
                const delta = getZeroVector();

                if (isUpPressed) {
                    delta.y = KEY_PAN_SPEED;
                }
                if (isDownPressed) {
                    delta.y = -KEY_PAN_SPEED;
                }
                if (isLeftPressed) {
                    delta.x = KEY_PAN_SPEED;
                }
                if (isRightPressed) {
                    delta.x = -KEY_PAN_SPEED;
                }
                container.setClampedPosition(delta);
            });
        }
    }, [position, isDownPressed, isLeftPressed, isRightPressed, isUpPressed]);

    return (
        <Canvas
            id="image-map"
            width={screenSize.x}
            height={screenSize.y}
            style={{ zIndex }}
        >
            {(ctx: CanvasRenderingContext2D) => {
                ctx.clearRect(0, 0, screenSize.x, screenSize.y);
                ctx.drawImage(data, position.x, position.y, imageSize.x, imageSize.y);
            }}
        </Canvas>
    );
};

export function ImageMap(props: IMapProps) {
    const { isEditable, zIndex } = props;

    const {
        store: { data },
        setStore: setImageMap,
    } = useImageMapObservableStore();

    if (!data) {
        return (
            <div
                id="image-map"
                style={{ height: 'calc(100% - 32px)', zIndex }}
            >
                <LoadImageButton
                    disabled={!isEditable}
                    onDataUpdate={(newData) => {
                        const initialZoom = ZOOM_CONFIG.minWidth / newData.width; // set minimal size
                        const newDataSize = {
                            x: newData.width,
                            y: newData.height,
                        };

                        setImageMap({
                            data: newData,
                            zoom: initialZoom,
                            // set in the center of the creen
                            position: vectorDiv(vectorSub(screenSize, vectorMult(newDataSize, initialZoom)), 2),
                        });
                    }}
                />
            </div>
        );
    }

    return (
        <ImageMapComponent
            key={data.src}
            {...props}
            data={data}
        />
    );
}
