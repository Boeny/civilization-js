// import { IMAGE_MAP_UPDATE_EVENT, LAYER_CHANGE_EVENT } from 'screens/EditorScreen/const';
// import { editorScreenStore } from 'screens/EditorScreen/store';
// import { LAYER_TYPE } from 'screens/EditorScreen/types';
// import { uploadFile } from 'utils';

// export function LoadImageButton() {
// if (layer !== LAYER_TYPE.image) {
//     return null;
// }
//     return Button(Text('Load Image'), {
//         onClick: async () => {
//             const data = await uploadFile();

//             if (data) {
//                 editorScreenStore.data[LAYER_TYPE.image] = data;
//                 trigger(IMAGE_MAP_UPDATE_EVENT);
//             }
//         },
//     });
// }
