import { HEX_TYPE, SQRT_3 } from "const"
import { MapData } from "types"

export function generateEmptyMapData(width: number, height: number): MapData {
    return Array.from({length: height}).map(() => Array.from({length: width}).map(() => HEX_TYPE.ocean))
}

export function getHexRadius(hexWidth: number): number {
    return hexWidth / SQRT_3
}

function yIsBelowTheLine(isIncreasing: boolean, x: number, y: number, dy: number): boolean {
    // tan(30) = 1 / sqrt(3)
    const yOnTheLine = isIncreasing ? x / SQRT_3 : dy - x / SQRT_3

    return y < yOnTheLine
}

export function getMapCoordinatesFromCursor(x: number, y: number, hexWidth: number, hexRadius: number): [number, number] {
    const hexHeight_1_5 = 3 * hexRadius
    const y_3radius_count = Math.floor(y / hexHeight_1_5)
    let yMin = y_3radius_count * hexHeight_1_5

    const x_widthCount = Math.floor(x / hexWidth)
    const xMin = x_widthCount * hexWidth

    let mapX = x_widthCount
    let mapY = y_3radius_count * 2

    const halfRadius = hexRadius / 2
    const halfWidth = hexWidth / 2
    const xCenter = xMin + halfWidth

    // yMin
    // |/ or /\ or \|
    // yMin + radius / 2
    if (y < yMin + halfRadius) {
        // (mapX - 1, mapY - 1) or (mapX, mapY) or (mapX, mapY -1)
        if (x < xCenter) {
            return yIsBelowTheLine(false, x - xMin, y - yMin, halfRadius) ? [mapX - 1, mapY - 1] : [mapX, mapY]
        }

        return yIsBelowTheLine(true, x - xCenter, y - yMin, halfRadius) ? [mapX, mapY - 1] : [mapX, mapY]
    }

    const radius_1_5 = hexRadius * 1.5

    // yMin
    //  / \
    // yMin + radius / 2
    // |||||
    // yMin + radius * 1.5
    //  \ /
    if (y <= yMin + radius_1_5) {
        return [mapX, mapY]
    }

    // yMin + radius * 1.5
    // |\ or \/ or /|
    // yMin + radius * 2
    if (y <  yMin + hexRadius * 2) {
        yMin += radius_1_5

        // (mapX - 1, mapY + 1) or (mapX, mapY) or (mapX, mapY + 1)
        if (x < xCenter) {
            return yIsBelowTheLine(true, x - xMin, y - yMin, halfRadius) ? [mapX, mapY] : [mapX - 1, mapY + 1]
        }

        return yIsBelowTheLine(false, x - xCenter, y - yMin, halfRadius) ? [mapX, mapY] : [mapX, mapY + 1]
    }

    // yMin + radius * 1.5
    // |\      /|
    // yMin + radius * 2
    // ||| or |||
    // yMin + radius * 3
    // |/      \|
    // (mapX - 1, mapY + 1) or (mapX, mapY + 1)
    if (x < xCenter) mapX -= 1

    return [mapX, mapY + 1]
}
