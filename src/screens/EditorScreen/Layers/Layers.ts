import './Layers.css';

import { observable } from 'hoc/observer';
import { setLayerAction, isLayerSelected, selectLayerAction } from 'state/layerActions';
import { LAYER_CONFIG, LAYER_TYPE } from 'const';
import { getClasses } from 'utils';

import { Img } from 'components/Img';
import { Div } from "components/Div";

function Title(title: string) {
    return Div(title, {className: 'title'})
}

function ImageContainer(title: string) {
    return Img('image', {className: 'image-container', alt: title, title})
}

function getLayerKey(type: LAYER_TYPE) {
    return 'layer-'+type;
}

function Layer(type: LAYER_TYPE) {
    const {title} = LAYER_CONFIG[type];
    const key = getLayerKey(type);
    setLayerAction(LAYER_TYPE.hex);

    return observable(key, () =>
        Div(
            [
                Title(title),
                ImageContainer(title)
            ],
            {
                className: getClasses(['layer', isLayerSelected(type) ? 'selected' : undefined]),
                onClick: () => selectLayerAction(type, getLayerKey)
            }
        )
    )
}

export function Layers() {
    return Div(
        Object.keys(LAYER_CONFIG).map((type) => Layer(parseInt(type))),
        {className: 'layers'}
    )
}
