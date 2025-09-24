import { SQRT_3 } from 'screens/EditorScreen/const';

import { HEX_TYPE, HexMapData } from './types';

export function generateEmptyMapData(width: number, height: number): HexMapData {
    return Array.from({ length: height }).map(() => Array.from({ length: width }).map(() => HEX_TYPE.ocean));
}

export function getHexRadius(hexWidth: number): number {
    return hexWidth / SQRT_3;
}
