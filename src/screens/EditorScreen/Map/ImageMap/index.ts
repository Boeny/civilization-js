/* eslint-disable @typescript-eslint/no-unused-vars */
// import './styles.css';

// import { LAYER_CONFIG } from 'screens/EditorScreen/const';
// import { LAYER_TYPE } from 'screens/EditorScreen/types';

// import { LoadImageButtonToggleObserver } from './LoadImageButton';

interface IProps {
    data: CanvasImageSource | null;
    width: number;
    height: number;
}
export function ImageMap({ width, height, data }: IProps) {
    return null;

    // return image
    //     ? Canvas(
    //           (ctx) => {
    //               ctx.drawImage(image, 0, 0);
    //           },
    //           {
    //               id: 'image-map',
    //               width,
    //               height,
    //               style: { zIndex: LAYER_CONFIG[LAYER_TYPE.image].zIndex },
    //           },
    //       )
    //     : Div(LoadImageButtonToggleObserver(), {
    //           id: 'image-map',
    //           style: { height: 'calc(100% - 32px)' },
    //       });
}
