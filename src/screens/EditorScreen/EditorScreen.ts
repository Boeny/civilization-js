import '../Screen.css';

import { LEFT_PANEL_KEY, RIGHT_PANEL_KEY } from 'screens/EditorScreen/const';
import { generateEmptyMapData } from "logic";
import { body, trigger } from "utils";

import { setHexWidthAction } from 'state/hexWidthActions';
import { setHexMapDataAction } from 'state/mapActions';
import { toggleLeftPanelOpened } from 'state/leftPanelActions';
import { toggleRightPanelOpened } from 'state/rightPanelActions';

import { cacheParams } from 'hoc/cacheParams';

import { EditorMenu } from "popups/menus/EditorMenu";
import { Div } from 'components/Div';
import { OpenMenuButton } from "../OpenMenuButton";
import { TopPanel } from './TopPanel/TopPanel';
import { ToggleLeftPanelButton } from './ToggleLeftPanelButton';
import { ToggleRightPanelButton } from './ToggleRightPanelButton';
import { ToggleMapGridButtonContainer } from './ToggleMapGridButton';
import { LeftPanelContainer } from './LeftPanel/LeftPanel';
import { RIGHT_PANEL_WIDTH, RightPanelContainer } from './RightPanel/RightPanel';
import { MapContainer } from './Map/Map';
import { setDefaultStateAction } from 'state/state';

const TOP_PANEL_HEIGHT = 32;

export interface Params {
    width: number;
    height: number;
    hexWidth: number;
}

function EditorScreenComponent({width, height, hexWidth}: Params) {
    setDefaultStateAction();
    setHexMapDataAction(generateEmptyMapData(width, height));
    setHexWidthAction(hexWidth);

    body(
        Div(
            [
                MapContainer({
                    width: window.innerWidth,
                    height: window.innerHeight - TOP_PANEL_HEIGHT,
                }),

                TopPanel(
                    [
                        Div(
                            [
                                OpenMenuButton({openMenu: EditorMenu}),
                                ToggleLeftPanelButton({onClick: () => {
                                    toggleLeftPanelOpened();
                                    trigger(LEFT_PANEL_KEY);
                                }}),
                                ToggleMapGridButtonContainer(),
                            ],
                            {display: 'flex'},
                        ),
                        Div(
                            ToggleRightPanelButton({onClick: () => {
                                toggleRightPanelOpened();
                                trigger(RIGHT_PANEL_KEY);
                            }}),
                            {display: 'flex', width: RIGHT_PANEL_WIDTH},
                        ),
                    ],
                    {height: TOP_PANEL_HEIGHT}
                ),

                LeftPanelContainer(),
                RightPanelContainer(),
            ],
            {id: 'editor-screen', className: 'screen', paddingTop: TOP_PANEL_HEIGHT}
        ),
        true
    );
}

export const EditorScreen = cacheParams(EditorScreenComponent);
