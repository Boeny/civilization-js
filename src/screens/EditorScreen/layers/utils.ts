import { getHexHeight } from 'hexUtils';
import { IPoint } from 'types';
import { getZeroVector, getZoomFor, vectorDiv, vectorMult, vectorSub } from 'utils';

import { ZOOM_CONFIG } from '../const';

import { IMap } from './types';

const MAX_MINI_MAP_HEIGHT = 140;

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

export function getHexMiniMapSize(panelWidth: number, map: { rowLength: number; columnLength: number }): IMap & { hexWidth: number } {
    let hexWidth = panelWidth / map.rowLength;
    let width = panelWidth + hexWidth / 2;
    const hexHeight = getHexHeight(hexWidth);
    let height = hexHeight * map.columnLength + hexHeight / 2;
    const ratio = width / height;

    if (height > MAX_MINI_MAP_HEIGHT) {
        height = MAX_MINI_MAP_HEIGHT;
        width = ratio * height;
        hexWidth = width / map.rowLength;
    }

    return { width, height, hexWidth };
}

export function getImageMiniMapSize(panelWidth: number, map: IMap): IMap {
    let width = panelWidth;
    let height = (width * map.height) / map.width;
    const ratio = width / height;

    if (height > MAX_MINI_MAP_HEIGHT) {
        height = MAX_MINI_MAP_HEIGHT;
        width = ratio * height;
    }

    return { width, height };
}
