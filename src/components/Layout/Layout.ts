import './Layout.css'
import { Div, Params as DivParams } from "components/base/Div"
import { Content } from "types"

export interface Params extends DivParams {
}

export function Layout(content: Content, params?: Params) {
    return Div(content, {...params, id: 'layout'})
}
