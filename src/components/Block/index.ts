import './Block.css'
import { getClasses } from "utils/components"
import { Div, Params as DivParams } from "../base/Div"
import { Content } from 'types/components'

export interface Params extends DivParams {
    bordered?: boolean
    alignedVertically?: boolean
}
export function Block(content?: Content, params?: Params) {
    const {bordered, alignedVertically, className, ...rest} = params || {}

    return Div(
        content,
        {
            ...rest,
            className: getClasses([
                'block',
                bordered && 'bordered',
                alignedVertically && 'flex-column',
                className
            ])
        }
    )
}
