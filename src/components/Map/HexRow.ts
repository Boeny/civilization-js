import './HexRow.css';
import { range } from "utils";
import { Hex } from "./Hex";
import { Div } from "components/Div";

export function HexRow(y: number, width: number, size: number) {
    const row = range(width).map(() => Hex(size));
    return Div(row, {className: 'row', marginLeft: y % 2 === 0 ? size / 2 - 9 : 0});
}
