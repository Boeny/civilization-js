import { getVector } from 'utils';

import { HEX_TYPE } from './types';
import { getHexHeight } from './utils';

export class HexMapData {
    static hexWidth = 100;
    data: HEX_TYPE[][] = [];

    get width() {
        // in pixels
        return this.rowLength * HexMapData.hexWidth;
    }
    get height() {
        // in pixels
        return this.columnLength * getHexHeight(HexMapData.hexWidth);
    }
    get size() {
        return getVector(this.width, this.height);
    }
    get rowLength() {
        // in cells
        return this.data[0]?.length || 0;
    }
    get columnLength() {
        // in cells
        return this.data.length;
    }

    constructor(data: HEX_TYPE[][]) {
        this.data = data;
    }
}
