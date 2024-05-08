import { Div } from "components/base/Div"
import { BrushButtonObservableAttrs } from "./BrushButton"

export function HexBrushes() {
    return Div(
        BrushButtonObservableAttrs.map((component) => component()),
        {style: {paddingBottom: 80}}
    )
}
