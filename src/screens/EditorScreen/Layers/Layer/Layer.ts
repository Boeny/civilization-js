import './Layer.css';

import { observableAttrs } from 'hoc/observable';
import { isLayerSelected, selectLayerAction } from 'state/layerActions';
import { LAYER_CONFIG, LAYER_TYPE } from 'const';
import { getClasses } from 'utils';

import { Div } from "components/Div";
import { HexMiniMapContainer } from './HexMiniMap';
import { LAYER_MAP_KEY } from 'screens/EditorScreen/const';

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


export function getLayerKey(type: LAYER_TYPE) {
    return 'layer-'+type;
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
            onClick: () => selectLayerAction(type, LAYER_MAP_KEY, getLayerKey)
        }),
        [{
            name: 'className',
            value: () => getClasses(['layer', isLayerSelected(type) ? 'selected' : undefined]),
        }]
    )
})
