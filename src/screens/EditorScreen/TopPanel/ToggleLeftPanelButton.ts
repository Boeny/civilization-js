// import { ArrowButton } from 'components/ArrowButton';
// import { showOnLayer } from 'hoc/showOnLayer';

// import { LAYER_CHANGE_EVENT, LEFT_PANEL_TOGGLE_EVENT } from '../const';
// import { editorScreenStore } from '../store';
// import { LAYER_TYPE } from '../types';

// export const ToggleLeftPanelButtonObserver = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, () =>
//     ArrowButton({
//         onClick: () => {
//             const { isLeftPanelOpened } = editorScreenStore;
//             isLeftPanelOpened.value = !isLeftPanelOpened.value;
//             trigger(LEFT_PANEL_TOGGLE_EVENT);
//         },
//     }),
// );
