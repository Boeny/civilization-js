import { Canvas } from 'components/canvas/Canvas';
import { useLayerObservableStore } from 'layerStore';
import { LAYER_TYPE } from 'types';

import { IMiniMapProps } from '../types';

import { LoadImageButton } from './ImageMap/LoadImageButton';
import { uploadFile } from './ImageMap/utils';
import { useImageMapObservableStore } from './imageMapStore';

const styles = {
    maxHeight: 170,
};

interface IProps extends IMiniMapProps {
    data: HTMLImageElement;
    onClick?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
}

const MiniMapComponent = ({ data, title, onClick, ...props }: IProps) => {
    const width = props.width - 29;
    const height = props.width > styles.maxHeight ? styles.maxHeight : props.width;

    return (
        <Canvas
            id="image-minimap"
            title={title}
            width={width}
            height={height}
            style={styles}
            onClick={onClick}
        >
            {(ctx) => ctx.drawImage(data, 0, 0, width, height)}
        </Canvas>
    );
};

export const ImageMiniMap = ({ title, width }: IMiniMapProps) => {
    const [{ data }, setImageMap] = useImageMapObservableStore();
    const [{ layer }] = useLayerObservableStore();

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
        <MiniMapComponent
            width={width}
            title={isSelected ? 'Load new image' : title}
            data={data}
            onClick={handleClick}
        />
    );
};
