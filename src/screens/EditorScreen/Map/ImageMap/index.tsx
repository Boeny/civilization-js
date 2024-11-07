import './styles.css';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Canvas } from 'components/canvas/Canvas';
import { useArrowKeys } from 'hooks/useArrowKeys';
import { useWheel } from 'hooks/useWheel';

import { IMapProps } from '../types';

import { zoomConfig } from './config';
import { LoadImageButton } from './LoadImageButton';
import { clampCoordinate, clampImageWidth, getZoomImageOffset } from './utils';

const SPEED = 5;

interface IProps extends IMapProps<HTMLImageElement> {
    data: HTMLImageElement;
}
const MapComponent = memo(({ opacity, data, zIndex, width: screenWidth, height: screenHeight }: IProps) => {
    const [isUpPressed, setUpPressed] = useState(false);
    const [isDownPressed, setDownPressed] = useState(false);
    const [isLeftPressed, setLeftPressed] = useState(false);
    const [isRightPressed, setRightPressed] = useState(false);

    const [zoom, setZoom] = useState(() => zoomConfig.minWidth / data.width); // set minimal size

    const imageWidth = useMemo(() => data.width * zoom, [data.width, zoom]);
    const imageHeight = useMemo(() => data.height * zoom, [data.height, zoom]);

    const [position, setPosition] = useState(() => ({
        // set in the center of the creen
        x: (screenWidth - imageWidth) / 2,
        y: (screenHeight - imageHeight) / 2,
    }));

    const container = useMemo(
        () => ({
            setClampedPosition: (_x: number, _y: number) => {},
            zoom: (_z: number, _px: number, _py: number) => {},
        }),
        [],
    );

    container.setClampedPosition = useCallback(
        (dx: number, dy: number) => {
            setPosition({
                x: clampCoordinate(position.x + dx, imageWidth, screenWidth),
                y: clampCoordinate(position.y + dy, imageHeight, screenHeight),
            });
        },
        [position, screenHeight, screenWidth, imageHeight, imageWidth],
    );
    container.zoom = useCallback(
        (dz: number, pointX: number, pointY: number) => {
            const newWidth = clampImageWidth(imageWidth, dz);
            const newZoom = newWidth / data.width;

            if (zoom !== newZoom) {
                setZoom(newZoom);

                const newHeight = data.height * newZoom;

                const xOffset = getZoomImageOffset(pointX - position.x, imageWidth, newWidth);
                const yOffset = getZoomImageOffset(pointY - position.y, imageHeight, newHeight);

                setPosition({
                    x: clampCoordinate(position.x - xOffset, newWidth, screenWidth),
                    y: clampCoordinate(position.y - yOffset, newHeight, screenHeight),
                });
            }
        },
        [data.height, data.width, imageHeight, imageWidth, position.x, position.y, screenHeight, screenWidth, zoom],
    );

    useWheel((e) => {
        if (e.ctrlKey) {
            container.zoom(e.deltaY, e.offsetX, e.offsetY);
        } else {
            container.setClampedPosition(-e.deltaX, -e.deltaY);
        }
    });

    useArrowKeys({ setUpPressed, setDownPressed, setLeftPressed, setRightPressed });

    const render = useCallback(() => {
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
    }, [isUpPressed, isDownPressed, isLeftPressed, isRightPressed, container]);

    useEffect(() => {
        if (isUpPressed || isDownPressed || isLeftPressed || isRightPressed) requestAnimationFrame(render);
    }, [position, isDownPressed, isLeftPressed, isRightPressed, isUpPressed, render]);

    const children = useCallback(
        (ctx: CanvasRenderingContext2D) => {
            ctx.clearRect(0, 0, screenWidth, screenHeight);
            ctx.drawImage(data, position.x, position.y, imageWidth, imageHeight);
        },
        [data, position, screenHeight, screenWidth, imageHeight, imageWidth],
    );

    return (
        <Canvas
            id="image-map"
            width={screenWidth}
            height={screenHeight}
            style={{ zIndex, opacity }}
        >
            {children}
        </Canvas>
    );
});

export function ImageMap(props: IMapProps<HTMLImageElement>) {
    const { isEditable, opacity, data, zIndex, onDataUpdate } = props;

    if (!data) {
        return (
            <div
                id="image-map"
                style={{ height: 'calc(100% - 32px)', zIndex, opacity }}
            >
                <LoadImageButton
                    disabled={!isEditable}
                    onDataUpdate={onDataUpdate}
                />
            </div>
        );
    }

    return (
        <MapComponent
            key={data.src}
            {...props}
            data={data}
        />
    );
}
