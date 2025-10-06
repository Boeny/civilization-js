import { useCallback, useEffect, useMemo, useState } from 'react';

import { useArrowKeys } from 'hooks/useArrowKeys';
import { useWheel } from 'hooks/useWheel';
import { IPoint } from 'types';
import { getVector, getZeroVector, vectorMult, vectorSum } from 'utils';

import { BORDER_SIZE, KEY_PAN_SPEED, WHEEL_PAN_SPEED } from '../config';
import { useMapMovementParamsStore } from '../mapMovingStore';

import { applyZoom, clampImageSize } from './utils';

export function useMapMoving(screenSize: IPoint) {
    const {
        store: { zoom, position, imageSize: originalImageSize },
        setStore: setMapMoving,
    } = useMapMovementParamsStore();

    const imageSize = useMemo(() => vectorMult(originalImageSize, zoom), [originalImageSize, zoom]);

    const setClampedPosition = useCallback(
        (delta: IPoint) => {
            setMapMoving({
                position: clampImageSize(vectorSum(position, delta), imageSize, screenSize, BORDER_SIZE),
            });
        },
        [imageSize, position],
    );

    const useWheelCallback = useCallback(
        (e: WheelEvent) => {
            if (!e.ctrlKey) {
                setClampedPosition(vectorMult(getVector(e.deltaX, e.deltaY), -WHEEL_PAN_SPEED)); // DELTA! - making pan

                return;
            }

            const newZoomParams = applyZoom({
                dz: e.deltaY,
                point: getVector(e.offsetX, e.offsetY), // OFSSET! - making zoom
                zoom,
                position,
                imageSize,
                originalImageSize,
                screenSize,
            });

            if (newZoomParams) {
                setMapMoving(newZoomParams);
            }
        },
        [zoom, position, imageSize, originalImageSize, setClampedPosition],
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
                setClampedPosition(delta);
            });
        }
    }, [position, isDownPressed, isLeftPressed, isRightPressed, isUpPressed]);
}
