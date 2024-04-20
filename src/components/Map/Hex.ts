import './Hex.css';
import hex from 'assets/hex.svg';
import { Svg } from "components/Svg";
import { Div } from "components/Div";
import { HEX_TYPE } from 'const';

export function Hex(size: number, type: HEX_TYPE) {
    return Div(
        [
            Svg(hex, {width: size}),
            Div(String(type), {className: 'hex-type'}),
        ],
        {className: 'hex'}
    )
}
