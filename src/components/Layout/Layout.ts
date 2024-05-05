import './Layout.css'
import { Content } from "types"
import { PANEL_CONFIG } from 'const'
import { getStyle } from 'utils'
import { Div, Params as DivParams } from "components/base/Div"

export interface Params extends DivParams {
}

export function Layout(content: Content, params?: Params) {
    return Div(
        content,
        {
            ...params,
            id: 'layout',
            style: getStyle({zIndex: PANEL_CONFIG.layout.zIndex}, params?.style),
        }
    )
}
