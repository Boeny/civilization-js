import './HexBrushes.css';

import { observable } from 'hoc/observer';
import { setBrushAction, isBrushSelected, selectBrushAction } from 'state/brushActions';
import { HEX_CONFIG, HEX_TYPE } from "const";
import { getClasses } from 'utils';

import { Div } from "components/Div";

// TODO: Ctrl+Z
function getBrushKey(type: HEX_TYPE) {
    return 'brush-button' + type;
}

function BrushButton(type: HEX_TYPE) {
    const {title, color} = HEX_CONFIG[type];
    const key = getBrushKey(type);
    setBrushAction(undefined);

    return observable(key, () =>
        Div(
            title,
            {
                className: getClasses(['brush', isBrushSelected(type) ? 'selected' : undefined]),
                background: color,
                onClick: () => selectBrushAction(type, getBrushKey)
            }
        )
    )
}

export function HexBrushes() {
    return Div(
        Object.keys(HEX_CONFIG).map((type) => BrushButton(parseInt(type)))
    )
}
