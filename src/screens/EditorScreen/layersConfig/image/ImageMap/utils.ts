import { IPoint } from 'types';
import { vectorDiv, vectorMult, vectorSub } from 'utils';

import { FILE_PICKER_CONFIG, ZOOM_CONFIG } from './config';

export async function uploadFile(): Promise<HTMLImageElement | null> {
    try {
        const [imageFile] = await window.showOpenFilePicker(FILE_PICKER_CONFIG);

        const file = await imageFile.getFile();
        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onerror = function () {
            URL.revokeObjectURL(this.src);
            console.error('Cannot load image');
        };

        return new Promise<HTMLImageElement>((resolve) => {
            img.onload = function () {
                URL.revokeObjectURL(img.src);
                resolve(img);
            };
        });
    } catch (e) {
        console.error(e);

        return null;
    }
}

export function clampImageWidth(imageWidth: number, delta: number): number {
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
    return {
        x: clampCoordinate(v.x, imageSize.x, screenSize.x, borderSize.x),
        y: clampCoordinate(v.y, imageSize.y, screenSize.y, borderSize.y),
    };
}

export function getZoomImageOffset(imagePosition: IPoint, imageSize: IPoint, newImageSize: IPoint) {
    const deltaSize = vectorSub(newImageSize, imageSize);
    // y = xk + b
    // if coordinate on the image is 0 -> image offset is 0
    // 0 * k + b = 0 -> b = 0
    // if coordinate is in the center of the image (imageSize/2) -> image offset is half difference (deltaSize/2)
    // imageSize/2 * k = deltaSize/2
    const k = vectorDiv(deltaSize, imageSize);

    return vectorMult(imagePosition, k);
}
