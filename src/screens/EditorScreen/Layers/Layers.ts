import './Layers.css';
import { LAYER_CONFIG } from 'const';
import { Div } from "components/Div";
import { Layer } from './Layer/Layer';

export function Layers() {
    return Div(
        Object.keys(LAYER_CONFIG).map((type) => Layer(parseInt(type))),
        {className: 'layers'}
    )
}
