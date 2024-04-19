import { Svg } from "components/Svg";

const hexWidth = 10;
const hexHeight = 10;

export function Hex(x: number, y: number) {
    return Svg('./hex.svg', {
        x: x * hexWidth,
        y: y * hexHeight,
    })
}
