import { IPoint } from 'types';
import { getZeroVector } from 'utils';

import { IMap } from '../types';

export function adaptMapBorders(newMap: IMap, otherMaps: IMap[]): IPoint {
    const currentMapMaxSize = getZeroVector();

    [...otherMaps, newMap].forEach((map) => {
        if (currentMapMaxSize.x < map.width) {
            currentMapMaxSize.x = map.width;
        }
        if (currentMapMaxSize.y < map.height) {
            currentMapMaxSize.y = map.height;
        }
    });

    return currentMapMaxSize;
}
