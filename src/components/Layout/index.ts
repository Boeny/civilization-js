import './Layout.css'
import { Content } from "types/components"
import { getStyle } from 'utils/components'
import { Div, Params as DivParams } from "components/base/Div"
import { Z_INDEX_CONFIG } from 'const'

export interface Params extends DivParams {
}
export function Layout(content: Content, params?: Params) {
    return Div(
        content,
        {
            ...params,
            id: 'layout',
            style: getStyle({zIndex: Z_INDEX_CONFIG.layout.zIndex}, params?.style),
        }
    )
}
