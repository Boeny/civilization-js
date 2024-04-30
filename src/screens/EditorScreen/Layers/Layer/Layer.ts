import './Layer.css';

import { LAYER_CONFIG, LAYER_TYPE } from 'const';
import { LAYER_CHANGE_EVENT } from 'screens/EditorScreen/const';
import { getClasses, trigger } from 'utils';
import { isLayerSelected, setLayerAction } from 'state/layerActions';

import { observableAttrs } from 'hoc/observable';
import { Div } from "components/Div";
import { HexMiniMapContainer } from './HexMiniMap';

interface Params extends ContainerParams {
    type: LAYER_TYPE;
    onClick: () => void;
}

function Layer({type, width, onClick}: Params) {
    const {title} = LAYER_CONFIG[type];

    return Div(
        [
            Div(title, {className: 'title'}),
            type === LAYER_TYPE.hex ? HexMiniMapContainer({width, title}) : null,
        ],
        {onClick}
    )
}


function getLayerKey(type: LAYER_TYPE) {
    return 'layer-'+type;
}

function selectLayerAction(type: LAYER_TYPE) {
    if (isLayerSelected(type)) return;

    // some layer is always selected
    const prevSelectedLayer = setLayerAction(type)!;
    trigger(getLayerKey(prevSelectedLayer));
    trigger(getLayerKey(type));
    trigger(LAYER_CHANGE_EVENT);
}

interface ContainerParams {
    width: number;
}

export const LayerContainers = Object.keys(LAYER_CONFIG).map((key) => {
    const type = parseInt(key);

    return observableAttrs(
        getLayerKey(type),
        ({width}: {width: number}) => Layer({
            type,
            width,
            onClick: () => selectLayerAction(type)
        }),
        [{
            name: 'className',
            value: () => getClasses(['layer', isLayerSelected(type) ? 'selected' : undefined]),
        }]
    )
})
