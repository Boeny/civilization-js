import { IPoint } from 'types';
import { getVector, vectorSub } from 'utils';

import { BORDER_SIZE, ZOOM_CONFIG } from '../config';

function clampImageWidth(imageWidth: number, delta: number): number {
    const width = imageWidth - (delta * ZOOM_CONFIG.pixelsInDelta + ZOOM_CONFIG.pixelsAddition);

    if (width < ZOOM_CONFIG.minWidth) {
        return ZOOM_CONFIG.minWidth;
    }
    if (width > ZOOM_CONFIG.maxWidth) {
        return ZOOM_CONFIG.maxWidth;
    }

    return width;
}

function clampCoordinate(coordinate: number, imageSize: number, screenSize: number, borderSize: number) {
    const border = screenSize - borderSize;
    const farBorder = borderSize - imageSize;

    if (coordinate >= border) {
        return border;
    }
    if (coordinate < farBorder) {
        return farBorder;
    }

    return coordinate;
}

export function clampImageSize(v: IPoint, imageSize: IPoint, screenSize: IPoint, borderSize: IPoint): IPoint {
    return getVector(
        clampCoordinate(v.x, imageSize.x, screenSize.x, borderSize.x),
        clampCoordinate(v.y, imageSize.y, screenSize.y, borderSize.y),
    );
}

function getZoomOffsetCoordinate(position: number, size: number, newSize: number): number {
    const deltaSize = newSize - size;
    // y = xk + b
    // if coordinate on the image is 0 -> image offset is 0
    // 0 * k + b = 0 -> b = 0
    // if coordinate is in the center of the image (imageSize/2) -> image offset is half difference (deltaSize/2)
    // imageSize/2 * k = deltaSize/2
    const k = deltaSize / size;

    return position * k;
}

function getZoomOffset(position: IPoint, size: IPoint, newSize: IPoint): IPoint {
    return getVector(getZoomOffsetCoordinate(position.x, size.x, newSize.x), getZoomOffsetCoordinate(position.y, size.y, newSize.y));
}

export function applyZoom({
    dz,
    point,
    zoom,
    position,
    imageSize,
    originalImageSize,
    screenSize,
}: {
    dz: number;
    point: IPoint;
    zoom: number;
    position: IPoint;
    imageSize: IPoint;
    originalImageSize: IPoint;
    screenSize: IPoint;
}): { zoom: number; position: IPoint } | null {
    const newImageSize = getVector(clampImageWidth(imageSize.x, dz), originalImageSize.y);
    const newZoom = newImageSize.x / originalImageSize.x;

    if (zoom === newZoom) {
        return null;
    }

    newImageSize.y *= newZoom;

    const offset = getZoomOffset(vectorSub(point, position), imageSize, newImageSize);

    return {
        zoom: newZoom,
        position: clampImageSize(vectorSub(position, offset), newImageSize, screenSize, BORDER_SIZE),
    };
}
