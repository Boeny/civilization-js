import './Hex.css';
import hex from 'assets/hex.svg';
import { Svg } from "components/Svg";
import { Div } from "components/Div";
import { HEX_TYPE } from 'const';

function getHexColor(type: HEX_TYPE): string {
    switch (type) {
        case HEX_TYPE.ocean: return 'blue';
        case HEX_TYPE.sea: return 'lightblue';
        case HEX_TYPE.desert: return 'yellow';
        case HEX_TYPE.dirt: return 'brown';
        case HEX_TYPE.wet: return 'green';
        case HEX_TYPE.tundra: return 'lightgreen';
        case HEX_TYPE.snow: return 'grey';
        case HEX_TYPE.ice: return 'white';
        case HEX_TYPE.mountain: return 'lightbrown';
        case HEX_TYPE.hill: return 'yellow';
    }
}

export function Hex(size: number, type: HEX_TYPE) {
    return Div(
        Svg(hex, {width: size, color: getHexColor(type)}),
        {className: 'hex'}
    )
}
