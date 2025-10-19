import { IPoint } from 'types';
import { getZeroVector, getZoomFor, vectorDiv, vectorMult, vectorSub } from 'utils';

import { ZOOM_CONFIG } from '../const';

import { IMap } from './types';

type MovementParams = {
    zoom: number;
    position: IPoint;
};

export function adaptMapBorders(newMap: IMap, otherMaps: IMap[]): IPoint {
    const currentMapMaxSize = getZeroVector();

    [...otherMaps, newMap].forEach((map) => {
        if (currentMapMaxSize.x < map.width) {
            currentMapMaxSize.x = map.width;
        }
        if (currentMapMaxSize.y < map.height) {
            currentMapMaxSize.y = map.height;
        }
    });

    return currentMapMaxSize;
}

function getScreenCenterPosition(screenSize: IPoint, imageSize: IPoint): IPoint {
    return vectorDiv(vectorSub(screenSize, imageSize), 2);
}

export function getFitScreenMapMovementParams(screenWidth: number, imageWidth: number) {
    return {
        zoom: getZoomFor(screenWidth, imageWidth),
        position: getZeroVector(),
    };
}

export function getSreenCenterMapMovementParams(screenSize: IPoint, imageSize: IPoint): MovementParams {
    const zoom = getZoomFor(ZOOM_CONFIG.minWidth, imageSize.x);

    return {
        zoom,
        position: getScreenCenterPosition(screenSize, vectorMult(imageSize, zoom)),
    };
}

export function getMapBorders(borders: IPoint, otherMaps: IMap[], zoom: number) {
    const zoomedBorders = vectorMult(borders, zoom);

    return adaptMapBorders({ width: zoomedBorders.x, height: zoomedBorders.y }, otherMaps);
}
