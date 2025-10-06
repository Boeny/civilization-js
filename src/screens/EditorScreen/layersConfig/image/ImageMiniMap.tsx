import { Button } from 'components/Button';
import { Canvas } from 'components/canvas/Canvas';
import { IPoint, LAYER_TYPE } from 'types';

import { useLayerObservableStore } from '../../layerStore';
import { IMiniMapProps } from '../types';

import { uploadFile } from './ImageMap/utils';
import { useImageMapObservableStore } from './imageMapStore';

interface Props {
    panelWidth: number;
    title: string;
    data: HTMLImageElement;
    onClick?: (ctx: CanvasRenderingContext2D, point: IPoint) => void;
}

const ImageMiniMapComponent = ({ data, title, onClick, ...props }: Props) => {
    const width = props.panelWidth - 29;
    const height = (width * data.height) / data.width;

    return (
        <Canvas
            id="image-minimap"
            title={title}
            width={width}
            height={height}
            style={{
                maxHeight: 170,
                cursor: 'pointer',
            }}
            onClick={onClick}
        >
            {(ctx) => ctx.drawImage(data, 0, 0, width, height)}
        </Canvas>
    );
};

export const ImageMiniMap = ({ title, setMapCommonParams, ...props }: IMiniMapProps) => {
    const {
        store: { data },
        setStore: setImageMap,
    } = useImageMapObservableStore();
    const { layer } = useLayerObservableStore().store;

    const isSelected = layer === LAYER_TYPE.image;

    const loadImage = async () => {
        const newData = await uploadFile();

        if (!newData) {
            return;
        }

        setMapCommonParams(newData.width, newData.height);
        setImageMap({ data: newData });
    };

    const handleImageMiniMapClick = () => {
        if (isSelected) {
            loadImage();
        }
    };

    if (!data) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100,
                }}
            >
                <Button onClick={loadImage}>Load Image</Button>
            </div>
        );
    }

    return (
        <ImageMiniMapComponent
            {...props}
            title={isSelected ? 'Load new image' : title}
            data={data}
            onClick={handleImageMiniMapClick}
        />
    );
};
