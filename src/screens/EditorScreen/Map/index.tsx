import { memo } from 'react';

import { LAYER_CONFIG } from '../layersConfig';
import { useEditorStore } from '../store';
import { LAYER_TYPE } from '../types';

interface IProps {
    width: number;
    height: number;
}
export const Map = memo(({ width, height }: IProps) => {
    const [{ data }] = useEditorStore();

    const layers = Object.keys(data).map(Number) as LAYER_TYPE[];

    return (
        <div>
            {layers.map((type) => {
                const mapConfig = LAYER_CONFIG[type];
                const MapLayer = mapConfig.mapComponent;
                const mapData = data[type];

                if (!MapLayer || !mapData) {
                    return null;
                }

                return (
                    <MapLayer
                        key={type}
                        data={mapData}
                        width={width}
                        height={height}
                        zIndex={mapConfig.zIndex}
                    />
                );
            })}
        </div>
    );
});
