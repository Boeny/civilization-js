import { SQRT_3 } from './const';
import { HEX_TYPE, MapData } from './types';

export function generateEmptyMapData(width: number, height: number): MapData {
    return Array.from({ length: height }).map(() => Array.from({ length: width }).map(() => HEX_TYPE.ocean));
}

export function getHexRadius(hexWidth: number): number {
    return hexWidth / SQRT_3;
}
