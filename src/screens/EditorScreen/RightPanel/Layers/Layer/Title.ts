// import './Title.css';

// import eyeClosed from 'assets/eye-closed.svg';
// import eyeOpened from 'assets/eye-opened.svg';
// import { LAYER_TYPE_TO_MAP_STORE } from 'screens/EditorScreen/const';
// import { editorScreenStore } from 'screens/EditorScreen/store';

// interface IParams {
//     image: string;
//     onClick: (e: MouseEvent) => void;
// }
// function EyeButton({ image, onClick }: IParams) {
//     return Div(Svg(image, { width: 20 }), { className: 'eye', onClick });
// }

// const EYE_BUTTON_EVENT = 'toggle-eye-button';

// const EyeButtonHandleObserver = observer(EYE_BUTTON_EVENT, () => {
//     const mapType = LAYER_TYPE_TO_MAP_STORE[editorScreenStore.layer.value];
//     if (!mapType) return null;

//     const mapStore = editorScreenStore[mapType];

//     return EyeButton({
//         image: mapStore.value ? eyeOpened : eyeClosed,
//         onClick: (e) => {
//             e.stopPropagation();
//             mapStore.value = mapStore.value === null ? mapStore.prev : null;
//             trigger(EYE_BUTTON_EVENT);
//         },
//     });
// });

// export function Title({ title }: { title: string }) {
//     return Div([Div(Text(title)), EyeButtonHandleObserver()], {
//         className: 'title',
//     });
// }
