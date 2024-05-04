import arrow from 'assets/arrow_down.svg'
import { Button, Params as ButtonParams } from "components/base/Button/Button"
import { Svg } from "components/base/Svg"

export interface Params extends ButtonParams {
    onClick: () => void
}

export function ArrowButton({onClick, ...params}: Params) {
    return Button(
        Svg(arrow, {width: 20}),
        {onClick, style: {padding: '4px 11px'}, ...params}
    )
}
