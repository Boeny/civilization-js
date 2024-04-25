import './Layer.css';

import { observable, observableAttrs } from 'hoc/observer';
import { setLayerAction, isLayerSelected, selectLayerAction } from 'state/layerActions';
import { LAYER_CONFIG, LAYER_TYPE } from 'const';
import { getClasses } from 'utils';

import { Div } from "components/Div";
import { ImageContainer } from './ImageContainer';

function Title(title: string) {
    return Div(title, {className: 'title'})
}

function getLayerKey(type: LAYER_TYPE) {
    return 'layer-'+type;
}

export function getLayerImageKey(type: LAYER_TYPE) {
    return 'layer-image-'+type;
}

function getLayerClassName(type: LAYER_TYPE): string {
    return getClasses(['layer', isLayerSelected(type) ? 'selected' : undefined]);
}

export function Layer(type: LAYER_TYPE) {
    const {title} = LAYER_CONFIG[type];
    const key = getLayerKey(type);
    setLayerAction(LAYER_TYPE.hex);

    return observableAttrs(
        key,
        Div(
            [
                Title(title),
                observable(getLayerImageKey(type), () => ImageContainer(title)),
            ],
            {
                className: getLayerClassName(type),
                onClick: () => selectLayerAction(type, getLayerKey)
            }
        ),
        [
            {
                name: 'className',
                value: () => getLayerClassName(type),
            }
        ]
    )
}
