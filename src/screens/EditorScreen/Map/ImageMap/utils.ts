/* eslint-disable no-console */
import { filePickerConfig, zoomConfig } from './config';

export async function uploadFile(): Promise<HTMLImageElement | undefined> {
    try {
        const [imageFile] = await window.showOpenFilePicker(filePickerConfig);

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

        return undefined;
    }
}

export function clampCoordinate(coordinate: number, imageWidth: number, screenWidth: number) {
    const border = screenWidth - 20;
    const imageScreenDiff = screenWidth - imageWidth;
    const farBorder = imageScreenDiff - border;

    if (imageWidth > screenWidth - 2 * border) {
        if (coordinate >= border) {
            return border;
        }
        if (coordinate < farBorder) {
            return farBorder;
        }

        return coordinate;
    }

    if (coordinate <= border) {
        return border;
    }
    if (coordinate > farBorder) {
        return farBorder;
    }

    return coordinate;
}

export function clampImageWidth(imageWidth: number, delta: number): number {
    const width = imageWidth - (delta * zoomConfig.pixelsInDelta + zoomConfig.pixelsAddition);

    if (width < zoomConfig.minWidth) return zoomConfig.minWidth;
    if (width > zoomConfig.maxWidth) return zoomConfig.maxWidth;

    return width;
}

export function getZoomImageOffset(imageCoordinate: number, imageSize: number, newSize: number) {
    const deltaSize = newSize - imageSize;

    // y = xk + b
    // if coordinate on the image is 0 -> image offset is 0
    // 0 * k + b = 0 -> b = 0
    // if coordinate is in the center of the image (imageSize/2) -> image offset is half difference (deltaSize/2)
    // imageSize/2 * k = deltaSize/2
    const k = deltaSize / imageSize;

    return imageCoordinate * k;
}
