export enum HEX_TYPE {
    ocean,
    sea,
    desert,
    dirt,
    meadow,
    tundra,
    snow,
    ice,
    mountain,
    hill,
}

export class HexMapData {
    get width() {
        return this.data[0].length;
    }
    get height() {
        return this.data.length;
    }
    data: HEX_TYPE[][] = [];

    constructor(data: HEX_TYPE[][]) {
        this.data = data;
    }
}
