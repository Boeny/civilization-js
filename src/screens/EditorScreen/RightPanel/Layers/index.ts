import './Layers.css'
import { Div } from "components/base/Div"
import { LayersClickHandlerObservableAttrs } from './Layer'

export function Layers({width}: {width: number}) {
    return Div(
        LayersClickHandlerObservableAttrs.map((component) => component({width})),
        {className: 'layers'}
    )
}
