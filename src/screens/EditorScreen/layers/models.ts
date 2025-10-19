import { getHexHeight } from 'hexUtils';
import { getVector } from 'utils';

export class HexMapData<T extends number = number> {
    static hexWidth = 100;
    data: T[][] = [];

    get width() {
        // in pixels
        return this.rowLength * HexMapData.hexWidth;
    }
    get height() {
        // in pixels
        return this.columnLength * getHexHeight(HexMapData.hexWidth);
    }
    get imageSize() {
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
    get mapSize() {
        return getVector(this.rowLength, this.columnLength);
    }

    constructor(data: T[][]) {
        this.data = data;
    }
}
