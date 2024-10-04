import './Popup.css'
import { Content, Div, IAttrs, getClasses } from 'modules/renderer'
import { Layout } from 'components/Layout'

export function Popup(content: Content, params?: IAttrs) {
    return Layout(
        Div(content, {
            ...params,
            className: getClasses(['popup', params?.className])
        })
    )
}
