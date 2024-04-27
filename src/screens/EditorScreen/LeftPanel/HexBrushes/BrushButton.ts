import './BrushButton.css';
import { observableAttrs } from 'hoc/observable';
import { isBrushSelected, selectBrushAction } from 'state/brushActions';
import { HEX_CONFIG, HEX_TYPE } from "const";
import { getClasses } from 'utils';
import { Div } from "components/Div";


function getBrushKey(type: HEX_TYPE): string {
    return 'brush-button' + type;
}

function getBrushClassName(type: HEX_TYPE): string {
    return getClasses(['brush', isBrushSelected(type) ? 'selected' : undefined]);
}

interface Params {
    type: HEX_TYPE;
    onClick: () => void;
}

function BrushButton({type, onClick}: Params) {
    const {title, color} = HEX_CONFIG[type];

    return Div(
        title,
        {
            background: color,
            onClick
        }
    )
}

export const BrushButtonContainers = Object.keys(HEX_CONFIG).map((key) => {
    const type = parseInt(key);

    return observableAttrs(
        getBrushKey(type),
        () => BrushButton({type, onClick: () => selectBrushAction(type, getBrushKey)}),
        [{
            name: 'className',
            value: () => getBrushClassName(type),
        }]
    )
})
