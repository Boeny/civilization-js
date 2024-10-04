import './Panel.css'
import { Div, Content, IAttrs } from 'modules/renderer'

export function Panel(content?: Content, params?: IAttrs) {
    return Div(
        content,
        {
            className: 'panel',
            ...params,
        }
    )
}
