import './HexBrushes.css';
import { Button } from "components/Button/Button";
import { Div } from "components/Div";
import { HEX_NAME, HEX_COLOR } from "const";

export function HexBrushes() {
    return Div(
        Object.keys(HEX_NAME).map((type) => {
            return Button(
                HEX_NAME[type],
                {
                    className: 'brush',
                    background: HEX_COLOR[type],
                    onClick: () => {}
                }
            )
        })
    )
}
