import { memo, useCallback } from 'react';

import { LAYER_CONFIG } from '../layersConfig';
import { useEditorStore } from '../store';
import { LAYER_TYPE, MapData } from '../types';

interface IProps {
    width: number;
    height: number;
}
export const Map = memo(({ width, height }: IProps) => {
    const [{ data, visibility }, setStore] = useEditorStore();

    const layers = Object.keys(data).map(Number) as LAYER_TYPE[];

    const handleDataUpdate = useCallback((type: LAYER_TYPE, newData: MapData | ImageBitmap) => {
        setStore({ data: { ...data, [type]: newData } });
    }, []);

    return (
        <div>
            {layers.map((type) => {
                const mapConfig = LAYER_CONFIG[type];
                const MapLayer = mapConfig.mapComponent;
                const mapData = data[type];
                const isVisible = visibility[type];

                if (!MapLayer || !mapData || !isVisible) {
                    return null;
                }

                return (
                    <MapLayer
                        key={type}
                        data={mapData}
                        width={width}
                        height={height}
                        zIndex={mapConfig.zIndex}
                        onDataUpdate={(newData) => handleDataUpdate(type, newData)}
                    />
                );
            })}
        </div>
    );
});
