import './TopPanel.css'
import { Z_INDEX_CONFIG } from 'const'
import { RIGHT_PANEL_TOGGLE_EVENT } from '../const'
import { ArrowButton } from 'components/ArrowButton'
import { Panel, Params as PanelParams } from "components/Panel"
import { Div } from 'components/base/Div'
import { OpenMenuButton } from 'screens/OpenMenuButton'
import { ToggleLeftPanelButtonContainer } from './ToggleLeftPanelButton'
import { ToggleMapGridButtonToggleObservable } from './ToggleMapGridButton'
import { editorScreenStore } from '../store'
import { getStyle, trigger } from 'utils/components'

export interface Params extends PanelParams {
    rightPanelWidth: number
    openMenu: () => void
}
export function TopPanel({rightPanelWidth, openMenu, ...params}: Params) {
    return Panel(
        [
            Div(
                [
                    OpenMenuButton({openMenu}),
                    ToggleLeftPanelButtonContainer(),
                    ToggleMapGridButtonToggleObservable(),
                ],
                {style: {display: 'flex'}}
            ),

            Div(
                ArrowButton({onClick: () => {
                    const {isRightPanelOpened} = editorScreenStore
                    isRightPanelOpened.value = !isRightPanelOpened.value
                    trigger(RIGHT_PANEL_TOGGLE_EVENT)
                }}),
                {style: {display: 'flex', width: rightPanelWidth}}
            ),
        ],
        {
            ...params,
            id: 'top-panel',
            style: getStyle({zIndex: Z_INDEX_CONFIG.top.zIndex}, params?.style),
        }
    )
}
