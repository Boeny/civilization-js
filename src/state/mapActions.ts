import { MapData } from "types";
import { STATE } from "./state";
import { HEX_TYPE } from "const";
import { trigger } from "utils";
import { getLayerImageKey } from "screens/EditorScreen/Layers/Layer/Layer";

export function setMapDataAction(data: MapData) {
    STATE.mapData = data;
}

export function getMapData(): MapData {
    return STATE.mapData;
}

export function getMapPoint(x: number, y: number): HEX_TYPE {
    return STATE.mapData[y][x];
}

function setMapPointAction(x: number, y: number, type: HEX_TYPE) {
    STATE.mapData[y][x] = type;
}

export function updateMapPointAction(x: number, y: number, newType: HEX_TYPE, getHexKey: (x: number, y: number) => string) {
    if (getMapPoint(x, y) != newType) {
        setMapPointAction(x, y, newType);
        trigger(getHexKey(x, y));
        trigger(getLayerImageKey(STATE.layer!));
    }
}
