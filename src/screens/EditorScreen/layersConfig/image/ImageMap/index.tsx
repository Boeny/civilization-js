import './styles.css';

import { useEffect, useState } from 'react';

import { Canvas } from 'components/canvas/Canvas';
import { useArrowKeys } from 'hooks/useArrowKeys';
import { useWheel } from 'hooks/useWheel';

import { IMapProps } from '../../types';
import { useImageMapObservableStore } from '../imageMapStore';

import { zoomConfig } from './config';
import { LoadImageButton } from './LoadImageButton';
import { clampCoordinate, clampImageWidth, getZoomImageOffset } from './utils';

const SPEED = 5;
const container = {
    setClampedPosition: (_x: number, _y: number) => {},
    zoom: (_z: number, _px: number, _py: number) => {},
};

interface IProps extends IMapProps {
    data: HTMLImageElement;
}

const ImageMapComponent = ({ data, zIndex }: IProps) => {
    const {
        store: { zoom, position },
        setStore: setImageMap,
    } = useImageMapObservableStore();

    const imageWidth = data.width * zoom;
    const imageHeight = data.height * zoom;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    container.setClampedPosition = (dx: number, dy: number) => {
        setImageMap({
            position: {
                x: clampCoordinate(position.x + dx, imageWidth, screenWidth),
                y: clampCoordinate(position.y + dy, imageHeight, screenHeight),
            },
        });
    };
    container.zoom = (dz: number, pointX: number, pointY: number) => {
        const newWidth = clampImageWidth(imageWidth, dz);
        const newZoom = newWidth / data.width;

        if (zoom !== newZoom) {
            const newHeight = data.height * newZoom;

            const xOffset = getZoomImageOffset(pointX - position.x, imageWidth, newWidth);
            const yOffset = getZoomImageOffset(pointY - position.y, imageHeight, newHeight);

            setImageMap({
                zoom: newZoom,
                position: {
                    x: clampCoordinate(position.x - xOffset, newWidth, screenWidth),
                    y: clampCoordinate(position.y - yOffset, newHeight, screenHeight),
                },
            });
        }
    };

    useWheel((e) => {
        if (e.ctrlKey) {
            container.zoom(e.deltaY, e.offsetX, e.offsetY);
        } else {
            container.setClampedPosition(-e.deltaX, -e.deltaY);
        }
    });

    const [isUpPressed, setUpPressed] = useState(false);
    const [isDownPressed, setDownPressed] = useState(false);
    const [isLeftPressed, setLeftPressed] = useState(false);
    const [isRightPressed, setRightPressed] = useState(false);

    useArrowKeys({ setUpPressed, setDownPressed, setLeftPressed, setRightPressed });

    const render = () => {
        let deltaX = 0;
        let deltaY = 0;

        if (isUpPressed) {
            deltaY = SPEED;
        }
        if (isDownPressed) {
            deltaY = -SPEED;
        }
        if (isLeftPressed) {
            deltaX = SPEED;
        }
        if (isRightPressed) {
            deltaX = -SPEED;
        }
        container.setClampedPosition(deltaX, deltaY);
    };

    useEffect(() => {
        if (isUpPressed || isDownPressed || isLeftPressed || isRightPressed) {
            requestAnimationFrame(render);
        }
    }, [isDownPressed, isLeftPressed, isRightPressed, isUpPressed, render]);

    return (
        <Canvas
            id="image-map"
            width={screenWidth}
            height={screenHeight}
            style={{ zIndex }}
        >
            {(ctx: CanvasRenderingContext2D) => {
                ctx.clearRect(0, 0, screenWidth, screenHeight);
                ctx.drawImage(data, position.x, position.y, imageWidth, imageHeight);
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

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (!data) {
        return (
            <div
                id="image-map"
                style={{ height: 'calc(100% - 32px)', zIndex }}
            >
                <LoadImageButton
                    disabled={!isEditable}
                    onDataUpdate={(newData) => {
                        const initialZoom = zoomConfig.minWidth / newData.width; // set minimal size

                        setImageMap({
                            data: newData,
                            zoom: initialZoom,
                            position: {
                                // set in the center of the creen
                                x: (screenWidth - newData.width * initialZoom) / 2,
                                y: (screenHeight - newData.height * initialZoom) / 2,
                            },
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
