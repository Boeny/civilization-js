import { memo, useCallback, useMemo } from 'react';

import { Canvas } from 'components/canvas/Canvas';
import { LoadImageButton } from 'screens/EditorScreen/Map/ImageMap/LoadImageButton';
import { uploadFile } from 'screens/EditorScreen/Map/ImageMap/utils';
import { useEditorStore } from 'screens/EditorScreen/store';
import { LAYER_TYPE } from 'types';

import { IMiniMapProps } from './types';

const styles = {
    maxHeight: 170,
};

interface IProps extends IMiniMapProps<HTMLImageElement> {
    data: HTMLImageElement;
    onClick?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
}
const MiniMapComponent = memo(({ data, title, onClick, ...props }: IProps) => {
    const width = props.width - 29;
    const height = props.width > styles.maxHeight ? styles.maxHeight : props.width;

    const children = useCallback(
        (ctx: CanvasRenderingContext2D) => {
            ctx.drawImage(data, 0, 0, width, height);
        },
        [data, height, width],
    );

    return (
        <Canvas
            id="image-minimap"
            title={title}
            width={width}
            height={height}
            style={styles}
            onClick={onClick}
        >
            {children}
        </Canvas>
    );
});

export const ImageMiniMap = memo(({ data, title, ...props }: IMiniMapProps<HTMLImageElement>) => {
    const [store, setStore] = useEditorStore();
    const isSelected = useMemo(() => store.layer === LAYER_TYPE.image, [store.layer]);

    const handleDataUpdate = useCallback(
        (newData: HTMLImageElement) => {
            setStore({ data: { ...store.data, [LAYER_TYPE.image]: newData } });
        },
        [setStore, store.data],
    );

    const handleClick = useCallback(async () => {
        if (!isSelected) return;

        const newData = await uploadFile();

        if (newData) {
            handleDataUpdate(newData);
        }
    }, [handleDataUpdate, isSelected]);

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
            {...props}
            title={isSelected ? 'Load new image' : title}
            data={data}
            onClick={handleClick}
        />
    );
});
