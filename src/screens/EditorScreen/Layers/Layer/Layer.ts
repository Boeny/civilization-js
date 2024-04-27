import './Layer.css';

import { observableAttrs } from 'hoc/observable';
import { isLayerSelected, selectLayerAction } from 'state/layerActions';
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

function getLayerClassName(type: LAYER_TYPE): string {
    return getClasses(['layer', isLayerSelected(type) ? 'selected' : undefined]);
}

interface Params extends ContainerParams {
    type: LAYER_TYPE;
    onClick: () => void;
}

function Layer({type, width, onClick}: Params) {
    const {title} = LAYER_CONFIG[type];

    return Div(
        [
            Title(title),
            ImageContainer({width, title}),
        ],
        {onClick}
    )
}

interface ContainerParams {
    width: number;
}

export const LayerContainers = Object.keys(LAYER_CONFIG).map((key) => {
    const type = parseInt(key);

    return observableAttrs(
        getLayerKey(type),
        ({width}: {width: number}) => Layer({type, width, onClick: () => selectLayerAction(type, getLayerKey)}),
        [{
            name: 'className',
            value: () => getLayerClassName(type),
        }]
    )
})
