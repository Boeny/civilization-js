import './Popup.css'
import { Content } from "types/components"
import { getClasses } from "utils/components"
import { Div, Params as DivParams } from "../base/Div"
import { Layout } from 'components/Layout'

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
