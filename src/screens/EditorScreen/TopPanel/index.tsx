// import './styles.css';

// import { CSSProperties } from 'react';

// import { ArrowButton } from 'components/ArrowButton';
// import { Panel } from 'components/Panel';
// import { Z_INDEX_CONFIG } from 'const';

// import { RIGHT_PANEL_TOGGLE_EVENT } from '../const';
// import { editorScreenStore } from '../store';

// import { ToggleLeftPanelButtonObserver } from './ToggleLeftPanelButton';
// import { ToggleMapGridButtonToggleObserver } from './ToggleMapGridButton';

// export interface ITopPanelParams {
//     style?: CSSProperties;
//     rightPanelWidth: number;
//     openMenu: () => void;
// }
// export function TopPanel({ rightPanelWidth, openMenu, style }: ITopPanelParams) {
//     return <Panel style={{ ...style }}></Panel>;

//     return Panel(
//         [
//             Div([<button onClick={openMenu}>Open menu</button>, ToggleLeftPanelButtonObserver(), ToggleMapGridButtonToggleObserver()], {
//                 style: { display: 'flex' },
//             }),

//             Div(
//                 ArrowButton({
//                     onClick: () => {
//                         const { isRightPanelOpened } = editorScreenStore;
//                         isRightPanelOpened.value = !isRightPanelOpened.value;
//                         trigger(RIGHT_PANEL_TOGGLE_EVENT);
//                     },
//                 }),
//                 { style: { display: 'flex', width: rightPanelWidth } },
//             ),
//         ],
//         {
//             ...params,
//             id: 'top-panel',
//             style: getStyle({ zIndex: Z_INDEX_CONFIG.top.zIndex }, params?.style),
//         },
//     );
// }
