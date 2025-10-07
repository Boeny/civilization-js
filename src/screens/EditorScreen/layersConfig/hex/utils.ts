import { SQRT_3 } from 'screens/EditorScreen/const';
import { IPoint } from 'types';

import { HEX_TYPE } from './types';

export function generateEmptyMapData(size: IPoint): HEX_TYPE[][] {
    return Array.from({ length: size.y }).map(() => Array.from({ length: size.x }).map(() => HEX_TYPE.ocean));
}

export function getHexRadius(hexWidth: number): number {
    return hexWidth / SQRT_3;
}

export function getHexHeight(hexRadius: number): number {
    return hexRadius * 1.5;
}
