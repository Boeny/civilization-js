import './HexRow.css';
import { Hex } from "./Hex";
import { Div } from "components/Div";
import { MapDataRow } from 'types';

// tg(60) = (width / 2) / offset = sqrt(3)
// 2x-offset = width / (2 * sqrt(3))
// 2x-offset / 2 = width / (4 * sqrt(3))
const _4_SQRT_3 = 4 * Math.sqrt(3);

export function HexRow(index: number, dataRow: MapDataRow, size: number, isLast: boolean) {
    const row = dataRow.map((type) => Hex(size, type));
    const offset = size / _4_SQRT_3;

    return Div(row, {
        className: 'row',
        marginLeft: index % 2 !== 0 ? size / 2 : 0,
        marginTop: index === 0 ? 0 : -offset,
        marginBottom: isLast ? 0 : -offset,
    });
}
