import { Div } from "components/Div";
import { BrushButtonContainers } from "./BrushButton";

export function HexBrushes() {
    return Div(
        BrushButtonContainers.map((component) => component()),
        {paddingBottom: 80}
    )
}
