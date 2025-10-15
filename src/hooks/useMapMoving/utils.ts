import { IPoint } from 'types';
import { getVector, getZoomFor, vectorMult, vectorSub } from 'utils';

import { BORDER_SIZE, ZOOM_CONFIG } from '../../screens/EditorScreen/const';

function clampImageWidth(border: number, delta: number): number {
    const width = border - (delta * ZOOM_CONFIG.pixelsInDelta + ZOOM_CONFIG.pixelsAddition);

    if (width < ZOOM_CONFIG.minWidth) {
        return ZOOM_CONFIG.minWidth;
    }
    if (width > ZOOM_CONFIG.maxWidth) {
        return ZOOM_CONFIG.maxWidth;
    }

    return width;
}

function clampCoordinataOffset(coordinate: number, borderSize: number, screenSize: number, visibleSize: number) {
    const border = screenSize - visibleSize;
    const farBorder = visibleSize - borderSize;

    if (coordinate >= border) {
        return border;
    }
    if (coordinate < farBorder) {
        return farBorder;
    }

    return coordinate;
}

export function clampImageOffset(v: IPoint, borders: IPoint, screenSize: IPoint, visibleSize: IPoint): IPoint {
    return getVector(
        clampCoordinataOffset(v.x, borders.x, screenSize.x, visibleSize.x),
        clampCoordinataOffset(v.y, borders.y, screenSize.y, visibleSize.y),
    );
}

function getZoomCoordinataOffset(position: number, size: number, newSize: number): number {
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
    return getVector(getZoomCoordinataOffset(position.x, size.x, newSize.x), getZoomCoordinataOffset(position.y, size.y, newSize.y));
}

export function applyZoom({
    dz,
    point,
    zoom,
    position,
    borders,
    screenSize,
}: {
    dz: number;
    point: IPoint;
    zoom: number;
    position: IPoint;
    borders: IPoint;
    screenSize: IPoint;
}): { zoom: number; position: IPoint } | null {
    const zoomedBorders = vectorMult(borders, zoom);
    const newBordersWidth = clampImageWidth(zoomedBorders.x, dz);
    const newZoom = getZoomFor(newBordersWidth, borders.x);

    if (zoom === newZoom) {
        return null;
    }

    const newBorders = getVector(newBordersWidth, borders.y * newZoom);
    const offset = getZoomOffset(vectorSub(point, position), zoomedBorders, newBorders);

    return {
        zoom: newZoom,
        position: clampImageOffset(vectorSub(position, offset), newBorders, screenSize, BORDER_SIZE),
    };
}
