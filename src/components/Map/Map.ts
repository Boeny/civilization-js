import { Block } from "components/Block/Block";
import { range } from "utils";
import { HexRow } from "./HexRow";
import { MapData } from "types";

interface Params {
    mapData: MapData;
    hexSize: number;
    id?: string;
}

export function Map({mapData, hexSize, ...params}: Params): HTMLElement {
    return Block(
        mapData.map((dataRow, y) => HexRow(y, dataRow, hexSize)),
        params,
    )
}
