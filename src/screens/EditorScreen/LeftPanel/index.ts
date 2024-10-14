// import './styles.css';
// import { Panel } from 'components/Panel';
// import { Z_INDEX_CONFIG } from 'const';
// import { showOnLayer } from 'hoc/showOnLayer';
// import { LAYER_CHANGE_EVENT, LEFT_PANEL_TOGGLE_EVENT } from 'screens/EditorScreen/const';

// import { editorScreenStore } from '../store';
// import { LAYER_TYPE } from '../types';

// import { HexBrushes } from './HexBrushes';

// function LeftPanel() {
//     return Panel(HexBrushes(), {
//         id: 'left-panel',
//         style: { zIndex: Z_INDEX_CONFIG.left.zIndex },
//     });
// }

// const LeftPanelToggleContainer = observer(LEFT_PANEL_TOGGLE_EVENT, () => (editorScreenStore.isLeftPanelOpened.value ? LeftPanel() : null));

// export const LeftPanelContainer = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, LeftPanelToggleContainer);
