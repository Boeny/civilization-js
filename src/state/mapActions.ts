import { MapData } from "types"
import { STATE } from "./state"
import { HEX_TYPE } from "const"

export function setHexMapDataAction(data: MapData) {
    STATE.hexMapData = data
}

export function getHexMapData(): MapData {
    return STATE.hexMapData
}

export function getHexFromHexMapData(x: number, y: number): HEX_TYPE {
    return STATE.hexMapData[y][x]
}

export function setMapPointAction(x: number, y: number, type: HEX_TYPE) {
    STATE.hexMapData[y][x] = type
}
