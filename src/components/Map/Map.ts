import './Map.css';
import { HexRow } from "./HexRow";
import { MapData } from "types";
import { Div } from 'components/Div';
import { CachedHOC } from 'hoc/Cached';

export interface Params {
    mapData: MapData;
    hexSize: number;
}

function MapComponent({mapData, hexSize}: Params) {
    return Div(
        mapData.map((dataRow, index) => HexRow(index, dataRow, hexSize, index === mapData.length - 1)),
        {id: 'map'},
    )
}

export const Map = CachedHOC(MapComponent);
