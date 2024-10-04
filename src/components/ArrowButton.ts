import arrow from 'assets/arrow-down.svg'
import { Button, IAttrs, Svg, getStyle } from 'modules/renderer'

export function ArrowButton({onClick, style, ...params}: IAttrs) {
    return Button(
        Svg(arrow, {width: 20}),
        {
            ...params,
            onClick,
            style: getStyle({padding: '4px 10px 0px'}, style),
        }
    )
}
