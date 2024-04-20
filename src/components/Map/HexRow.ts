import './HexRow.css';
import { Hex } from "./Hex";
import { Div } from "components/Div";
import { MapDataRow } from 'types';

export function HexRow(y: number, dataRow: MapDataRow, size: number) {
    const row = dataRow.map((type) => Hex(size, type));
    return Div(row, {className: 'row', marginLeft: y % 2 === 0 ? size / 2 - 9 : 0});
}
