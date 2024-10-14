// import './styles.css';
// import { Panel } from 'components/Panel';
// import { Z_INDEX_CONFIG } from 'const';
// import { RIGHT_PANEL_TOGGLE_EVENT } from 'screens/EditorScreen/const';

// import { editorScreenStore } from '../store';

// import { Layers } from './Layers';

// const RIGHT_PANEL = { innerWidth: 200, padding: 20 };
// export const RIGHT_PANEL_WIDTH = RIGHT_PANEL.innerWidth + RIGHT_PANEL.padding * 2;

// function RightPanel() {
//     return Panel(Layers({ width: RIGHT_PANEL.innerWidth }), {
//         id: 'right-panel',
//         style: {
//             width: RIGHT_PANEL.innerWidth,
//             paddingLeft: RIGHT_PANEL.padding,
//             paddingRight: RIGHT_PANEL.padding,
//             paddingBottom: RIGHT_PANEL.padding,
//             left: `calc(100% - ${RIGHT_PANEL_WIDTH}px)`,
//             zIndex: Z_INDEX_CONFIG.right.zIndex,
//         },
//     });
// }

// export const RightPanelToggleObserver = observer(RIGHT_PANEL_TOGGLE_EVENT, () =>
//     editorScreenStore.isRightPanelOpened.value ? RightPanel() : null,
// );
