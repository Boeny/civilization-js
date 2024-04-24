import './HexRow.css';
import { Hex } from "./Hex";
import { Div } from "components/Div";
import { MapDataRow } from 'types';
import { HEX_TYPE } from 'const';

// tg(60) = (width / 2) / 2x-offset = sqrt(3)
// 2x-offset = width / (2 * sqrt(3))
// 2x-offset / 2 = width / (4 * sqrt(3))
const _4_SQRT_3 = 4 * Math.sqrt(3);

export function HexRow(y: number, dataRow: MapDataRow, size: number, isLast: boolean) {
    const row = dataRow.map((type, x) => Hex(x, y, size, type || HEX_TYPE.ocean));
    const offset = size / _4_SQRT_3;

    return Div(row, {
        className: 'row',
        marginLeft: y % 2 !== 0 ? size / 2 : 0,
        marginTop: y === 0 ? 0 : -offset,
        marginBottom: isLast ? 0 : -offset,
    });
}
