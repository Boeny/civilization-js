import './Layout.css'
import { Content, Div, IAttrs, getStyle } from 'modules/renderer'
import { Z_INDEX_CONFIG } from 'const'

export function Layout(content: Content, params?: IAttrs) {
    return Div(
        content,
        {
            ...params,
            id: 'layout',
            style: getStyle({zIndex: Z_INDEX_CONFIG.layout.zIndex}, params?.style),
        }
    )
}
