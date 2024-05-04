import { Div } from "components/base/Div"
import { BrushButtonContainers } from "./BrushButton"

export function HexBrushes() {
    return Div(
        BrushButtonContainers.map((component) => component()),
        {style: {paddingBottom: 80}}
    )
}
