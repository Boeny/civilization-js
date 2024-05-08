import { getStyle } from 'utils/components'
import arrow from 'assets/arrow-down.svg'
import { Svg } from "components/base/Svg"
import { Button, Params as ButtonParams } from "components/base/Button"

export interface Params extends ButtonParams {
    onClick: () => void
}
export function ArrowButton({onClick, style, ...params}: Params) {
    return Button(
        Svg(arrow, {width: 20}),
        {
            ...params,
            onClick,
            style: getStyle({padding: '4px 10px 0px'}, style),
        }
    )
}
