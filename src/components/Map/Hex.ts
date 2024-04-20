import './Hex.css';
import hex from 'assets/hex.svg';
import { Svg } from "components/Svg";
import { Div } from "components/Div";

export function Hex(size: number) {
    return Div(
        Svg(hex, {width: size}),
        {className: 'hex'}
    )
}
