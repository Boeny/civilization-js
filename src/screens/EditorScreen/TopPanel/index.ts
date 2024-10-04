import './TopPanel.css'
import { Div, IAttrs } from 'modules/renderer'
import { trigger } from 'modules/observer'

import { Z_INDEX_CONFIG } from 'const'
import { RIGHT_PANEL_TOGGLE_EVENT } from '../const'
import { getStyle } from 'modules/renderer/src/utils'
import { editorScreenStore } from '../store'

import { ArrowButton } from 'components/ArrowButton'
import { Panel } from "components/Panel"
import { OpenMenuButton } from 'screens/OpenMenuButton'
import { ToggleLeftPanelButtonObserver } from './ToggleLeftPanelButton'
import { ToggleMapGridButtonToggleObserver } from './ToggleMapGridButton'


export interface ITopPanelParams extends IAttrs {
    rightPanelWidth: number
    openMenu: () => void
}
export function TopPanel({rightPanelWidth, openMenu, ...params}: ITopPanelParams) {
    return Panel(
        [
            Div(
                [
                    OpenMenuButton({openMenu}),
                    ToggleLeftPanelButtonObserver(),
                    ToggleMapGridButtonToggleObserver(),
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
