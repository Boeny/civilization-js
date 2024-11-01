import './styles.css';

import { memo } from 'react';

import { ArrowButton } from 'components/ArrowButton';
import { MenuItem } from 'components/Menu/MenuItem';
import { Panel } from 'components/Panel';
import { Z_INDEX_CONFIG } from 'const';

import { RIGHT_PANEL_WIDTH, TOP_PANEL_HEIGHT } from '../const';

import { ToggleGridButton } from './ToggleGridButton';

interface IProps {
    isHex: boolean;
    toggleLeftPanel: () => void;
    toggleRightPanel: () => void;
}
export const TopPanel = memo(({ isHex, toggleLeftPanel, toggleRightPanel }: IProps) => {
    return (
        <Panel
            id="top-panel"
            style={{ zIndex: Z_INDEX_CONFIG.top.zIndex, height: TOP_PANEL_HEIGHT }}
        >
            <div style={{ display: 'flex' }}>
                <MenuItem
                    name="Open menu"
                    action="back"
                />

                {isHex && (
                    <>
                        <ArrowButton onClick={toggleLeftPanel} />
                        <ToggleGridButton />
                    </>
                )}
            </div>

            <div style={{ display: 'flex', width: RIGHT_PANEL_WIDTH }}>
                <ArrowButton onClick={toggleRightPanel} />
            </div>
        </Panel>
    );
});
