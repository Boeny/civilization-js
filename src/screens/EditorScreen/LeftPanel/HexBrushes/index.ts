import { Div } from "modules/renderer"
import { BrushButtonObserver } from "./BrushButton"

export function HexBrushes() {
    return Div(
        BrushButtonObserver.map((component) => component()),
        {style: {paddingBottom: 80}}
    )
}
