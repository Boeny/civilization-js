import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/Menu/MenuItem';
import { MenuPopup } from 'components/MenuPopup';
import { useBrushStore } from 'screens/EditorScreen/layersConfig/hex/stores/brushStore';
import { useGridStore } from 'screens/EditorScreen/layersConfig/hex/stores/gridSwitchStore';
import { useHexMapStore } from 'screens/EditorScreen/layersConfig/hex/stores/hexMapStore';
import { useImageMapStore } from 'screens/EditorScreen/layersConfig/image/imageMapStore';
import { useLayerStore } from 'screens/EditorScreen/layerStore';
import { useScreenStore } from 'screenStore';
import { SCREEN_TYPE } from 'types';

import { OptionsMenu } from '../OptionsMenu';

export function EditorMenu() {
    const setScreen = useScreenStore().setStore;
    const resetLayer = useLayerStore().reset;
    const resetHexMap = useHexMapStore().reset;
    const resetImageMap = useImageMapStore().reset;
    const resetBrush = useBrushStore().reset;
    const resetGrid = useGridStore().reset;

    return (
        <Menu
            toggleMenuOnBackAction
            component={MenuPopup}
            item={Button}
        >
            <MenuItem
                title="Back to the editor"
                action="back"
            />

            <MenuItem
                title="New map"
                onClick={() => {
                    resetLayer();
                    resetHexMap();
                    resetImageMap();
                    resetBrush();
                    resetGrid();
                }}
                action="close"
            />

            <MenuItem title="Editor options">
                <OptionsMenu onApply={() => {}} />
            </MenuItem>

            <MenuItem
                title="Back to main menu"
                onClick={() => setScreen({ screen: SCREEN_TYPE.main })}
            />
        </Menu>
    );
}
