import { memo, useCallback } from 'react';

import { LAYER_TYPE } from 'types';

import { useVisibilityStore } from '../Layers/EyeButton';
import { useOpacityStore } from '../Layers/OpacityBar';
import { getLayers, LAYER_CONFIG } from '../layersConfig';
import { useEditorStore } from '../store';
import { MapData } from '../types';

interface IProps {
    width: number;
    height: number;
}
export const Map = memo(({ width, height }: IProps) => {
    const [{ data, layer }, setStore] = useEditorStore();
    const [{ visibility }] = useVisibilityStore();
    const [{ opacity }] = useOpacityStore();

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
                const mapConfig = LAYER_CONFIG[type];
                const MapLayer = mapConfig.mapComponent;
                const mapData = data[type];
                const isVisible = visibility[type];

                if (!MapLayer || !isVisible) {
                    return null;
                }

                return (
                    <MapLayer
                        key={type}
                        isEditable={layer === type}
                        opacity={opacity[type]}
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
