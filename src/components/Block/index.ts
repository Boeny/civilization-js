import './Block.css'
import { Div, IAttrs, Content, getClasses } from 'modules/renderer'

export interface IBlockParams extends IAttrs {
    bordered?: boolean
    alignedVertically?: boolean
}
export function Block(content?: Content, params?: IBlockParams) {
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
