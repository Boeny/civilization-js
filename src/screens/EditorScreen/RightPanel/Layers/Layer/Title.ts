import './Title.css'
import eyeOpened from 'assets/eye-opened.svg'
import eyeClosed from 'assets/eye-closed.svg'
import { Div } from "components/base/Div"
import { Svg } from "components/base/Svg"
import { observable } from 'hoc/observable'
import { trigger } from 'utils'

const EYE_BUTTON_EVENT = 'toggle-eye-button'
const EYE_STATE = {open: true}

const EyeButtonContainer = observable(EYE_BUTTON_EVENT, () =>
    Div(
        Svg(EYE_STATE.open ? eyeOpened : eyeClosed, {width: 20}),
        {
            className: 'eye',
            onClick: (e) => {
                e.stopPropagation()
                EYE_STATE.open = !EYE_STATE.open
                trigger(EYE_BUTTON_EVENT)
            }
        }
    )
)

export function Title({title}: {title: string}) {
    return Div(
        [
            Div(title),
            EyeButtonContainer(),
        ],
        {className: 'title'}
    )
}
