import './Title.css'
import eyeOpened from 'assets/eye-opened.svg'
import eyeClosed from 'assets/eye-closed.svg'
import { Div } from "components/base/Div"
import { Svg } from "components/base/Svg"
import { observable } from 'hoc/observable'
import { trigger } from 'utils/components'
import { editorScreenStore } from 'screens/EditorScreen/store'
import { LAYER_TYPE_TO_MAP_STORE } from 'screens/EditorScreen/const'

interface Params {
    image: string
    onClick: (e: MouseEvent) => void
}
function EyeButton({image, onClick}: Params) {
    return Div(
        Svg(image, {width: 20}),
        {className: 'eye', onClick}
    )
}


const EYE_BUTTON_EVENT = 'toggle-eye-button'

const EyeButtonHandleObservable = observable(EYE_BUTTON_EVENT, () => {
    const mapType = LAYER_TYPE_TO_MAP_STORE[editorScreenStore.layer.value]
    if (!mapType) return null

    const mapStore = editorScreenStore[mapType]

    return EyeButton({
        image: mapStore.value ? eyeOpened : eyeClosed,
        onClick: (e) => {
            e.stopPropagation()
            mapStore.value = mapStore.value === null ? mapStore.prev : null
            trigger(EYE_BUTTON_EVENT)
        }
    })
})


export function Title({title}: {title: string}) {
    return Div(
        [
            Div(title),
            EyeButtonHandleObservable(),
        ],
        {className: 'title'}
    )
}
