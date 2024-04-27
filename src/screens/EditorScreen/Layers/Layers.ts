import './Layers.css';
import { Div } from "components/Div";
import { LayerContainers } from './Layer/Layer';

export function Layers({width}: {width: number}) {
    return Div(
        LayerContainers.map((component) => component({width})),
        {className: 'layers'}
    )
}
