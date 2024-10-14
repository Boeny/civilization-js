// import { showOnLayer } from 'hoc/showOnLayer';
// import { IMAGE_MAP_UPDATE_EVENT, LAYER_CHANGE_EVENT } from 'screens/EditorScreen/const';
// import { editorScreenStore } from 'screens/EditorScreen/store';
// import { LAYER_TYPE } from 'screens/EditorScreen/types';
// import { uploadFile } from 'utils';

// function LoadImageButton() {
//     return Button(Text('Load Image'), {
//         onClick: async () => {
//             const data = await uploadFile();

//             if (data) {
//                 editorScreenStore.imageMapData.value = data;
//                 trigger(IMAGE_MAP_UPDATE_EVENT);
//             }
//         },
//     });
// }

// export const LoadImageButtonToggleObserver = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.image, LoadImageButton);
