import { LAYER_TYPE } from 'const'
import { LAYER_CHANGE_EVENT, LEFT_PANEL_TOGGLE_EVENT } from '../const'
import { trigger } from 'utils'
import { showOnLayer } from 'hoc/showOnLayer'
import { ArrowButton } from 'components/ArrowButton'
import { toggleLeftPanelOpened } from 'state/leftPanelActions'

export const ToggleLeftPanelButtonContainer = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, () =>
    ArrowButton({onClick: () => {
        toggleLeftPanelOpened()
        trigger(LEFT_PANEL_TOGGLE_EVENT)
    }})
)
