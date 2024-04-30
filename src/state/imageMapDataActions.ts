import { STATE } from "./state";

export function setImageMapData(value: CanvasImageSource) {
    STATE.imageMapData = value;
}

export function getImageMapData(): CanvasImageSource | undefined {
    return STATE.imageMapData;
}
