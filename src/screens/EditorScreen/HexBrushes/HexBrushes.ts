import './HexBrushes.css';
import { observableAttrs } from 'hoc/observable';
import { setBrushAction, isBrushSelected, selectBrushAction } from 'state/brushActions';
import { HEX_CONFIG, HEX_TYPE } from "const";
import { getClasses } from 'utils';

import { Div } from "components/Div";

// TODO: Ctrl+Z
function getBrushKey(type: HEX_TYPE): string {
    return 'brush-button' + type;
}

function getBrushClassName(type: HEX_TYPE): string {
    return getClasses(['brush', isBrushSelected(type) ? 'selected' : undefined]);
}

function BrushButton(type: HEX_TYPE) {
    const {title, color} = HEX_CONFIG[type];
    const key = getBrushKey(type);
    setBrushAction(undefined);

    return observableAttrs(
        key,
        Div(
            title,
            {
                className: getBrushClassName(type),
                background: color,
                onClick: () => selectBrushAction(type, getBrushKey)
            }
        ),
        [
            {
                name: 'className',
                value: () => getBrushClassName(type),
            }
        ]
    )
}

export function HexBrushes() {
    return Div(
        Object.keys(HEX_CONFIG).map((type) => BrushButton(parseInt(type)))
    )
}
