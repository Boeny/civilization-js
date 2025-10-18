import { useCallback, useEffect } from 'react';

import { useArrowKeys } from 'hooks/useArrowKeys';
import { useWheel } from 'hooks/useWheel';
import { BORDER_SIZE, KEY_PAN_SPEED, WHEEL_PAN_SPEED } from 'screens/EditorScreen/const';
import { IPoint } from 'types';
import { getVector, getZeroVector, vectorMult, vectorSum } from 'utils';

import { useMapMovementParamsStore } from './mapMovingStore';
import { applyZoom, clampImageOffset } from './utils';

export function useMapMoving(screenSize: IPoint) {
    const {
        store: { zoom, position, borders },
        setStore: setMapMovementParams,
    } = useMapMovementParamsStore();

    const setClampedPosition = useCallback(
        (delta: IPoint) => {
            setMapMovementParams({
                position: clampImageOffset(vectorSum(position, delta), vectorMult(borders, zoom), screenSize, BORDER_SIZE),
            });
        },
        [position, borders, zoom, screenSize],
    );

    const useWheelCallback = useCallback(
        (e: WheelEvent) => {
            if (!e.ctrlKey) {
                setClampedPosition(vectorMult(getVector(e.deltaX, e.deltaY), -WHEEL_PAN_SPEED)); // DELTA! - making pan

                return;
            }

            const newMapMovementParams = applyZoom({
                dz: e.deltaY,
                point: getVector(e.offsetX, e.offsetY), // OFSSET! - making zoom
                zoom,
                position,
                borders,
                screenSize,
            });

            if (newMapMovementParams) {
                setMapMovementParams(newMapMovementParams);
            }
        },
        [zoom, position, borders, screenSize],
    );

    useWheel(useWheelCallback);

    const { isUpPressed, isDownPressed, isLeftPressed, isRightPressed } = useArrowKeys();

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
