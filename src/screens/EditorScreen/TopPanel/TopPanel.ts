import './TopPanel.css'
import { PANEL_CONFIG } from 'const'
import { RIGHT_PANEL_TOGGLE_EVENT } from '../const'
import { getStyle, trigger } from 'utils'
import { toggleRightPanelOpened } from 'state/rightPanelActions'

import { ArrowButton } from 'components/ArrowButton'
import { Panel, Params as PanelParams } from "components/Panel/Panel"
import { Div } from 'components/base/Div'
import { OpenMenuButton } from 'screens/OpenMenuButton'
import { ToggleLeftPanelButtonContainer } from './ToggleLeftPanelButton'
import { ToggleMapGridButtonContainer } from './ToggleMapGridButton'

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
                    ToggleMapGridButtonContainer(),
                ],
                {style: {display: 'flex'}}
            ),

            Div(
                ArrowButton({onClick: () => {
                    toggleRightPanelOpened()
                    trigger(RIGHT_PANEL_TOGGLE_EVENT)
                }}),
                {style: {display: 'flex', width: rightPanelWidth}}
            ),
        ],
        {
            ...params,
            id: 'top-panel',
            style: getStyle({zIndex: PANEL_CONFIG.top.zIndex}, params?.style),
        }
    )
}
