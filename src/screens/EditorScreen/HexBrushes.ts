import './HexBrushes.css';
import { HEX_NAME, HEX_COLOR, HEX_TYPE } from "const";
import { clearBrushAction, isAnyBrushSelected, isBrushSelected, setBrushAction, toggleBrushAction } from 'state';
import { observable } from 'hoc/observer';
import { getClasses, trigger } from 'utils';
import { Div } from "components/Div";

function getKey(type: HEX_TYPE) {
    return 'brush-button' + type;
}

export function HexBrushes() {
    return Div(
        Object.keys(HEX_NAME).map((type) => BrushButton(type as any as HEX_TYPE))
    )
}

function BrushButton(type: HEX_TYPE) {
    const key = getKey(type);
    clearBrushAction();

    return observable(key, () =>
        Div(
            HEX_NAME[type],
            {
                className: getClasses(['brush', isBrushSelected(type) ? 'selected' : undefined]),
                background: HEX_COLOR[type],
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
