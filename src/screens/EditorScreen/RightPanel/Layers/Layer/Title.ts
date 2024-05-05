import './Title.css'
import eye from 'assets/eye-open.svg'
import { Div } from "components/base/Div"
import { Svg } from "components/base/Svg"

export function Title({title}: {title: string}) {
    return Div(
        [
            Div(title),
            Div(
                Svg(eye, {width: 20}),
                {className: 'eye', onClick: (e) => {
                    e.stopPropagation()
                }}
            )
        ],
        {className: 'title'}
    )
}
