import './styles.css';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { Canvas } from 'components/canvas/Canvas';
import { useArrowKeys } from 'hooks/useArrowKeys';
import { useWheel } from 'hooks/useWheel';

import { IMapProps } from '../types';

import { LoadImageButton } from './LoadImageButton';

interface Point {
    x: number;
    y: number;
}

const SPEED = 5;

interface IProps extends IMapProps<HTMLImageElement> {
    data: HTMLImageElement;
}
const MapComponent = memo(({ opacity, width, height, data, zIndex }: IProps) => {
    const [isUpPressed, setUpPressed] = useState(false);
    const [isDownPressed, setDownPressed] = useState(false);
    const [isLeftPressed, setLeftPressed] = useState(false);
    const [isRightPressed, setRightPressed] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const container = useMemo(() => ({ setClampedPosition: (_x: number, _y: number) => {} }), []);

    const clampPosition = useCallback(
        (newPosition: Point) => {
            const deltaWidth = data.width - width;
            const deltaHeight = data.height - height;

            if (newPosition.x > 0) newPosition.x = 0;
            if (newPosition.x < -deltaWidth) newPosition.x = -deltaWidth;
            if (newPosition.y > 0) newPosition.y = 0;
            if (newPosition.y < -deltaHeight) newPosition.y = -deltaHeight;

            return newPosition;
        },
        [data.height, data.width, height, width],
    );

    container.setClampedPosition = useCallback(
        (dx: number, dy: number) => {
            setPosition(clampPosition({ x: position.x + dx, y: position.y + dy }));
        },
        [clampPosition, position.x, position.y],
    );

    useWheel((dx, dy) => container.setClampedPosition(-dx, -dy));
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
    }, [isUpPressed, isDownPressed, isLeftPressed, isRightPressed]);

    useEffect(() => {
        if (isUpPressed || isDownPressed || isLeftPressed || isRightPressed) requestAnimationFrame(render);
    }, [position, isDownPressed, isLeftPressed, isRightPressed, isUpPressed]);

    const children = useCallback(
        (ctx: CanvasRenderingContext2D) => {
            ctx.drawImage(data, position.x, position.y);
        },
        [data, position.x, position.y],
    );

    return (
        <Canvas
            id="image-map"
            width={width}
            height={height}
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
            {...props}
            data={data}
        />
    );
}
