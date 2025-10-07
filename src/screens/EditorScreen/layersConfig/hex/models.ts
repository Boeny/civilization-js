import { HEX_TYPE } from './types';
import { getHexHeight, getHexRadius } from './utils';

export class HexMapData {
    hexWidth = 100;
    data: HEX_TYPE[][] = [];

    get width() {
        // in pixels
        return this.rowLength * this.hexWidth;
    }
    get height() {
        // in pixels
        return this.columnLength * getHexHeight(getHexRadius(this.hexWidth));
    }
    get rowLength() {
        // in cells
        return this.data[0].length;
    }
    get columnLength() {
        // in cells
        return this.data.length;
    }

    constructor(data: HEX_TYPE[][]) {
        this.data = data;
    }
}
