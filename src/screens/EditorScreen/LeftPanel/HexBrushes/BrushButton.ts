// import './styles.css';

// import { HEX_CONFIG } from 'screens/EditorScreen/const';
// import { editorScreenStore } from 'screens/EditorScreen/store';
// import { HEX_TYPE } from 'screens/EditorScreen/types';

// interface IParams {
//     type: HEX_TYPE;
//     onClick: () => void;
// }
// function BrushButton({ type, onClick }: IParams) {
//     const { title, color } = HEX_CONFIG[type];

//     return Div(Text(title), {
//         style: { background: color },
//         onClick,
//     });
// }

// function getBrushEvent(type: HEX_TYPE): string {
//     return 'brush-button' + type;
// }

// export const BrushButtonObserver = Object.keys(HEX_CONFIG).map((key) => {
//     const type = parseInt(key);
//     const event = getBrushEvent(type);

//     return observerAttrs(
//         event,
//         () =>
//             BrushButton({
//                 type,
//                 onClick: () => {
//                     const { brush } = editorScreenStore;

//                     if (brush.value !== null && brush.value !== type) {
//                         const prev = brush.value;
//                         brush.value = type;
//                         trigger(getBrushEvent(prev));
//                     } else {
//                         brush.value = null;
//                     }

//                     trigger(getBrushEvent(type));
//                 },
//             }),
//         [
//             {
//                 name: 'className',
//                 value: () => getClasses(['brush', editorScreenStore.brush.value === type ? 'selected' : undefined]),
//             },
//         ],
//     );
// });
