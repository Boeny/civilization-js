import './Layers.css'
import { Div } from "modules/renderer"
import { LayersClickHandlerObserver } from './Layer'

interface IParams {
    width: number
}
export function Layers({width}: IParams) {
    return Div(
        LayersClickHandlerObserver.map((component) => component({width})),
        {className: 'layers'}
    )
}
