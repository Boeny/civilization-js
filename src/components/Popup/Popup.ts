import './Popup.css'
import { Content } from "types"
import { getClasses } from "utils"
import { Div, Params as DivParams } from "../base/Div"
import { Layout } from 'components/Layout/Layout'

interface Params extends DivParams {
}

export function Popup(content: Content, params?: Params) {
    return Layout(
        Div(content, {
            ...params,
            className: getClasses(['popup', params?.className])
        })
    )
}
