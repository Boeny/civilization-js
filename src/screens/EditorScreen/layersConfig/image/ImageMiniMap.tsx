import { Button } from 'components/Button';
import { Canvas } from 'components/canvas/Canvas';
import { IPoint } from 'types';
import { getVector } from 'utils';

import { IMiniMapProps } from '../types';

import { uploadFile } from './ImageMap/utils';
import { useImageMapStore } from './imageMapStore';

interface Props {
    panelWidth: number;
    title: string;
    map: HTMLImageElement;
    onClick?: (ctx: CanvasRenderingContext2D, point: IPoint) => void;
}

const ImageMiniMapComponent = ({ map, title, onClick, panelWidth }: Props) => {
    const width = panelWidth - 29;
    const height = (width * map.height) / map.width;

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
            {(ctx) => ctx.drawImage(map, 0, 0, width, height)}
        </Canvas>
    );
};

export const ImageMiniMap = ({ title, panelWidth, isSelected, setMapCommonParams }: IMiniMapProps) => {
    const {
        store: { map },
        setStore: setImageMap,
    } = useImageMapStore();

    const loadImage = async () => {
        const newMap = await uploadFile();

        if (!newMap) {
            return;
        }

        setMapCommonParams(getVector(newMap.width, newMap.height));
        setImageMap({ map: newMap });
    };

    const handleImageMiniMapClick = () => {
        if (isSelected) {
            loadImage();
        }
    };

    if (!map) {
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
            panelWidth={panelWidth}
            title={isSelected ? 'Load new image' : title}
            map={map}
            onClick={handleImageMiniMapClick}
        />
    );
};
