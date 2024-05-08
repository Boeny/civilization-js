import { LAYER_CHANGE_EVENT, LEFT_PANEL_TOGGLE_EVENT } from '../const'
import { showOnLayer } from 'hoc/showOnLayer'
import { ArrowButton } from 'components/ArrowButton'
import { editorScreenStore } from '../store'
import { trigger } from 'utils/components'
import { LAYER_TYPE } from '../types'

export const ToggleLeftPanelButtonContainer = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, () =>
    ArrowButton({onClick: () => {
        const {isLeftPanelOpened} = editorScreenStore
        isLeftPanelOpened.value = !isLeftPanelOpened.value
        trigger(LEFT_PANEL_TOGGLE_EVENT)
    }})
)
