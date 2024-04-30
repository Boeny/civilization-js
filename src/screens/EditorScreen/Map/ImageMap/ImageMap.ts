import './ImageMap.css';
import { Button } from "components/Button/Button";
import { Canvas } from "components/Canvas/Canvas";
import { Div } from "components/Div";
import { observable } from "hoc/observable";
import { IMAGE_MAP_KEY } from "screens/EditorScreen/const";
import { getImageMapData, setImageMapData } from 'state/imageMapDataActions';
import { trigger, uploadFile } from 'utils';

interface Params extends ContainerParams {
    image?: CanvasImageSource;
    onLoadButtonClick: () => void;
}

function ImageMap({width, height, image, onLoadButtonClick}: Params) {
    return image ?
        Canvas((ctx) => {ctx.drawImage(image, 0, 0)}, {width, height})
    :
        Div(
            Button('Load Image', {onClick: onLoadButtonClick}),
            {id: 'image-map-load-button-container'}
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
            console.log(data)
            if (data) {
                setImageMapData(data);
                trigger(IMAGE_MAP_KEY);
            }
        }
    });
})
