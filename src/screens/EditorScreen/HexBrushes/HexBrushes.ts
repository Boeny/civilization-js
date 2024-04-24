import './HexBrushes.css';

import { observable } from 'hoc/observer';
import { clearBrushAction, isAnyBrushSelected, isBrushSelected, setBrushAction, toggleBrushAction } from 'state/brushActions';
import { HEX_CONFIG, HEX_TYPE } from "const";
import { getClasses, trigger } from 'utils';

import { Div } from "components/Div";

// TODO: Ctrl+Z
function getKey(type: HEX_TYPE) {
    return 'brush-button' + type;
}

function BrushButton(type: HEX_TYPE) {
    const {title, color} = HEX_CONFIG[type];
    const key = getKey(type);
    clearBrushAction();

    return observable(key, () =>
        Div(
            title,
            {
                className: getClasses(['brush', isBrushSelected(type) ? 'selected' : undefined]),
                background: color,
                onClick: () => {
                    if (isAnyBrushSelected() && !isBrushSelected(type)) {
                        const prevSelectedBrush = setBrushAction(type)!;
                        trigger(getKey(prevSelectedBrush));
                        trigger(key);
                        return;
                    }

                    toggleBrushAction(type);
                    trigger(key);
                }
            }
        )
    )
}

export function HexBrushes() {
    return Div(
        Object.keys(HEX_CONFIG).map((type) => BrushButton(parseInt(type)))
    )
}
