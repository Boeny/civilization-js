import { Canvas } from 'components/canvas/Canvas';
import { IPoint, LAYER_TYPE } from 'types';

import { useLayerObservableStore } from '../../layerStore';
import { IMiniMapProps } from '../types';

import { LoadImageButton } from './ImageMap/LoadImageButton';
import { uploadFile } from './ImageMap/utils';
import { useImageMapObservableStore } from './imageMapStore';

interface IProps extends IMiniMapProps {
    data: HTMLImageElement;
    onClick?: (ctx: CanvasRenderingContext2D, point: IPoint) => void;
}

const ImageMiniMapComponent = ({ data, title, onClick, ...props }: IProps) => {
    const width = props.width - 29;
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

export const ImageMiniMap = ({ title, width }: IMiniMapProps) => {
    const {
        store: { data },
        setStore: setImageMap,
    } = useImageMapObservableStore();
    const { layer } = useLayerObservableStore().store;

    const isSelected = layer === LAYER_TYPE.image;

    const handleDataUpdate = (newData: HTMLImageElement) => {
        setImageMap({ data: newData });
    };

    const handleClick = async () => {
        if (!isSelected) {
            return;
        }

        const newData = await uploadFile();

        if (newData) {
            handleDataUpdate(newData);
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
                <LoadImageButton onDataUpdate={handleDataUpdate} />
            </div>
        );
    }

    return (
        <ImageMiniMapComponent
            width={width}
            title={isSelected ? 'Load new image' : title}
            data={data}
            onClick={handleClick}
        />
    );
};
