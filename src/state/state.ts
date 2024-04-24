import { HEX_TYPE, LAYER_TYPE } from "const"
import { MapData } from "types";

interface State {
    brush: HEX_TYPE | undefined;
    isPainting: boolean;
    layer: LAYER_TYPE | undefined;
    mapData: MapData;
    hexSize: number;
}

export const STATE: State = {
    brush: undefined,
    isPainting: false,
    layer: undefined,
    mapData: [],
    hexSize: 0,
}

export function setMapDataAction(data: MapData) {
    STATE.mapData = data;
}

export function getMapData(): MapData {
    return STATE.mapData;
}

export function setHexSizeAction(size: number) {
    STATE.hexSize = size;
}

export function getHexSize(): number {
    return STATE.hexSize;
}
