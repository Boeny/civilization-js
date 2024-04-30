import './ImageMap.css';
import { Button } from "components/Button/Button";
import { Canvas } from "components/Canvas/Canvas";
import { Div } from "components/Div";
import { LAYER_TYPE } from 'const';
import { observable } from "hoc/observable";
import { showOnLayer } from 'hoc/showOnLayer';
import { IMAGE_MAP_KEY, MAP_KEY } from "screens/EditorScreen/const";
import { getImageMapData, setImageMapData } from 'state/imageMapDataActions';
import { trigger, uploadFile } from 'utils';

function LoadImageButton({onClick}: {onClick: () => void}) {
    return Button('Load Image', {onClick});
}

const LoadImageButtonContainer = showOnLayer(MAP_KEY, LAYER_TYPE.image, LoadImageButton)


interface Params extends ContainerParams {
    image?: CanvasImageSource;
    onLoadButtonClick: () => void;
}

function ImageMap({width, height, image, onLoadButtonClick}: Params) {
    return image ?
        Canvas((ctx) => {ctx.drawImage(image, 0, 0)}, {width, height})
    :
        Div(
            LoadImageButtonContainer({onClick: onLoadButtonClick}),
            {id: 'image-map-load-button-container', height: 'calc(100% - 32px)'}
        )
}

interface ContainerParams {
    width: number;
    height: number;
}

export const ImageMapContainer = observable(IMAGE_MAP_KEY, (params: ContainerParams) => {
    return ImageMap({
        ...params,
        image: getImageMapData(),
        onLoadButtonClick: async () => {
            const data = await uploadFile();

            if (data) {
                setImageMapData(data);
                trigger(IMAGE_MAP_KEY);
            }
        }
    });
})
