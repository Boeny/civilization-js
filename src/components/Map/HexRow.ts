import { range } from "utils";
import { Hex } from "./Hex";

export function HexRow(y: number, width: number) {
    return range(width).map((x) => {
        const isOddRow = y % 2 === 0;
        const offset = isOddRow ? 0.5 : 0;

        return Hex(x, y + offset);
    });
}
