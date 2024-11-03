import { memo, useCallback } from 'react';

import { getLayers, LAYER_CONFIG } from '../layersConfig';
import { useEditorStore } from '../store';
import { LAYER_TYPE, MapData } from '../types';

interface IProps {
    width: number;
    height: number;
}
export const Map = memo(({ width, height }: IProps) => {
    const [{ data, visibility }, setStore] = useEditorStore();

    const layers = getLayers();

    const handleDataUpdate = useCallback(
        (type: LAYER_TYPE, newData: MapData | HTMLImageElement) => {
            setStore({ data: { ...data, [type]: newData } });
        },
        [data, setStore],
    );

    return (
        <div>
            {layers.map((type) => {
                console.log(type);
                const mapConfig = LAYER_CONFIG[type];
                const MapLayer = mapConfig.mapComponent;
                const mapData = data[type];
                const isVisible = visibility[type] === undefined || visibility[type];

                if (!MapLayer || !isVisible) {
                    return null;
                }
                console.log(type, isVisible);

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
