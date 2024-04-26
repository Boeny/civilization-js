import './Map.css';
import { HexRow } from "./HexRow";
import { MapData } from "types";
import { Div } from 'components/Div';
import { asyncMap, getAsyncCallback } from 'utils';
import { Message } from 'screens/Message';

export interface Params {
    mapData: MapData;
    hexSize: number;
}

export async function Map({mapData, hexSize}: Params) {
    const result = await asyncMap(mapData, async (dataRow, i) => {
        Message('Loading row ' + i);
        return getAsyncCallback(() => HexRow(i, dataRow, hexSize, i === mapData.length - 1));
    });

    Message('Completed');

    return Div(result, {id: 'map'});
}
