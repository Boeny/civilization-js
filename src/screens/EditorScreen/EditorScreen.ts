import '../Screen.css'
import { RIGHT_PANEL_TOGGLE_EVENT } from 'screens/EditorScreen/const'
import { trigger } from "utils"
import { toggleRightPanelOpened } from 'state/rightPanelActions'

import { ArrowButton } from 'components/ArrowButton'
import { Div } from 'components/base/Div'
import { OpenMenuButton } from "../OpenMenuButton"
import { TopPanel } from './TopPanel/TopPanel'
import { ToggleLeftPanelButtonContainer } from './TopPanel/ToggleLeftPanelButton'
import { ToggleMapGridButtonContainer } from './TopPanel/ToggleMapGridButton'
import { LeftPanelContainer } from './LeftPanel/LeftPanel'
import { RIGHT_PANEL_WIDTH, RightPanelContainer } from './RightPanel/RightPanel'
import { Map } from './Map/Map'

const TOP_PANEL_HEIGHT = 32

export function EditorScreen({openMenu}: {openMenu: () => void}) {
    return Div(
        [
            Map({
                width: window.innerWidth,
                height: window.innerHeight - TOP_PANEL_HEIGHT,
            }),

            TopPanel(
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
                        {style: {display: 'flex', width: RIGHT_PANEL_WIDTH}}
                    ),
                ],
                {style: {height: TOP_PANEL_HEIGHT}}
            ),

            LeftPanelContainer(),
            RightPanelContainer(),
        ],
        {className: 'screen', style: {paddingTop: TOP_PANEL_HEIGHT}}
    )
}
