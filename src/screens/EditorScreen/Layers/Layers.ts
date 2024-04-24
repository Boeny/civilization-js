import './Layers.css';

import { observable } from 'hoc/observer';
import { isAnyLayerSelected, isLayerSelected, setLayerAction } from 'state/layerActions';
import { LAYER_CONFIG, LAYER_TYPE } from 'const';
import { getClasses, trigger } from 'utils';

import { Img } from 'components/Img';
import { Div } from "components/Div";
import { STATE } from 'state/state';

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
                onClick: () => {
                    if (isLayerSelected(type)) return;

                    if (isAnyLayerSelected()) {
                        const prevSelectedLayer = setLayerAction(type)!;
                        trigger(getLayerKey(prevSelectedLayer));
                        trigger(key);
                        return;
                    }

                    setLayerAction(type);
                    trigger(key);
                }
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
